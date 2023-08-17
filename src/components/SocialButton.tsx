import Image from 'next/image';
import * as React from 'react';

import clsxm from '@/lib/clsxm';

import FacebookLogo from '~/images/logo-facebook.png';
import GoogleLogo from '~/images/logo-google.png';

type SocialButtonProps = {
  btnClassName?: string;
  children?: string;
  type?: string;
};

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function SocialButton({
  btnClassName,
  type,
  children,
}: SocialButtonProps) {
  const [selectedLogo, setSelectedLogo] = React.useState(
    type && type === 'facebook'
      ? FacebookLogo
      : type && type === 'google'
      ? GoogleLogo
      : null
  );
  return (
    <button
      className={clsxm(
        btnClassName,
        'w-full rounded-full border border-lighter-gray bg-white py-2 px-4 text-center text-sm font-medium text-dark/58'
      )}
    >
      <div className='flex items-center justify-center gap-3'>
        {selectedLogo && (
          <Image
            src={selectedLogo.src}
            className='object-scale-down'
            alt='social'
            width={24}
            height={24}
          />
        )}
        <span className='text-dark'>{children}</span>
      </div>
    </button>
  );
}
