import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export default function Home() {
  const { userId } = auth()

  // if logged in, redirect to dashboard
  if (userId) {
    redirect('/dashboard')
  }

  return (
    <div className='text-center'>
      <h1 className='text-3xl font-semibold leading-2 mb-5'>
        Welcome to Task Tracker
      </h1>
      <div className='mb-5'>Please login to handle your tasks!</div>
    </div>
  )
}
