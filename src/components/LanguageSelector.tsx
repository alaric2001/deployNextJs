import { Menu } from '@headlessui/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import { MdExpandMore, MdLanguage } from 'react-icons/md';

import clsxm from '@/lib/clsxm';

type LanguageSelectorProps = {
  disabled?: boolean;
};

export default function LanguageSelector({
  disabled,
  ...rest
}: LanguageSelectorProps) {
  const { locale, locales, route, pathname, asPath, query } = useRouter();
  const router = useRouter();
  const [lang, setLang] = useState(locale ? locale : 'en');
  const [langs, setLangs] = useState([
    {
      name: 'English',
      code: 'en',
      href: '/en',
    },
    {
      name: 'Indonesia',
      code: 'id',
      href: '/id',
    },
  ]);

  const selectLanguage = (code: string) => {
    const selectedLanguage = langs.find((elem) => elem.code === code);
    if (!selectedLanguage) {
      return false;
    }
    setLang(code);
    router.push({ pathname, query }, asPath, { locale: code });
  };
  return (
    <Menu {...rest}>
      {({ open }) => (
        <>
          <Menu.Button className='flex items-center gap-2 rounded-md bg-light-green py-2 px-4 text-dark'>
            <span className='text-lg'>
              <MdLanguage />
            </span>
            {langs.find((elem) => elem.code === lang) && (
              <span className='capitalize'>
                {langs.find((elem) => elem.code === lang)?.name}
              </span>
            )}
            <span>
              <MdExpandMore
                className={clsxm(
                  'transition-all duration-300',
                  open ? 'rotate-180' : ''
                )}
              />
            </span>
          </Menu.Button>
          {open && (
            <Menu.Items className='absolute bottom-16 flex w-full flex-col overflow-hidden rounded-md bg-white shadow-xl'>
              {langs.map((lang, index) => {
                return (
                  <Menu.Item key={index}>
                    <div
                      onClick={() => selectLanguage(lang.code)}
                      className='cursor-pointer p-4 transition-all duration-300 hover:bg-primary-green/10'
                    >
                      {lang.name}
                    </div>
                  </Menu.Item>
                );
              })}
            </Menu.Items>
          )}
        </>
      )}
    </Menu>
  );
}
