import Link from 'next/link';
import { ArrowRight } from 'iconoir-react';
import { motion } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

const iconVariants = {
  hover: {
    x: 2,
  },
};

export default function Container({ children }: Props) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="mx-auto flex max-w-screen-lg items-center justify-between p-4">
        <Link href="/" passHref>
          <a className="text-2xl font-bold text-slate-900">tin</a>
        </Link>

        <div className="flex items-center space-x-8">
          {!session && (
            <button
              className="font-medium text-slate-700"
              onClick={() => signIn('google')}
            >
              Sign in
            </button>
          )}

          {!session && (
            <motion.button
              whileHover="hover"
              type="button"
              className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm  hover:border-slate-400 focus:outline-none focus:ring-0"
              onClick={() => signOut()}
            >
              Sign up
              <motion.span variants={iconVariants}>
                <ArrowRight className="ml-1" />
              </motion.span>
            </motion.button>
          )}

          {session && (
            <Link href="/dashboard" passHref>
              <motion.a
                whileHover="hover"
                className="inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm  hover:border-slate-400 focus:outline-none focus:ring-0"
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

      <main>{children}</main>
    </div>
  );
}
