import { Fragment, ReactNode, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookmarkEmpty,
  Calendar,
  Home,
  LogOut,
  Menu as MenuIcon,
} from 'iconoir-react';

import { ToastContext, ToastContextType } from 'src/context/ToastContext';
import { Menu, Transition } from '@headlessui/react';
import classNames from '@/utils/classNames';
import Toast from '@/components/dashboard/shared/Toast';
import useAuth from '@/hooks/useAuth';

type SidebarNavItemProps = {
  href: string;
  icon: ReactNode;
  text: string;
};

const SidebarNavItem = ({ href, icon, text }: SidebarNavItemProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!href.includes('/settings')) {
      if (window.location.pathname === href) setIsActive(true);
    } else {
      if (window.location.pathname.includes('/settings')) setIsActive(true);
    }
  }, [href]);

  return (
    <Link href={href}>
      <a
        className={`${
          isActive
            ? 'bg-emerald-200 text-emerald-900'
            : 'hover:bg-emerald-200 hover:text-emerald-900'
        }     group flex items-center rounded-md px-2 py-2 text-xs font-medium`}
      >
        <span className="mr-4">{icon}</span>
        <span>{text}</span>
      </a>
    </Link>
  );
};

type DropwdownNavItemProps = {
  href: string;
  icon: ReactNode;
  text: string;
};

const DropwdownNavItem = ({ href, icon, text }: DropwdownNavItemProps) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!href.includes('/settings')) {
      if (window.location.pathname === href) setIsActive(true);
    } else {
      if (window.location.pathname.includes('/settings')) setIsActive(true);
    }
  }, [href]);

  return (
    <Menu.Item>
      <Link href={href} passHref>
        <a
          href="#"
          className={classNames(
            isActive ? 'bg-emerald-200 text-emerald-900' : '',
            'my-1 flex items-center rounded-md px-4 py-2.5 text-xs hover:bg-emerald-200 hover:text-emerald-900'
          )}
        >
          <span className="mr-4">{icon}</span>
          <span>{text}</span>
        </a>
      </Link>
    </Menu.Item>
  );
};

type Props = {
  children: React.ReactNode;
};

export default function DashboardShell({ children }: Props) {
  const { user, signOut } = useAuth();
  const { showToast, setShowToast, toastMessage, toastType } = useContext(
    ToastContext
  ) as ToastContextType;

  return (
    <>
      <Toast
        open={showToast}
        setOpen={setShowToast}
        message={toastMessage}
        type={toastType}
      />
      <div className="flex min-h-screen">
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-64 flex-col">
            <div className="bg-slate-0 flex min-h-0 flex-1 flex-col border-r border-slate-200">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <h1 className="text-2xl font-bold text-slate-900">funds</h1>
                </div>
                <nav className="mt-5 flex-1" aria-label="Sidebar">
                  <div className="space-y-1 px-2">
                    <SidebarNavItem
                      href="/dashboard"
                      icon={<Home />}
                      text="Dashboard"
                    />
                    <SidebarNavItem
                      href="/dashboard/categories"
                      icon={<BookmarkEmpty />}
                      text="Categories"
                    />
                    <SidebarNavItem
                      href="/dashboard/history"
                      icon={<Calendar />}
                      text="History"
                    />
                  </div>
                </nav>
              </div>
              <div className="flex flex-shrink-0 p-4">
                <button
                  className="flex items-center text-xs hover:text-slate-500"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-4 h-5 w-5" /> Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="lg:hidden">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-1.5">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">funds</h1>
              </div>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-full justify-center px-4 py-2 text-gray-700 focus:outline-none focus:ring-0">
                    <MenuIcon className="h-5 w-5" aria-hidden="true" />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-50 px-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <DropwdownNavItem
                      href="/dashboard"
                      icon={<Home />}
                      text="Dashboard"
                    />
                    <DropwdownNavItem
                      href="/dashboard/categories"
                      icon={<BookmarkEmpty />}
                      text="Categories"
                    />
                    <DropwdownNavItem
                      href="/dashboard/history"
                      icon={<Calendar />}
                      text="History"
                    />
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <div className="absolute inset-0 bg-white py-6 px-4 text-sm sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
