//import type { Metadata } from 'next'
//import { Inter } from 'next/font/google'

import React, { ReactNode } from 'react';
import Header from './Header'
import Footer from './Footer';
// import Footer from './Footer'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header/>
      <main className="bg-white text-black font-sans text-2xl">{children}</main>
      <Footer/>
    </div>
  );
};

export default Layout;