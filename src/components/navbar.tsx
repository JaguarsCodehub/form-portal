'use client';
import Link from 'next/link';
import MaxWidthWrapper from './max-width-wrapper';
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { SignOutButton, useAuth, useUser } from '@clerk/nextjs';
import { ModeToggle } from './toggle-mode';

const Navbar = () => {
  const { user } = useUser();

  const isAdmin = false;
  // const isAdmin = (user?.primaryEmailAddress = process.env.ADMIN_EMAIL);

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href='/' className='flex z-40 tex-xl font-semibold'>
            Catcents
          </Link>

          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <SignOutButton />
                {isAdmin ? (
                  <Link
                    href='/dashboard'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href='/submission'
                  className={buttonVariants({
                    size: 'sm',
                    className: ' sm:flex items-center gap-1',
                  })}
                >
                  View Status
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/api/auth/register'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Sign up
                </Link>

                <Link
                  href='/api/auth/login'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}
                >
                  Login
                </Link>

                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
