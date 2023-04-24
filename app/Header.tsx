'use client';

import { Bars3Icon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import DarkModeButton from './DarkModeButton';
import NavLinks from './NavLinks';
import SearchBox from './SearchBox';
import Logo from '../public/logo.png';
import LogoDark from '../public/logo_dark.png';
import { useTheme } from 'next-themes';

const Header = () => {
  const { theme } = useTheme();

  return (
    <header>
      <div className="grid grid-cols-3 p-10 items-center">
        <Bars3Icon className="h-8 w-8 cursor-pointer" />
        <div className="flex flex-row justify-center items-center">
          {theme === 'dark' ? (
            <Image src={Logo} alt="logo" width={100} height={100} />
          ) : (
            <Image src={LogoDark} alt="logo" width={80} height={80} />
          )}
          <Link href="/" prefetch={false}>
            <h1 className="font-serif text-4xl text-center">
              The{' '}
              <span className="underline decoration-6 decoration-orange-400/40">
                MDev
              </span>{' '}
              News
            </h1>
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-2">
          <DarkModeButton />

          <button className="hidden md:inline bg-slate-900 text-white px-4 lg:px-8 py-2 lg:py-4 rounded-full dark:bg-slate-800">
            Subscribe Now
          </button>
        </div>
      </div>

      <NavLinks />

      <SearchBox />
    </header>
  );
};

export default Header;
