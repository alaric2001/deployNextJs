import * as React from 'react';

import clsxm from '@/lib/clsxm';

type SecondaryButtonProps = {
  btnClassName?: string;
  children?: string;
  onClick?: (event: any) => void;
};

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function SecondaryButton({
  btnClassName,
  children,
  onClick,
  ...rest
}: SecondaryButtonProps) {
  return (
    <button
      onClick={onClick || undefined}
      className={clsxm(
        'w-full rounded-xl bg-lighter-gray py-3 px-4 text-center font-medium text-dark/60 transition-all duration-300 hover:bg-gray-300/50',
        btnClassName
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
