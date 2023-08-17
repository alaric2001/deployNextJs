import Image from 'next/image';

import Layout from '@/components/layout/Layout';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';

import DashboardLogoOnly from '~/images/Dashboard-logo-only.png';

export default function ResetPassword() {
  return (
    <Layout>
      <main>
        <div className='w-100 flex min-h-screen items-center justify-center bg-light-gray'>
          <div className='flex w-full flex-col items-center py-16'>
            <div className='flex flex-col items-center rounded-card bg-white p-16 text-dark shadow-card md:w-2/5 lg:w-1/3'>
              <Image
                src={DashboardLogoOnly.src}
                className='scale-90 object-scale-down'
                alt='Dashboard-logo'
                width={84}
                height={84}
              />
              <div className='flex w-full flex-col items-start'>
                <h5 className='text-2xl font-semibold'>Forgot Password?</h5>
                <span className='text-[14px] text-dark/60'>
                  Please enter the email you used when registering to receive
                  reset instruction.
                </span>
              </div>
              <div className='mt-7 flex w-full flex-col gap-2'>
                <TextInput placeholder='Email' type='email' />
                <PrimaryButton>Reset password</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
