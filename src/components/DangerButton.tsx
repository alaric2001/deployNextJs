import * as React from 'react';

import clsxm from '@/lib/clsxm';

type PrimaryButtonProps = {
  btnClassName?: string;
  children?: string | React.ReactElement;
  disabled?: boolean;
  size?: string; //normal|mini
  rounded?: boolean;
  onClick?: (event: any) => void;
};

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function DangerButton({
  btnClassName,
  children,
  disabled,
  size,
  rounded,
  onClick,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick || undefined}
      className={clsxm(
        btnClassName,
        'w-full bg-danger text-center text-white disabled:bg-lighter-gray disabled:text-dark/60',
        size && size == 'mini' ? 'py-2 px-4 text-sm' : 'py-3 px-4',
        rounded ? 'rounded-full' : 'rounded-xl'
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
