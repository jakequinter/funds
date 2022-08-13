import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'iconoir-react';
import { motion } from 'framer-motion';

import useAuth from '@/hooks/useAuth';

type Props = {
  children: React.ReactNode;
};

const iconVariants = {
  hover: {
    x: 2,
  },
};

export default function Container({ children }: Props) {
  const { authenticated, signInWithGoogle, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="mx-auto flex max-w-screen-lg items-center justify-between px-4 pt-8 lg:px-0">
        <Link href="/" passHref>
          <a className="cursor-pointer">
            <Image src="/images/logo.png" alt="Logo" height="25" width="100" />
          </a>
        </Link>

        <div className="flex items-center space-x-12">
          <Link href="/faq" passHref>
            <a className="font-medium hover:text-slate-900">FAQ</a>
          </Link>
          {!authenticated && (
            <button
              className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-1.5 text-sm font-medium text-white shadow-lg shadow-emerald-400/40 hover:bg-emerald-600 focus:outline-none focus:ring-0"
              onClick={() => signInWithGoogle()}
            >
              Sign in
            </button>
          )}

          {authenticated && (
            <Link href="/dashboard" passHref>
              <motion.a
                whileHover="hover"
                className="inline-flex items-center rounded-full bg-emerald-500 px-4 py-2  text-sm font-medium text-white shadow-lg shadow-emerald-400/50 hover:bg-emerald-600 focus:outline-none focus:ring-0"
              >
                Dashboard
                <motion.span variants={iconVariants}>
                  <ArrowRight className="ml-1" />
                </motion.span>
              </motion.a>
            </Link>
          )}
        </div>
      </nav>

      <main className="my-32 mx-auto max-w-screen-lg">{children}</main>
    </div>
  );
}
