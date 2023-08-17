import * as React from 'react';

import clsxm from '@/lib/clsxm';

type PrimaryButtonProps = {
  btnClassName?: string;
  children?: string | React.ReactElement;
  disabled?: boolean;
  is_loading?: boolean;
  size?: string; //normal|mini
  rounded?: boolean;
  onClick?: (event: any) => void;
};

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function PrimaryButton({
  btnClassName,
  children,
  disabled,
  size,
  is_loading,
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
        'flex w-full items-center justify-center gap-1 bg-primary-green text-center font-medium text-white transition-all duration-300 disabled:bg-lighter-gray disabled:text-dark/60 hover:bg-primary-green/80',
        size && size == 'mini' ? 'py-2 px-4 text-sm' : 'py-3 px-4',
        rounded ? 'rounded-full' : 'rounded-xl'
      )}
      {...rest}
    >
      {is_loading && (
        <div>
          <svg
            className='-ml-1 mr-3 h-5 w-5 animate-spin text-white'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
          >
            <circle
              className='opacity-25'
              cx='12'
              cy='12'
              r='10'
              stroke='currentColor'
              strokeWidth='4'
            ></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
            ></path>
          </svg>
        </div>
      )}
      <div className='text-black'>{children}</div>
    </button>
  );
}
