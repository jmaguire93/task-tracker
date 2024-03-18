import React from 'react'

export default function Footer() {
  return (
    <footer className='mb-8 px-4 text-center text-gray-500'>
      <small className='mb-2 block text-xs'>
        &copy; 2024 task-tracker. Built by{' '}
        <span className='underline font-medium'>Josh Maguire</span>
      </small>
      <p className='text-xs'>
        <span className='font-semibold'>About this website:</span> built with
        React & Next.js, TypeScript, Tailwind CSS, shadcn/ui, Xata, hosted using
        Vercel.
      </p>
    </footer>
  )
}
