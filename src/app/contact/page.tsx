import React from 'react';

const Contact = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 px-6 py-16 sm:px-12 md:px-24 lg:px-32 text-gray-800'>
      {/* Header */}
      <section className='text-center mb-12'>
        <h1 className='text-4xl sm:text-5xl font-extrabold text-yellow-700 mb-4'>
          Get in Touch
        </h1>
        <p className='text-lg text-gray-700'>
          Have questions, feedback, or just want to say hi? We'd love to hear
          from you!
        </p>
      </section>

      {/* Contact Content */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto'>
        {/* Contact Form */}
        <form className='bg-white rounded-2xl shadow-lg p-8 space-y-6'>
          <div>
            <label className='block text-sm font-semibold mb-2 text-gray-700'>
              Your Name
            </label>
            <input
              type='text'
              placeholder='Enter your name'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold mb-2 text-gray-700'>
              Email Address
            </label>
            <input
              type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
            />
          </div>
          <div>
            <label className='block text-sm font-semibold mb-2 text-gray-700'>
              Message
            </label>
            <textarea
              rows='4'
              placeholder='Write your message...'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none'
            ></textarea>
          </div>
          <button
            type='submit'
            className='w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300'
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className='bg-white rounded-2xl shadow-lg p-8 space-y-6 flex flex-col justify-center'>
          <h2 className='text-2xl font-bold text-yellow-700'>Contact Info</h2>
          <div className='space-y-2 text-gray-700'>
            <p>
              📧 <span className='font-semibold'>Email:</span>{' '}
              support@foodie.com
            </p>
            <p>
              📞 <span className='font-semibold'>Phone:</span> +91 90988 69975
            </p>
            <p>
              📍 <span className='font-semibold'>Address:</span> 123 Tasty
              Street, Food City, India
            </p>
          </div>

          <div className='mt-6'>
            <h3 className='font-semibold text-yellow-600 mb-2'>Follow Us</h3>
            <div className='flex gap-4 text-xl text-yellow-600'>
              <a href='#' aria-label='Instagram'>
                <i className='fab fa-instagram'></i>
              </a>
              <a href='#' aria-label='Facebook'>
                <i className='fab fa-facebook'></i>
              </a>
              <a href='#' aria-label='Twitter'>
                <i className='fab fa-twitter'></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
