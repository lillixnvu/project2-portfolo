import { assets } from '../../assets/assets';
import Image from 'next/image'
import React from 'react'
import { Typewriter } from 'react-simple-typewriter'

const header = () => {
  return (
    <div id='home' className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col  items-center justify-center gap-4 defaultFont'>
      <div>
        <Image src={assets.profile_img} alt='' className='rounded-full w-32'></Image>
      </div>
      <h3 className='flex items-end gap-2 text-xl md:text-2x1 mb-3'>Hi, I'm Lillian Vu! <Image src={assets.hand_icon} alt='waving' className='w-6'></Image></h3>

      <div className='bg-black p-4 dark:bg-white'>
        <h1 className='text-white text-3xl sm:text-6xl lg:text-[66px] font-bebas dark:text-darkHover'>
        <Typewriter className='headerFont'words={["Aspiring technology student."]} cursor={true} loop={false}></Typewriter>
        </h1>
      </div>

      <p className='max-w-2xl mx-auto'>
        I'm a current student at BCIT, studying Computer Information Technology. Passionate about technology and I am always looking for ways to improve my skills.
      </p>
      <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
        <a href="#contact" 
        className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2 dark:bg-transparent'>Contact Me <Image src={assets.right_arrow_white} alt='' className='w-4'></Image></a>

        <a href="/lillian-resume.pdf" download
        className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 dark:bg-white dark:text-black'>My Resume <Image src={assets.download_icon} alt='' className='w-4'></Image></a>

      </div>
    </div>
  )
}

export default header
