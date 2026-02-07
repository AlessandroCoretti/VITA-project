import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-paper flex flex-col cursor-none">
            <CustomCursor />
            <Navbar />
            <main className="flex-grow pt-0">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
