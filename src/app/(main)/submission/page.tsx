'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from '@/types';
import { Badge } from '@/components/ui/badge';
import { redirect, useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';

const SubmissionsPage = () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-up');
  }
  const router = useRouter();
  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await axios.get('/api/forms');
        setForm(res.data[0]);
      } catch (error) {
        console.error('Error fetching form:', error);
      }
    };

    fetchForm();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/submission/${id}`);
  };

  return (
    <div className='relative h-full w-full bg-white'>
      <div className='bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]  min-h-screen flex flex-col  text-left items-center justify-center'>
        <div className='absolute top-0 left-0 w-full h-full bg-pattern bg-opacity-10' />
        {form ? (
          <div
            className='max-w-lg w-full m-12 p-12 bg-rose-200 rounded-lg shadow-2xl hover:shadow-3xl cursor-pointer transform transition-transform z-10'
            // onClick={() => handleCardClick(form.id)}
          >
            <h1 className='text-xl lg:text-3xl font-extrabold mb-8 text-center text-black'>
              Your Submission
            </h1>
            <div className='text-center space-y-6 bg-rose-200'>
              <div className='flex flex-col items-center text-left bg-stone-100 p-4 rounded-lg shadow-inner'>
                <svg
                  className='w-5 h-5 text-black mb-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M16 7a4 4 0 01-8 0M12 14v6m0 0H9m3 0h3m4-6H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v11a2 2 0 01-2 2z'
                  ></path>
                </svg>
                <h2 className='text-2xl font-semibold text-gray-800'>
                  Username
                </h2>
                <p className='text-lg text-gray-600'>{form.name}</p>
              </div>
              <div className='flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-inner'>
                <svg
                  className='w-5 h-5 text-black mb-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 10l-7 7-7-7'
                  ></path>
                </svg>
                <h2 className='text-2xl font-semibold text-gray-800'>
                  Wallet Address
                </h2>
                <p className='text-sm lg:text-xl text-gray-600'>
                  {form.walletAddress}
                </p>
              </div>
              <div className='flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-inner'>
                <svg
                  className='w-5 h-5 text-black mb-2'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M5 13l4 4L19 7'
                  ></path>
                </svg>
                <h2 className='text-2xl font-semibold text-gray-800'>Status</h2>
                <Badge
                  className={`text-lg px-4 py-2 rounded-full ${
                    form.status === 'pending'
                      ? 'bg-rose-500'
                      : form.status === 'approved'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  } text-white`}
                >
                  {form.status}
                </Badge>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col'>
            <p className='text-4xl font-bold text-black'>No Submissions Yet</p>
            <Button
              onClick={() => router.push('/form')}
              className='flex mt-6 items-center cursor-pointer'
            >
              Fill the Form
              <ArrowRight className='ml-1.5 h-5 w-5' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionsPage;
