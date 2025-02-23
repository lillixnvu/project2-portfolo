import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'


function Footer() {
  return (
    <div className='mt-20'>
      <div className='text-center'>
        <h1 className='text-4xl headerFont w-36 mx-auto mb-2 '>Lillian V.</h1>
        
        <div className='w-max flex items-center gap-2 mx-auto'>  
        <Image src={assets.mail_icon} alt='' className='w-6'></Image>
        lillixnvu@gmail.com
        </div>
      </div>

      <div  className='text-center sm:flex items:center justify-between border-t border-gray-400 mx-[10%] mt-12 py-6'>
        <p>© 2025 Lillian Vu. All rights reserved.</p>
        
        <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
          <li><a href="https://github.com/lillixnvu" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/lillian-vu-0b110032a/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>

      </div>


    </div>
  )
}

export default Footer
