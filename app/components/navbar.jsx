import { assets } from '@/assets/assets';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
    const [isScroll, setIsScroll] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();
    
    const sideMenuRef = useRef();

    const openMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(-16rem)';
    }

    const closeMenu = () => {
        sideMenuRef.current.style.transform = 'translateX(16rem)';
    }

    return (
        <>
            <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden'>
                <Image src={assets.header_bg_color} alt='' className='w-full'></Image>
            </div>
            <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] text-1 py-4 flex items-center justify-between z-50 ${isScroll ? "bg-white bg-opacity-50 backdrop-blur-lg shadow-sm  dark:bg-darkTheme dark: shadow-white/20" : ""}`}>
                <a href="#top">
                    <h1 className='text-4xl headerFont'>
                        Lillian V.
                    </h1>
                </a>

                <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll ? "" : "bg-white shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent"}`}>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About Me</a></li>
                    <li><a href="#work">My Work</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                <div className='flex items-center gap-4'>
                    <button onClick={() => setIsDarkMode(prev => !prev)}>
                        <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt='mode toggle icon' className='size-6 mr-1'></Image>
                    </button>

                        <button
                            className="hidden lg:flex items-center gap-3 border-[1.6px] border-[#616467] text-black px-3 py-1 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
                            <a href="#contact">Contact Me</a>
                        </button>
                

                    <button className='block md:hidden ml-3' onClick={openMenu}>
                        <div>
                            <Image src={isDarkMode ? assets.menu_white : assets.menu_black} alt='menu icon' className='size-5 mr-2.5'></Image>
                        </div>
                    </button>
                </div>

                {/* mobile menu */}
                <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-purple-50 transition duration-500 dark:bg-darkHover dark:text-white'>
                    <div className='absolute right-6 top-6' onClick={closeMenu}>
                        <Image src={isDarkMode ? assets.close_white : assets.close_black} alt='close icon' className='w-5 cursor-pointer'></Image>
                    </div>
                    <li><a onClick={closeMenu} href="#home">Home</a></li>
                    <li><a onClick={closeMenu} href="#about">About Me</a></li>
                    <li><a onClick={closeMenu} href="#work">My Work</a></li>
                    <li><a onClick={closeMenu} href="#contact">Contact</a></li>
                
                </ul>
            </nav>
        </>
    );
};

export default Navbar;