'use client';
import { Center, Spinner } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebaseconfig';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Sidebar } from './components/Sidebar';

export default function Home() {
  const [user, loading, error] = useAuthState(auth);
  const userSession = sessionStorage.getItem('user');
  const router = useRouter();

  if (loading) {
    return (
      <Center h='100vh'>
        <Spinner color='blue.400' size='lg' />
      </Center>
    )
  }

  if (!user && !userSession && !loading) {
    router.push('/login')
  }

  return (
    <Sidebar />
  );
}
