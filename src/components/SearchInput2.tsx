import { useRouter } from 'next/router';
import React from 'react';

import clsxm from '@/lib/clsxm';

import SearchIcon from '@/components/icons/iconly/SearchIcon';

type SearchInputProps = {
  disabled?: boolean;
  is_loading?: boolean;
  size?: string; //normal|mini
  rounded?: boolean;
  onKeyDown?: (event: any) => void;
};

export default function SearchComponent({
  disabled,
  size,
  is_loading,
  rounded,
  onKeyDown,
  ...rest
}: SearchInputProps) {
  const { asPath } = useRouter();

  return (
    //<form>
      <div className='relative w-56 md:w-64 lg:w-72'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <SearchIcon
            className={clsxm(
              'h-8 w-8 cursor-pointer p-2 transition-all duration-300',
              asPath === '/search' ? 'rounded-menu bg-menu-gray' : ' '
            )}
          />
        </div>
        <input
          type='text'
          className='block w-full rounded-full border border-gray-300 bg-gray-50 px-10 py-2 text-sm text-gray-900 focus:border-green-500 focus:ring-green-500'
          placeholder='Search...'
          onKeyDown={onKeyDown}
        />
        {/* <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
         */}
      </div>
    //</form>
  );
}
