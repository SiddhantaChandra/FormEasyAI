import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const Logo = (props: { url?: string; color?: string }) => {
  const { url = '/', color = 'text-neutral-950' } = props;
  return (
    <div>
      <Link href={url}>
        <h1 className={cn('font-bold text-2xl', color)}>FormEasy</h1>
      </Link>
    </div>
  );
};

export default Logo;
