'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SocialIcon } from 'react-social-icons';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters.',
  }),
  walletAddress: z.string().min(12, {
    message: 'Wallet Address must be at least 12 characters',
  }),
  contributionReview: z.string().min(20, {
    message: 'Write your contribution to web3 in at least 20 characters',
  }),
});

export function ProfileForm() {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      walletAddress: '',
      contributionReview: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post('/api/forms', data);
      router.push('/thankyou');
      console.log(response);
    } catch (error) {
      console.error('Error in submitting form', error);
      alert('Failed to submit form');
    } finally {
      setIsSubmitting(false);
    }
    console.log(data);
  };

  return (
    <div className='relative h-full w-full bg-white'>
      <div className='bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]  min-h-screen flex flex-col  text-left items-center justify-center'>
        <Card className='mx-auto mt-12 animate-fadeIn'>
          <CardHeader className='text-center bg-black text-white rounded-t-xl'>
            <CardTitle className='font-medium text-xl lg:text-3xl'>
              Fill this form for whitelisting your account
            </CardTitle>
            {/* <CardDescription>You have 3 unread messages</CardDescription> */}
          </CardHeader>
          <CardContent className='p-8 bg-white rounded-b-lg shadow-lg'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-8'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xl font-semibold'>
                        Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your username'
                          {...field}
                          className='rounded-lg border-2 border-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='walletAddress'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xl font-semibold'>
                        Wallet Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your wallet address'
                          {...field}
                          className='rounded-lg border-2 border-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='contributionReview'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-xl font-semibold'>
                        Your contribution to Web 3
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Write about your contribution to web3'
                          {...field}
                          className='rounded-lg border-2 border-black'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormItem>
                  <FormControl>
                    <span className='text-gray-800 text-lg lg:text-2xl  font-normal  '>
                      Follow Catcents on{' '}
                      <a
                        href='https://x.com/catcentsio'
                        className='font-semibold underline'
                      >
                        Twitter
                        <SocialIcon
                          url='https://x.com'
                          style={{ width: 20, height: 20, marginLeft: 4 }}
                          href='https://x.com/catcentsio'
                        />
                      </a>{' '}
                      and Turn on notifications.
                    </span>
                  </FormControl>
                </FormItem>

                <Button
                  type='submit'
                  className='w-full py-3 bg-gradient-to-r bg-rose-500 text-white font-semibold rounded-lg shadow-md hover:from-rose-500 hover:to-red-700 transition duration-300'
                  disabled={isSubmitting}
                  onClick={() => {
                    toast({
                      title: 'Your Form was Submitted',
                      description:
                        'We will verify your details and connect with you soon!',
                    });
                  }}
                >
                  {isSubmitting ? 'Submitting Form....' : 'Submit'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
