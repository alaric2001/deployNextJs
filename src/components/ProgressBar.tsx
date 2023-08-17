import * as React from 'react';

type SecondaryButtonProps = {
  value?: number;
};

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function ProgressBar({ value, ...rest }: SecondaryButtonProps) {
  const progressStyle = {
    width: (value && value >= 0 && value <= 100 ? value : 0) + '%',
  };
  return (
    <div {...rest} className='relative h-2 w-[160px] pr-8'>
      <div className='absolute inset-0 z-10 rounded-lg bg-gray-progress'></div>
      <div
        className='absolute top-0 bottom-0 left-0 z-20 rounded-lg bg-primary-green'
        style={progressStyle}
      ></div>
    </div>
  );
}
