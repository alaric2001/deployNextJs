import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

import clsxm from '@/lib/clsxm';

import CircleCloseIcon from '@/components/icons/Custom/CircleCloseIcon';
import BoldCameraIcon from '@/components/icons/iconly/Bold/BoldCameraIcon';
import HelpCircleIcon from '@/components/icons/iconly/HelpCircleIcon';
import HomeIcon from '@/components/icons/iconly/HomeIcon';
import LanguageIcon from '@/components/icons/iconly/LanguageIcon';
import PlusIcon from '@/components/icons/iconly/PlusIcon';
import SearchIcon from '@/components/icons/iconly/SearchIcon';
import SettingIcon from '@/components/icons/iconly/SettingIcon';
import UserIcon from '@/components/icons/iconly/UserIcon';
import PrimaryButton from '@/components/PrimaryButton';
import TextAreaInput from '@/components/TextAreaInput';
import TextInput from '@/components/TextInput';

export default function Sidebar() {
  const router = useRouter();
  const { asPath } = useRouter();
  const [newGoalModal, setNewGoalModal] = useState(false);
  const [newSearchFriend, setFindFriend] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    file: null,
  });
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [cookies, setCookie] = useCookies(['access_token', 'token_type']);
  const access_token = cookies['access_token'];
  const token_type = cookies['token_type'];
  const headerAuth = {
    Authorization: token_type + ' ' + access_token,
  };

  const showNewGoalModal = () => {
    setNewGoalModal(true);
  };

  const showSearchFriend = () => {
    setFindFriend(true);
  };

  const closeNewGoalModal = () => {
    setNewGoalModal(false);
  };

  const closeFindFriend = () => {
    setFindFriend(false);
  };

  const handleFileChange = (event: any) => {
    const selectedFiles = event.target.files[0];

    if (selectedFiles) {
      setForm({
        ...form,
        file: selectedFiles,
      });
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // if (e.target.value.length >= 40) {
    //   setDisabled(false);
    // } else {
    //   setDisabled(true);
    // }
    console.log(e);
  };

  const updateTitleGoal = (e: any) => {
    setForm((prev) => {
      return {
        ...prev,
        title: e.target.value,
      };
    });
  };

  const updateDescriptionGoal = (e: any) => {
    setForm((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };

  const submitNewGoal = () => {
    if (!form.title) {
      alert('title required');
      return;
    }
    if (!form.description) {
      alert('description required');
      return;
    }
    const formData = new FormData();
    formData.append('name', form.title);
    formData.append('description', form.description);
    if (form.file) {
      formData.append('image', form.file);
    }

    axios
      .post(API_URL + 'goals', formData, {
        headers: headerAuth,
      })
      .then((res) => {
        if ((res.status == 200 || res.status == 201) && res.data.data) {
          setNewGoalModal(false);
          setForm({
            title: '',
            description: '',
            file: null,
          });
          router.push('/goal/' + res.data.data.id);
        }
      });
  };

  const getFileUrl = () => {
    if (!form.file) {
      return '';
    }
    return URL.createObjectURL(form.file);
  };
  return (
    <div className='w-16'>
      <div className='fixed inset-y-0 left-0 flex h-screen w-16 flex-col items-center border-r border-lighter-gray bg-white py-8'>
        <div className='flex flex-auto flex-col items-center'>
          <div className='flex flex-col items-center gap-4'>
            <Link href='/dashboard'>
              <HomeIcon
                className={clsxm(
                  'h-10 w-10 cursor-pointer p-2 transition-all duration-300',
                  asPath === '/dashboard' ? 'rounded-menu bg-menu-gray' : ' '
                )}
              />
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div>
            <LanguageIcon
              className={clsxm(
                'h-10 w-10 cursor-pointer rounded-menu p-2 transition-all duration-300'
              )}
            />
          </div>
          <div>
            <SettingIcon
              className={clsxm(
                'h-10 w-10 cursor-pointer rounded-menu p-2 transition-all duration-300'
              )}
            />
          </div>
          <div>
            <HelpCircleIcon
              className={clsxm(
                'h-10 w-10 cursor-pointer rounded-menu p-2 transition-all duration-300'
              )}
            />
          </div>
        </div>
      </div>

      <div className=''>
        <Transition
          show={newGoalModal}
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
          as='div'
        >
          <Dialog onClose={() => closeNewGoalModal()} className='relative z-50'>
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

            {/* Full-screen container to center the panel */}
            <div className='fixed inset-0 flex items-center justify-center p-4'>
              {/* The actual dialog panel  */}
              <Dialog.Panel className='relative mx-auto w-full max-w-lg rounded-lg bg-white px-8 pt-4 pb-8'>
                <Dialog.Title className='text-center text-lg font-bold'>
                  Create New Goals
                </Dialog.Title>
                <div className='mt-6 flex w-full max-w-xl flex-col items-center justify-center'>
                  <div>
                    <input
                      type='file'
                      id='File'
                      onChange={handleFileChange}
                      accept='image/*'
                      hidden
                    />
                    <label
                      htmlFor='File'
                      className='flex h-[80px] w-[80px] cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-username bg-light-gray text-base text-[#11121294]'
                    >
                      {form.file && (
                        <div>
                          <Image
                            src={getFileUrl()}
                            alt='goal photo'
                            width='60'
                            height='60'
                            style={{
                              objectFit: 'cover',
                            }}
                          />
                        </div>
                      )}
                      {!form.file && (
                        <BoldCameraIcon className='h-7 w-7 text-gray-username' />
                      )}
                    </label>
                  </div>
                  <div className='mt-3 flex w-full flex-col gap-1 font-medium'>
                    <label className='text-md'>Title Goal</label>
                    <TextInput
                      type='text'
                      value={form.title}
                      onChange={updateTitleGoal}
                    ></TextInput>
                  </div>
                  <div className='mt-3 flex w-full flex-col gap-1 font-medium'>
                    <label className='text-md'>Goal description</label>
                    <TextAreaInput
                      type='text'
                      value={form.description}
                      onChange={updateDescriptionGoal}
                    ></TextAreaInput>
                  </div>
                  <div className='mt-3 w-full'>
                    <PrimaryButton
                      onClick={() => submitNewGoal()}
                      btnClassName='w-full'
                    >
                      Create Goals
                    </PrimaryButton>
                  </div>
                </div>
                <div
                  onClick={() => closeNewGoalModal()}
                  className='absolute -top-3 -right-3 cursor-pointer'
                >
                  <CircleCloseIcon className='h-8 w-8' />
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </Transition>
      </div>

      <div className=''>
        <Transition
          show={newSearchFriend}
          enter='transition duration-100 ease-out'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'
          as='div'
        >
          <Dialog onClose={() => closeFindFriend()} className='relative z-50'>
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

            {/* Full-screen container to center the panel */}
            <div className='items-left fixed  inset-0 flex  overflow-y-auto p-4'>
              {/* The actual dialog panel  */}
              <Dialog.Panel className='relative left-0 top-0 mx-auto w-full max-w-lg bg-white px-8 pt-4 pb-8'>
                <Dialog.Title className='text-center text-lg font-bold'>
                  Search Friend
                </Dialog.Title>
                <div
                  onClick={() => closeFindFriend()}
                  className='absolute -top-3 -right-3 cursor-pointer'
                >
                  <CircleCloseIcon className='h-8 w-8' />
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}
