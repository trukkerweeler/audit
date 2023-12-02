import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '/public/images/audit.png'
// import User from './User';
import { UserContext } from '@/context/user';


const Header: React.FC = () => {
  const {user, setUser} = useContext(UserContext);
  
  return (
    <>
    <header className="flex items-center justify-between p-4 border-b-4">
      {/* logo image:  */}
      <Link href="/">
        <Image 
          src={logo}
          width={200} 
          // height={63}
          alt="Logo" 
        />
      </Link>
      

      <nav>
        <ul className="flex space-x-4 text-xl">
          <li><Link href="/" className="p-4">Home</Link></li>
          <li><Link href="/about" className="p-4">About</Link></li>
          <li><Link href="/checklist" className="p-4">Checklists</Link></li>
          <li><Link href="/audit" className="p-4">Audits</Link></li>
          <li><Link href="/history" className="p-4">History</Link></li>
          {!user && <li><Link href="/register" className="p-4">Register</Link></li>}
          <li><Link href="/login" className="p-4">{user ? user.username : "Login"}</Link></li>
        </ul>
        
      </nav>
    </header>
    </>
  );
};

export default Header;