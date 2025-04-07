import { assets, workData } from '../../assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';

const Projects = ({ isDarkMode }) => {
  const [visibleCount, setVisibleCount] = useState(4);
  const showMoreItems = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div id='work' className='w-full px-[12%] py-10 scroll-mt-20'>
      <h4 className='text-center mb-2 text-lg'>My Work</h4>
      <h2 className='text-center text-5xl headerFont'>Projects</h2>

      <p className='text-center max-w-2xl mx-auto mt-5 mb-12'>
        Welcome to my portfolio! Here are some of the projects I've worked on. I'm always looking for new projects to work on, so feel free to reach out to me!
      </p>

      {/* Projects Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {workData.slice(0, visibleCount).map((project, index) => (
          <div
            key={index}
            className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group'
            style={{ backgroundImage: `url(${project.bgImage})` }}
          >
            <div className='bg-white w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7 dark:bg-darkHover'>
              <div>
                <h2 className='headerFont text-2xl'>{project.title}</h2>
                <p className='text-sm text-gray-700 dark:text-white/80'>{project.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {visibleCount < workData.length && (
        <a
          href='#' 
          onClick={(e) => {
            e.preventDefault(); // Prevent page reload
            showMoreItems();
          }}
          className='headerFont text-2xl w-max flex items-center justify-center gap-2 text-gray-700 border-[0.5px] border-gray-700 rounded-full py-3 px-10 mx-auto my-20 hover:bg-purple-100 duration-500 dark:text-white/80 dark:border-white dark:hover:bg-purple-900'
        >
          Show More 
          <Image 
            src={isDarkMode ? assets.right_arrow_bold_dark : assets.right_arrow_bold} 
            alt='right arrow' 
            className='w-4' 
            width={16} 
            height={16} 
          />
        </a>
      )}
    </div>
  );
};

export default Projects;
