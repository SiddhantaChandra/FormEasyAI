'use client';
import Logo from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import {
  useKindeBrowserClient,
  LogoutLink,
} from '@kinde-oss/kinde-auth-nextjs';
import { ChevronDown, LogInIcon } from 'lucide-react';

const Header = () => {
  const pathName = usePathname();
  const { formId } = useParams();

  const { user } = useKindeBrowserClient();

  const navLinks = [
    { name: 'Dashboard', pathName: '/dashboard', isDisabled: false },
    {
      name: 'Builder',
      pathName: `/dashboard/form/builder/${formId}`,
      isDisabled: true,
    },
    {
      name: 'Responds',
      pathName: `/dashboard/form/responds/${formId}`,
      isDisabled: true,
    },
    { name: 'Settings', pathName: '#', isDisabled: false },
  ];

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 px-4 md:px-8 justify-between ">
      <div>
        <Logo />
      </div>
      <nav className="hidden flex-col gap-6 h-full text-lg font-medium lg:flex lg:flex-row items-center text-neutral-950">
        <ul className="flex items-center text-neutral-950 gap-8">
          {navLinks.map((link, i) => (
            <li
              key={i}
              className={twMerge(
                'px-6 py-4 bg-red-300',
                pathName === link.pathName &&
                  'bg-neutral-950 text-white rounded-full',
                link.isDisabled === true && 'opacity-80 !pointer-events-none ',
              )}
            >
              <Link href={link.pathName}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div role="button" className="flex gap-2">
              <Avatar className="h-8 w-8 bg-gray-200 shrink-0 rounded-full">
                <AvatarImage
                  src={user?.picture || ''}
                  alt={user?.given_name || ''}
                />
                <AvatarFallback className="rounded-lg">
                  {user?.given_name?.charAt(0)}
                  {user?.family_name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-2">
                <div className="grid flex-1 text-left text-sm leading-tight text-neutral-950">
                  <span className="truncate font-semibold">
                    {user?.given_name}
                  </span>
                  <p className="truncate block w-full max-w-[150px] text-xs opacity-60">
                    {user?.email}
                  </p>
                </div>
                <ChevronDown className="size-6" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <LogoutLink className="flex items-center gap-1">
                <LogInIcon className="w-4 h-4" />
                Logout
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
