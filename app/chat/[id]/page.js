'use client';
import { ChatMessage } from "@/app/components/ChatMessage";
import { Sidebar } from "@/app/components/Sidebar";
import { Avatar, Box, Flex, FormControl, IconButton, Input, Text, Textarea } from "@chakra-ui/react";
import { PiTelegramLogoBold } from "react-icons/pi";
import { useCollectionData, useDocumentData } from "react-firebase-hooks/firestore";
import { addDoc, collection, doc, orderBy, query, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/firebaseconfig";
import { useParams } from "next/navigation";
import { useAuthState } from 'react-firebase-hooks/auth';
import { getFilterEmail } from "@/app/utils/helper";
import { useState } from "react";


export default function Chat () {
    const [user] = useAuthState(auth);
    const {id} = useParams();
    const q = query(collection(db, `chats/${id}/messages`), orderBy('timestamp'));
    const [messages] = useCollectionData(q);
    const [chatUsers] = useDocumentData(doc(db, 'chats', id));
    const [chatText, setChatText] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        await addDoc(collection(db, `chats/${id}/messages`), {
            text: chatText,
            sender: user.email,
            timestamp: serverTimestamp()
        });
        setChatText('');
    } 

    

    return (
        <Flex h='100vh'>
            <Sidebar />
            <Flex  bg='gray.100' flex={1} direction='column'>
                <Flex
                    bg='blue.100'
                    h='80px' w='full'
                    justify='center'
                >
                    <Flex align='center' p={5}> 
                        <Avatar src="" marginEnd={3} />
                        <Text>{getFilterEmail(chatUsers?.users, user)}</Text>
                    </Flex>
                </Flex>
                <Flex flex={1} m={8} direction='column' overflowX='scroll' sx={{scrollbarWidth: 'none'}}>
                    {
                        messages?.map((message, idx) => {
                            const sender = message?.sender !== user?.email;

                            return <ChatMessage key={idx} alignSelf={sender ? 'flex-start' : 'flex-end'} bg={sender ? 'gray.800' : 'green.600'} text={message.text} />
                        })
                    }
                </Flex>
                <Flex>
                    <FormControl bg='white' as='form' onSubmit={sendMessage}>
                        <Flex>
                            <Input placeholder="Write a message..." variant='unstyled' px={3} onChange={(e) => setChatText(e.target.value)} value={chatText} autoComplete="off" />
                            <IconButton bg='blue.400' color='white' icon={<PiTelegramLogoBold />} />
                        </Flex>
                    </FormControl>

                </Flex>
            </Flex>
        </Flex>
    )
}