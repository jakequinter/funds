import { Fragment, ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookmarkEmpty,
  Calendar,
  Cancel,
  Home,
  LogOut,
  Menu as MenuIcon,
} from 'iconoir-react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { Toaster } from 'react-hot-toast';
import { signOut } from 'next-auth/react';

import classNames from '@/utils/classNames';

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
        }     group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
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
            'my-1 flex items-center rounded-md px-4 py-2.5 text-sm hover:bg-emerald-200 hover:text-emerald-900'
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Toaster position="top-right" />
      <div className="flex min-h-screen">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-slate-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex w-full max-w-xs flex-1 flex-col bg-slate-100 focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <Cancel
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="flex flex-shrink-0 items-center px-4">
                    <h1 className="text-2xl font-bold text-slate-900">tin</h1>
                  </div>
                  <nav aria-label="Sidebar" className="mt-5">
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
                <div className="flex flex-shrink-0 border-t border-slate-300 p-4">
                  <button
                    className="flex items-center text-sm"
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    <LogOut className="mr-4 h-5 w-5" /> Sign out
                  </button>
                </div>
              </div>
            </Transition.Child>
            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex w-64 flex-col">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex min-h-0 flex-1 flex-col border-r border-slate-300 bg-slate-100">
              <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <div className="flex flex-shrink-0 items-center px-4">
                  <h1 className="text-2xl font-bold text-slate-900">tin</h1>
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
                  className="flex items-center text-sm hover:text-slate-500"
                  onClick={() => signOut({ callbackUrl: '/' })}
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
                <h1 className="text-2xl font-bold text-slate-900">tin</h1>
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-100 px-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
              <div className="absolute inset-0 bg-white py-6 px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
