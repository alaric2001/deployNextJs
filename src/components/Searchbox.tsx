import React from 'react';
import { BiSearch } from 'react-icons/bi';

import clsxm from '@/lib/clsxm';

type TextInputProps = {
  inputClassName?: string;
  placeholder?: string;
};

export default function Searchbox({
  inputClassName,
  placeholder,
  ...rest
}: TextInputProps) {
  return (
    <div className='relative flex items-center'>
      <BiSearch className='absolute ml-[17px] text-[22px]' />
      <input
        {...rest}
        type='text'
        className={clsxm(
          inputClassName,
          'border-1 w-full rounded-full border-[#B7B7B7] pl-[42px] pr-[17px] placeholder:font-normal placeholder:text-[#B7B7B7]'
        )}
        placeholder={placeholder}
      />
    </div>
  );
}
