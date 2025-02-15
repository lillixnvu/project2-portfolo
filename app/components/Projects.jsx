import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Projects = () => {
  return (
    <div id='work' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg'>My Work</h4>
      <h2 className='text-center text-5xl headerFont'>Projects</h2>

      <p className='text-center max-w-2xl mx-auto mt-5 mb-12'>
        Welcome to my portolfio! Here are some of the projects I've worked on. I'm always looking for new projects to work on, so feel free to reach out to me!
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {workData.map((projects, index)=>(
            <div key={index}
            className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group'
            style={{backgroundImage: `url(${projects.bgImage})`}}>
                <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
                    <div>
                        <h2 className='headerFont text-2xl'>{projects.title}</h2>
                        <p className= ' text-sm text-gray-700'>{projects.description}</p>
                    </div>
                </div>

                {/* <div className='border rounded-full border-black w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] group-hover: bg-purple-300 transition'>
                    <Image src={assets.send_icon} alt='send icon' className='w-5'>

                    </Image>
                </div> */}
            </div>
        ))}
      </div>
      <a href="" className='headerFont text-2xl w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-purple-100 duration-500'>
        Show More <Image src={assets.right_arrow_bold} alt='right arrow' className='w-4'>

        </Image>
      </a>
    </div>
  )
}

export default Projects
