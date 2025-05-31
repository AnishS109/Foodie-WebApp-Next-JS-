import React from 'react';

import anish from '../../../public/Assests/anish.jpg';

const About = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 text-gray-900 px-6 py-16 sm:px-12 md:px-24 lg:px-32 font-sans'>
      {/* Hero Section */}
      <section className='text-center max-w-3xl mx-auto mb-20'>
        <h1 className='text-5xl sm:text-6xl font-extrabold mb-6 text-yellow-600 drop-shadow-lg'>
          Welcome to Foodie
        </h1>
        <p className='text-xl sm:text-2xl text-gray-700 max-w-xl mx-auto leading-relaxed'>
          Your ultimate destination for discovering delicious recipes, local
          eateries, and culinary inspiration.
        </p>
      </section>

      {/* About Info */}
      <section className='max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-14 mb-24'>
        {[
          {
            title: 'Fresh & Tasty Recipes',
            description:
              'Explore a wide variety of recipes, from quick snacks to gourmet meals, all tested for quality and flavor.',
            icon: (
              <svg
                className='w-12 h-12 mb-4 text-yellow-500'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M12 20l9-5-9-5-9 5 9 5z' />
                <path d='M12 12v8' />
                <path d='M3 7v6' />
                <path d='M21 7v6' />
              </svg>
            ),
          },
          {
            title: 'Discover Local Eateries',
            description:
              'Find the best restaurants and street food spots near you, complete with reviews and insider tips.',
            icon: (
              <svg
                className='w-12 h-12 mb-4 text-yellow-500'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='12' cy='12' r='10' />
                <path d='M8 12h8' />
                <path d='M12 8v8' />
              </svg>
            ),
          },
          {
            title: 'Community & Sharing',
            description:
              'Connect with fellow food lovers, share your own recipes, and get inspired by culinary stories.',
            icon: (
              <svg
                className='w-12 h-12 mb-4 text-yellow-500'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                viewBox='0 0 24 24'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M17 21v-2a4 4 0 0 0-3-3.87' />
                <path d='M9 21v-2a4 4 0 0 1 3-3.87' />
                <circle cx='12' cy='7' r='4' />
              </svg>
            ),
          },
        ].map(({ title, description, icon }, i) => (
          <div
            key={i}
            className='bg-white rounded-2xl shadow-lg p-10 text-center hover:shadow-2xl transition-transform transform hover:-translate-y-1 cursor-default'
          >
            <div className='flex justify-center'>{icon}</div>
            <h2 className='text-2xl font-semibold mb-3 text-yellow-600'>
              {title}
            </h2>
            <p className='text-gray-600 leading-relaxed'>{description}</p>
          </div>
        ))}
      </section>

      {/* Team Section */}
      <section className='max-w-3xl mx-auto text-center'>
        <h2 className='text-4xl font-extrabold mb-14 text-yellow-600 drop-shadow-md'>
          Meet Our Foodie Team
        </h2>
        <div className='bg-white rounded-3xl shadow-2xl p-10 inline-block w-full max-w-md mx-auto hover:shadow-yellow-300 transition-shadow'>
          <img
            src='/Assests/anish.jpg'
            alt='Anish Saini'
            className='w-40 h-40 rounded-full mx-auto mb-6 object-cover shadow-lg border-4 border-yellow-400'
          />
          <h3 className='text-3xl font-bold text-yellow-600 mb-2'>
            Anish Saini
          </h3>
          <p className='text-lg font-medium text-gray-700 mb-4'>
            Full Stack Developer
          </p>
          <p className='text-gray-600 leading-relaxed px-4'>
            Hi, I'm Anish — I build and manage everything on Foodie to make it
            work smoothly for you.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
