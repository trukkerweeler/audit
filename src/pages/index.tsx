import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { UserContext } from '@/context/user';


export default function Home() {
    
    // pass in user context
    const {user, setUser} = useContext(UserContext);
    // console.log({user});
    
    
    return (
        <>
        <Header/>
        <main className="bg-white text-black font-sans text-2xl">
            <div className="flex flex-col justify-center items-center h-screen">
                <h1 className="text-6xl">Welcome to Audit</h1>
                <h2 className="text-4xl">The best auditing app, if you don't have any other auditing app.</h2>
            </div>
        </main>
        <Footer/>
        </>
    )
    }