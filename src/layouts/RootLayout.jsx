import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main className="min-h-[90vh]">
                <Outlet />
            </main>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;