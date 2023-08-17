/**
 * @author PT. ESD - Telkom University
 * @copyright © All rights reserved. Dashboard 2023
 */

import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
// my-component.tsx
import { useTranslation } from 'react-i18next';

import { getBaseUrl, getDefaultClient } from '@/lib/http/client';

import LanguageSelector from '@/components/LanguageSelector';
import HeadTag from '@/components/layout/HeadTag';
import Layout from '@/components/layout/Layout';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';

import DashboardLogoOnly from '~/images/Dashboard-logo-only.png';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function Register() {
  const { t: translate } = useTranslation();
  const router = useRouter();

  const [registration, setRegistration] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const setRegistrationHandler = (field: string, value: any) => {
    setRegistration((prevRegistration) => {
      return {
        ...prevRegistration,
        [field]: value,
      };
    });
  };

  const registerHandler = async () => {
    try {
      const payload = {
        name: registration?.name,
        username: registration?.username,
        email: registration?.email,
        password: registration?.password,
        password_confirmation: registration?.passwordConfirmation,
      };
      const response = await getDefaultClient().post(
        `${getBaseUrl()}/register`,
        payload
      );

      router.push('/dashboard');
      //TODO: store token to redux and success message
    } catch (error) {
      console.log(error);
      //TODO: catch error and show to user
    }
  };

  return (
    <Layout>
      <main>
        <HeadTag title='Register' />
        <div className='w-100 flex min-h-screen items-center justify-center bg-light-gray'>
          <div className='flex w-full flex-col items-center py-16'>
            <div className='flex flex-col items-center rounded-card bg-white p-16 text-dark shadow-card md:w-2/5 xl:w-1/3'>
              <Image
                src={DashboardLogoOnly.src}
                className='scale-90 object-scale-down'
                alt='Dashboard-logo'
                width={84}
                height={84}
              />
              <div className='flex w-full flex-col items-start'>
                <h5 className='text-2xl font-semibold capitalize'>
                  {translate('register')}
                </h5>
                <h6>
                  <span className='text-dark/60'>
                    {translate('Welcome to Dashboard')}
                  </span>
                  👋
                </h6>
              </div>
              <div className='mt-7 flex w-full flex-col gap-2'>
                <TextInput
                  placeholder={translate('Name')}
                  value={registration?.name}
                  onChange={(event) =>
                    setRegistrationHandler('name', event.target.value)
                  }
                />
                <TextInput
                  placeholder={translate('Username')}
                  value={registration?.username}
                  onChange={(event) =>
                    setRegistrationHandler('username', event.target.value)
                  }
                />
                <TextInput
                  placeholder={translate('Email')}
                  type='email'
                  value={registration?.email}
                  onChange={(event) =>
                    setRegistrationHandler('email', event.target.value)
                  }
                />

                <TextInput
                  placeholder={translate('Password')}
                  type='password'
                  value={registration?.password}
                  onChange={(event) =>
                    setRegistrationHandler('password', event.target.value)
                  }
                />
                <TextInput
                  placeholder={translate('Confirm Password')}
                  type='password'
                  value={registration?.passwordConfirmation}
                  onChange={(event) =>
                    setRegistrationHandler(
                      'passwordConfirmation',
                      event.target.value
                    )
                  }
                />

                {/* <div className='flex justify-center'>
                  <h6 className='text-sm font-semibold text-dark/58'>
                    {translate('or')}
                  </h6>
                </div>
                <div className='flex w-full flex-col gap-3'>
                  <SocialButton type='google'>
                    {translate('Sign In With Google')}
                  </SocialButton>
                  <SocialButton type='facebook'>
                    {translate('Sign In With Facebook')}
                  </SocialButton>
                </div> */}
                <PrimaryButton
                  btnClassName='capitalize'
                  onClick={() => registerHandler()}
                >
                  {translate('register')}
                </PrimaryButton>
              </div>
            </div>
            <div className='mt-4'>
              <h6 className='flex items-center gap-3 text-dark/35'>
                <span>{translate('Already have account?')}</span>
                <span className='font-semibold text-dark'>
                  {translate('Login')}
                </span>
              </h6>
            </div>
          </div>
        </div>
        <div className='fixed bottom-9 left-9'>
          <LanguageSelector />
        </div>
      </main>
    </Layout>
  );
}
