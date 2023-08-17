/**
 * @author PT. ESD - Telkom University
 * @copyright © All rights reserved. Dashboard 2023
 */

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import LanguageSelector from '@/components/LanguageSelector';
import HeadTag from '@/components/layout/HeadTag';
import Layout from '@/components/layout/Layout';
import TextInput from '@/components/TextInput';
import Toast from '@/components/Toast';

import DashboardLogoOnly from '~/images/Dashboard-logo-only.png';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [is_loading, setIsLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const setDataHandler = (field: string, value: any) => {
    setData((prevData) => {
      return {
        ...prevData,
        [field]: value,
      };
    });
  };

  const [error, setError] = useState<string>('');
  const [cookies, setCookie] = useCookies(['access_token', 'token_type']);

  const loginHandler = () => {
    const payload = {
      email: data?.email,
      password: data?.password,
    };
    try {
      setIsLoading(true);
      axios
        .post(`${API_URL}/login`, payload,  {
          headers: { "Content-Type": 'application/json'},
        })
        .then((res) => {

          if (res.status === 200) {
            const expires = new Date();
            expires.setTime(
              expires.getTime() + res.data.token.expires_in * 1000
            );
            setCookie('access_token', res.data.token.access_token, {
              path: '/dashboard/index_dashboard',
              expires,
            });
            setCookie('token_type', res.data.token.token_type, {
              path: '/dashboard/index_dashboard',
            });
            router.push('/dashboard/index_dashboard');
            setIsLoading(false);
          } else {
            alert("gagal")
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setError('Username or password is incorrect');
        });
    } catch (error) {
      setIsLoading(false);
      setError('Username or password is incorrect');
    }
  };

  const onKeyPressLogin = (evt: any) => {
    if (evt?.code === 'Enter') {
      loginHandler();
    }
  };

  return (
    <Layout>
      <main>
        <HeadTag title='Login' />
        <div className='w-100 flex min-h-screen items-center justify-center bg-light-gray'>
          <div className='flex w-full flex-col items-center py-9'>
            <div className='flex flex-col items-center rounded-card bg-white p-16 text-dark shadow-card md:w-2/5 lg:w-1/3'>
              <Image
                src={DashboardLogoOnly.src}
                className='scale-90 object-scale-down'
                alt='Dashboard-logo'
                width={84}
                height={84}
              />
              <div className='flex w-full flex-col items-start'>
                <h5 className='text-2xl font-semibold'>Login</h5>
                <h6>
                  <span className='text-dark/60'>Welcome to Dashboard App</span>
                  👋
                </h6>
              </div>
              {/* <div className='mt-2 flex w-full flex-col gap-3'>
                <SocialButton type='google'>Sign In With Google</SocialButton>
                <SocialButton type='facebook'>
                  Sign In With Facebook
                </SocialButton>
              </div>

              <div className='flex justify-center'>
                <h6 className='text-sm font-semibold text-dark/58'>or</h6>
              </div> */}

              {/* FORGOT PASSWORD */}
              <div className='mt-1 flex w-full flex-col gap-2'>
                <TextInput
                  placeholder='Email'
                  type='email'
                  value={data?.email}
                  onChange={(event) => {
                    setDataHandler('email', event.target.value);
                  }}
                  onKeyDown={onKeyPressLogin}
                />
                <TextInput
                  placeholder='Password'
                  type='password'
                  value={data?.password}
                  onChange={(event) => {
                    setDataHandler('password', event.target.value);
                  }}
                  onKeyDown={onKeyPressLogin}
                />
                <div className='flex justify-center'>
                  <Link href='reset_password'>
                    <h6 className='text-sm font-semibold text-dark/58'>
                      Forgot Password?
                    </h6>
                  </Link>
                </div>
                {/* <PrimaryButton
                  is_loading={is_loading}
                  onClick={() => loginHandler()}
                >
                  Login
                </PrimaryButton> */}
                <button
                  // is_loading={is_loading}
                  onClick={() => loginHandler()}
                  type='button'
                  className='mr-2 mb-2 rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200 hover:bg-gray-200'
                >
                  Login
                </button>
              </div>
            </div>
            {/* <div className='mt-4'>
              <h6 className='flex justify-center gap-2 text-dark/35'>
                <span>Don't have an account yet?</span>
                <Link className='font-semibold text-dark' href='/register'>
                  Register
                </Link>
              </h6>
              <h6 className='flex justify-center gap-2 text-dark/35'>
                <span>If you encounter problems,</span>
                <Link href='/report' className='font-semibold text-green-400'>
                  Report a problem
                </Link>
              </h6>
            </div> */}
          </div>
        </div>
        <div className='fixed bottom-9 left-9'>
          <LanguageSelector />
        </div>
        {error && (
          //  ERROR TOAST
          <Toast
            toastMessage={error}
            type='error'
            toastTitle='Login Failed'
            interval={5000}
          />
        )}
      </main>
    </Layout>
  );
}
