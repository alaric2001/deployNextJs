import { Transition } from '@headlessui/react';
import * as React from 'react';
import { Fragment } from 'react';
import {
  IoCheckmark,
  IoClose,
  IoInformation,
  IoWarning,
} from 'react-icons/io5';
import { MdError } from 'react-icons/md';

import clsxm from '@/lib/clsxm';

type ToastProps = {
  toastClassName?: string;
  type?: string;
  toastTitle?: string;
  toastMessage?: string;
  interval?: number;
  is_Showing?: boolean;
};

// How to use:
// <Toast
//   type='success'
//   toastMessage='Success'
//   toastTitle='Success'
//   interval={9000}
// />

export default function Toast({
  toastClassName,
  toastMessage,
  toastTitle,
  interval,
  type,
  is_Showing,
  ...rest
}: ToastProps) {
  const [selectedToast] = React.useState(
    type && type === 'success'
      ? 'border-2 border-green-500'
      : type && type === 'error'
      ? 'border-2 border-red-500'
      : type && type === 'warning'
      ? 'border-2 border-yellow-500'
      : type && type === 'info'
      ? 'border-2 border-blue-500'
      : 'bg-[#262D33CC]'
  );

  const [toastIcon] = React.useState(
    type && type === 'success' ? (
      <IoCheckmark className='h-[22px] w-[22px] rounded-full bg-green-500 p-1 text-[#262D33CC] text-opacity-80' />
    ) : type && type === 'error' ? (
      <MdError className='h-[22px] w-[22px] text-red-500' />
    ) : type && type === 'warning' ? (
      <IoWarning className='h-[22px] w-[22px] text-yellow-500' />
    ) : type && type === 'info' ? (
      <IoInformation className='h-[22px] w-[22px] rounded-full bg-blue-500' />
    ) : (
      'bg-[#262D33CC]'
    )
  );

  const [isShowing, setIsShowing] = React.useState(false);
  React.useEffect(() => {
    setIsShowing(true);
    setTimeout(() => {
      setIsShowing(false);
    }, interval || 5000);
  }, [interval]);

//  const [isShowing, setIsShowing] = React.useState(true);
//  const toastShow = () => setIsShowing(!isShowing);

  console.log('toast :', isShowing)

  return (
    <Transition
      as={Fragment}
      show={isShowing}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
      <div
        className={clsxm(
          toastClassName,
          'fixed top-10 z-[1000] flex w-full flex-col items-center justify-center'
        )}
        {...rest}
      >
        <div
          className={clsxm(
            'flex items-center rounded-full bg-[#262D33CC] px-4 py-3 text-white opacity-80',
            selectedToast
          )}
        >
          {toastIcon}
          <div className='pl-[18px]'>
            <h3 className='text-sm font-medium'>{toastTitle}</h3>
            <p className='text-xs text-[#BBBBBB]'>{toastMessage}</p>
          </div>
          <button onClick={() => setIsShowing(false)} className='ml-[100px]'>
            <IoClose className='text-[#969BA0]' />
          </button>
          {/* <button onClick={toastShow} className='ml-[100px]'>
            <IoClose className='text-[#969BA0]' />
          </button> */}
        </div>
      </div>
    </Transition>
  );
}
