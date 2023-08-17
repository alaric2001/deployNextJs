/**
 * @author PT. ESD - Telkom University
 * @copyright © All rights reserved. Dashboard 2023
 */

import Image from 'next/image';
import { useState } from 'react';
import { IoImageOutline } from 'react-icons/io5';

import LanguageSelector from '@/components/LanguageSelector';
import HeadTag from '@/components/layout/HeadTag';
import Layout from '@/components/layout/Layout';
import PrimaryButton from '@/components/PrimaryButton';
import SelectInput from '@/components/SelectInput';
import TextAreaInput from '@/components/TextAreaInput';
import TextInput from '@/components/TextInput';

import DashboardLogoOnly from '~/images/Dashboard-logo-only.png';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

export default function Report() {
  const [disabled, setDisabled] = useState(true);
  const [fileCount, setFileCount] = useState<number>(0);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      if (files.length + selectedFiles.length > 4) {
        alert('You can only upload up to 4 files.');
      } else {
        setFiles([...files, ...Array.from(selectedFiles)]);
        setFileCount(files.length + selectedFiles.length);
      }
    }
  };

  function handleOnChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    if (e.target.value.length >= 40) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }
  return (
    <Layout>
      <main>
        <HeadTag title='Report' />
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
              <div className='mt-[15px] flex w-full flex-col items-start'>
                <h5 className='text-2xl font-semibold'>Your Feedback</h5>
                <h6>
                  <span className='text-dark/60'>
                    Tell us about your concerns! By letting us know, you are
                    helping us to improve Dashboard
                  </span>
                  👋
                </h6>
              </div>
              <div className='mt-7 flex w-full flex-col gap-2'>
                <TextInput inputClassName='h-[47px]' placeholder='Email' />
                <SelectInput
                  selectClassName='h-[47px]'
                  placeholder='Feedback type'
                >
                  <option value='Bug'>Bug</option>
                  <option value='Sugestion'>Suggestion</option>
                  <option value='Improvement'>Improvement</option>
                </SelectInput>
                <TextAreaInput
                  inputClassName='h-[151px]'
                  placeholder='Tell us your feedback min 40 char'
                  onChange={handleOnChange}
                />
                <h6 className='mt-5 text-dark/60'>
                  Upload supporting media (Optional)
                </h6>
                <input
                  type='file'
                  id='File'
                  onChange={handleFileChange}
                  multiple
                  hidden
                />
                <label
                  htmlFor='File'
                  className='flex h-[80px] w-[80px] cursor-pointer flex-col items-center justify-center rounded bg-lighter-gray text-base text-[#11121294]'
                >
                  <IoImageOutline size={30} />
                  {fileCount}/4
                </label>
                <PrimaryButton disabled={disabled} btnClassName='mt-[43px]'>
                  Submit
                </PrimaryButton>
              </div>
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
