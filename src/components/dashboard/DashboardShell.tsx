import { Fragment, ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookmarkEmpty,
  Calendar,
  Cancel,
  Home,
  LogOut,
  Menu,
} from 'iconoir-react';
import { Dialog, Transition } from '@headlessui/react';
import { Toaster } from 'react-hot-toast';
import { signOut } from 'next-auth/react';

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
            ? 'bg-slate-200 text-slate-900'
            : 'hover:bg-slate-200 hover:text-slate-900'
        }     group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
      >
        <span className="mr-4">{icon}</span>
        <span>{text}</span>
      </a>
    </Link>
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
              <div className="flex flex-shrink-0 border-t border-slate-300 p-4">
                <button
                  className="flex items-center text-sm"
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
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-slate-500 hover:text-slate-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
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
