/* eslint-disable @next/next/no-img-element */
import React from 'react';
import MaxWidthWrapper from './max-width-wrapper';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button, buttonVariants } from './ui/button';

const LandingPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100'>
      {/* <Navbar /> */}
      <MaxWidthWrapper className='p-12 text-center'>
        <div className='animate-fadeIn'>
          <h1 className='text-6xl font-bold text-black mb-8'>Catcents NFT</h1>
          <p className='text-xl  text-black  mb-12'>
            Discover unique and rare NFTs of adorable Catcents.
          </p>
          <div className='flex items-center justify-center'>
            <Button className='flex flex-col items-center justify-center'>
              <Link
                href='/form'
                className={buttonVariants({
                  size: 'sm',
                  className: ' items-center gap-1',
                })}
              >
                Join our Waitlist
                <ArrowRight className='ml-1.5 h-5 w-5' />
              </Link>
            </Button>
          </div>
          <div className='relative mt-16'>
            <img
              src='/cat2.png'
              alt='Cat NFT'
              className='w-1/2 mx-auto rounded-md'
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default LandingPage;
