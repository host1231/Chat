'use client';
import { Avatar, Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { ImExit } from "react-icons/im";
import { UserProfile } from "./UserProfile";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../firebaseconfig";
import { signOut } from "firebase/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import { addDoc, collection } from "firebase/firestore";
import { getFilterEmail } from "../utils/helper";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
    const [user] = useAuthState(auth);
    const q = collection(db, 'chats');
    const [snapshot, loading, error] = useCollection(q);
    const router = useRouter();

    const chats = snapshot?.docs.map(doc => ({id: doc.id, ...doc.data()}));

    const existsChat = email => chats.find(chat => (chat.users.includes(user.email) && chat.users.includes(email)))

    const newChat = async () => {
        const name = prompt('');

        if (!existsChat(name) && name !== user.email)
        await addDoc(collection(db, 'chats'), {
            users: [user.email, name]
        });
    }


    return (
        <Flex  
            w='300px'
            borderEnd='1px'
            borderColor="gray.200"
            direction='column'
        >
            <Flex 
                bg='gray.100'
                w='full' h='80px'
                justify='space-between' align='center'
                p={3}
            >
                <Flex align='center'>
                    <Avatar src="" marginEnd={3} />
                    <Text>{user?.email}</Text>
                </Flex>
                <IconButton icon={<ImExit />} bg='blue.400'  color="white" onClick={() => {
                    sessionStorage.removeItem('user');
                    router.push('/login')
                    signOut(auth)
                }} />
            </Flex>
            <Button my={3} onClick={newChat}>New Chat</Button>
            <Flex flex={1} mt={6} overflowX='scroll' direction='column' sx={{scrollbarWidth: 'none'}}>
                {
                    chats?.filter(chat => chat.users.includes(user?.email))
                    .map((chat, idx) => (
                        <UserProfile key={idx} username={getFilterEmail(chat.users, user)} onClick={() => router.push(`/chat/${chat.id}`)} />
                    ))
                }
            </Flex>
        </Flex>
    )
}