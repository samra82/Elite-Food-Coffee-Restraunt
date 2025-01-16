import React from 'react'
import ErrorHero from './Error404Hero'
import { Button } from '@/components/ui/button' 
import Link from 'next/link'

function Error404() {
  return (
    <div>
      <ErrorHero />
      <div className="min-h-screen bg-white">

        {/* Signup Form Section */}
        <section className="p-10 relative bg-white pt-36 flex flex-col items-center">
          <div className="w-[630px] text-center">
            {/* Main Error Message */}
            <h3 className="text-[96px] font-bold text-[#FF9F0D] mb-6">404</h3>
            <p className="font-bold text-[32px] mb-4">
              Oops! Looks like something went wrong
            </p>
            <p className="text-[18px] mb-4">
              Page cannot be found! We&apos;ll have it figured out in no time.
            </p>
            <p className="text-[18px] mb-6">
              Meanwhile, check out these fresh ideas:
            </p>
            {/* Go Back to Home Button */}
            <Link href="/">
              <Button className="bg-[#FF9F0D] text-white text-[18px] font-bold px-6 py-2 rounded hover:bg-[#e8890b]">
                Go Back to Home
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Error404