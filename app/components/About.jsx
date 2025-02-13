import { assets, infoList } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg'>Introduction</h4>
      <h2 className='text-center text-5xl headerFont'>About Me</h2>

      <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
            <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
                <Image src={assets.user_image} alt='user' className='w-full rounded-3xl'></Image>
            </div>
            <div className='flex-1'>
                <p className='mb-10 max-w-2xl'>I have a passion to learn anything in technology. I enjoy working on hands-on projects that enhance my skills. Currently, I'm exploring cloud computing, windows server, and more!</p>

                <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
                    {infoList.map(({icon, iconDark, title, description}, index)=>(
                        <li className='border-[0.5px] border-gray-400 rounded-xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 hover:shadow-black' key={index}>
                            <Image src={icon} alt={title} className='w-7 mt-3' />
                            <h3 className='my-4 text-gray-700 headerFont text-2xl'>{title}:</h3>
                            <p className='text-gray-600 text-sm'>{description}</p>
                        </li>
                    ))}
                </ul>
            </div>
      </div>
    </div>
  )
}

export default About
