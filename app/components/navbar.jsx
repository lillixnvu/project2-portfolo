import React from 'react'

const Navbar = () => {
    return (
            <nav className="w-full fixed px-5 lg:px-8 xl:px-[8%] text-1 py-4 flex items-center justify-between z-50">
        
            <h1>
            <a href="#home" className='text-4xl font-bebas'>Lillian V.</a>
            </h1>

        
            <ul className="hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm bg-opacity-50">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Me</a></li>
            <li><a href="#work">My Work</a></li>
            <li><a href="#contact">Contact</a></li>
            {/* <li><a href="/login">Login</a></li>  */}
            </ul>

            <div>
                <button className="bg-white text-black border border-black border-solid font-bold py-2 px-4 rounded transition-colors duration-300 hover:bg-black hover:text-white">
                    <a href="/login">Login</a>
                </button>
            </div>
        </nav>
    );
  };
  
  export default Navbar;