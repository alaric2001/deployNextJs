import { Menu, Transition } from '@headlessui/react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { Fragment, useState } from 'react';
import useCookies from 'react-cookie/cjs/useCookies';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import {
  IoCheckmarkCircleOutline,
  IoLogoAppleAppstore,
  IoLogoGooglePlaystore,
} from 'react-icons/io5';
import { MdChevronRight } from 'react-icons/md';

import clsxm from '@/lib/clsxm';

import CoinIcon from '@/components/icons/Custom/CoinIcon';
import MailIcon from '@/components/icons/Custom/MailIcon';
import SmileEmojiIcon from '@/components/icons/Custom/SmileEmojiIcon';
import ThemeIcon from '@/components/icons/Custom/ThemeIcon';
import AddUserIcon from '@/components/icons/iconly/AddUserIcon';
import HelpCircleIcon from '@/components/icons/iconly/HelpCircleIcon';
import LanguageIcon from '@/components/icons/iconly/LanguageIcon';
import NotificationIcon from '@/components/icons/iconly/NotificationIcon';
import SettingIcon from '@/components/icons/iconly/SettingIcon';
import NotificationItem from '@/components/NotificationItem';
import { getAuthClient } from '@/lib/http/client';
import { useRouter } from 'next/router';

export default function Navbar({
  children,
  bottom,
  className,
}: {
  children: React.ReactNode;
  bottom?: React.ReactElement;
  className?: string;
}) {
  const [photo_url, setPhotoUrl] = useState(
    'https://ui-avatars.com/api/?name=Bambang+Mulyana'
  );
  const [name, setName] = useState('Bambang Mulyana');
  const [coin, setCoin] = useState(12);
  const [username, setUsername] = useState('@bambangmulyana');
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'token_type',
  ]);
  const access_token = cookies['access_token'];
  const token_type = cookies['token_type'];
  const [loaded, setLoaded] = useState(false);

  const [notifications, setNotifications] = useState({
    unread_count: 0,
    new: [
      {
        id: '',
        photo_url: 'https://ui-avatars.com/api/?name=John+Doe',
        subject: {
          name: 'Jane Cooper',
        },
        type: 'add_goal',
        is_readed: false,
        meta: {
          title: '6 Cara Membuat Goal',
        },
        date: new Date(),
      },
    ],
    previously: [
      {
        id: '',
        photo_url: 'https://ui-avatars.com/api/?name=John+Doe',
        subject: {
          name: 'Jane Cooper',
        },
        type: 'vote_goal',
        is_readed: true,
        meta: {
          title: '6 Cara Membuat Cake Mengembang',
        },
        date: new Date(),
      },
    ],
  });
  const markAllAsRead = () => {
    setNotifications((prevData) => {
      return {
        ...prevData,
        unread_count: 0,
      };
    });
  };
  React.useEffect(() => {
    console.log("Navbar load first");
    //getMe();
    //getNotificationInfo();
  }, []);

  const getMe = () => {
    axios
      .get(`${API_URL}me`, {
        headers: {
          Authorization: `${token_type} ${access_token}`,
        },
      })
      .then((res) => {
        setName(res.data.data.fullname);
        setUsername(res.data.data.username);
      })
      .catch(async (err) => {
        await removeCookie('access_token');
        await removeCookie('token_type');
        window.location.href = '/login';
        console.log(err);
      });
  };
const router=useRouter();
  const getNotification = async () => {
    const res = await axios.get(API_URL + 'notifications', {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });
    if (res.status === 200) {
      setNotifications((prev) => {
        const results = res.data.data.map((item: any) => {
          return {
            ...item,
            is_readed: item.is_read,
            photo_url:
              item.user && item.user.profile_picture
                ? item.user.profile_picture
                : item.user && item.user.fullname
                ? `https://ui-avatars.com/api/?name=${item.user.fullname
                    .split(' ')
                    .join('+')}`
                : '',
            subject: {
              name: item.user?.fullname,
            },
            meta: {
              goalId: item.goal?.id,
              title: item.goal?.name,
            },
          };
        });
        return {
          ...prev,
          previously: results.filter((item: any) => item.id && item.is_read),
          new: results.filter((item: any) => item.id && !item.is_read),
        };
      });
    }
  };
  const updateNotification = () => {
    getNotificationInfo();
    getNotification();
  };
  const openNotification = () => {
    getNotification();
  };
  const getNotificationInfo = async () => {
    const res = await axios.get(API_URL + 'notifications/info', {
      headers: {
        Authorization: `${token_type} ${access_token}`,
      },
    });

    if (res.status == 200) {
      setNotifications((prev) => {
        return {
          ...prev,
          unread_count: res.data.data.unread_notification,
        };
      });
    }
  };
  const logout = () => {
 
    axios
      .get(
        API_URL + '/logout',
        {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        }
      )
      .then(async () => {
        removeCookie('access_token');
         removeCookie('token_type');     
         router.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='flex w-full flex-col border-b border-lighter-gray bg-white py-1 pr-4 border-b-0'>
      <div className='top-0 flex w-full items-center '>
        <div className={clsxm(className, 'flex-auto')}>{children}</div>
        <div className='flex items-center gap-4'>
          <div className='flex flex-col items-end'>
            <h6 className='text-sm font-bold'>
              <span className='text-gray-navbar'>Hi, </span>
              <span className=''>{name}</span>
            </h6>
            <h6 className='text-xs text-gray-username'>@{username}</h6>
          </div>
          <div className='h-11 w-[1px] rounded-lg bg-gray-username'></div>
          <div className='flex items-center gap-3'>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <Menu.Button className='relative rounded-full bg-menu-gray p-1'>
                  <div onClick={() => openNotification()}>
                    <NotificationIcon className='h-7 w-7 cursor-pointer p-2 transition-all duration-300' />
                    {notifications.unread_count > 0 && (
                      <div className='p-auto absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-green text-xs text-white'>
                        <small>{notifications.unread_count}</small>
                      </div>
                    )}
                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-50 mt-2 w-[460px] origin-top-right overflow-hidden rounded-xl bg-white shadow-card ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='flex items-center bg-white px-5 py-3'>
                    <h6 className='flex-auto text-lg font-medium text-dark-navbar'>
                      Notifications
                    </h6>
                    <h6
                      onClick={() => markAllAsRead()}
                      className='flex cursor-pointer items-center gap-1 text-xs text-gray-mark_notification transition-all duration-300 hover:text-dark'
                    >
                      <span>Mark all as read</span>
                      <span>
                        <IoCheckmarkCircleOutline />
                      </span>
                    </h6>
                  </div>
                  <div className='flex max-h-96 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-stone-300 scrollbar-thumb-rounded-full'>
                    <div className='sticky top-0 flex flex-col bg-white'>
                      <div className='py-3'>
                        <h6 className='text-md px-5 font-medium'>New</h6>
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      {notifications.new
                        .filter((item) => !!item.id)
                        .map((elem, index) => {
                          return (
                            <NotificationItem
                              key={index}
                              data={elem}
                              updateNotification={() => updateNotification()}
                            />
                          );
                        })}
                      {notifications.new.filter((item) => !!item.id).length ===
                        0 && (
                        <div className='px-8 text-gray-500'>
                          <h6>No New Notifications</h6>
                        </div>
                      )}
                    </div>
                    <div className='sticky top-0 flex flex-col bg-white'>
                      <div className='py-3'>
                        <h6 className='text-md px-5 font-medium'>Previously</h6>
                      </div>
                    </div>
                    <div className='flex flex-col'>
                      {notifications.previously
                        .filter((item) => !!item.id)
                        .map((elem, index) => {
                          return <NotificationItem key={index} data={elem} />;
                        })}
                      {notifications.previously.filter((item) => !!item.id)
                        .length === 0 && (
                        <div className='mb-8 px-8 text-gray-500'>
                          <h6>No Notifications</h6>
                        </div>
                      )}
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as='div' className='relative inline-block text-left'>
              <div>
                <Menu.Button className='relative'>
                  <div className='p-auto h-9 w-9 rounded-full bg-slate-500'>
                    <Image
                      src={photo_url}
                      alt='notification-photo'
                      className='h-9 w-9 flex-none rounded-full'
                      width={40}
                      height={40}
                    />
                  </div>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-50 mt-2 w-[371px] origin-top-right overflow-hidden rounded-xl bg-white pb-3 shadow-card ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='mx-5 flex items-center gap-3 py-3'>
                    <div className='p-auto h-11 w-11 rounded-full bg-slate-500'>
                      <Image
                        src={photo_url}
                        alt='notification-photo'
                        className='h-11 w-11 flex-none rounded-full'
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className='-gap-1 flex flex-auto flex-col'>
                      <h6 className='text-base font-semibold'>{name}</h6>
                      <h6 className='text-sm text-gray-username'>
                        @{username}
                      </h6>
                    </div>
                    <div className='flex items-center gap-1 rounded-full bg-coin-yellow py-2 px-3'>
                      <h6 className='text-sm font-bold text-dark-coin'>
                        {coin}
                      </h6>
                      <CoinIcon className='h-6 w-6' />
                    </div>
                  </div>
                  <div className='mb-3 h-[1px] w-full bg-lighter-gray'></div>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={clsxm(
                          'flex cursor-pointer items-center gap-2 bg-white px-5 py-2',
                          active ? 'bg-lighter-gray' : ''
                        )}
                      >
                        <AddUserIcon className='h-5 w-5' />
                        <h6>Invite Friend</h6>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={clsxm(
                          'flex cursor-pointer items-center gap-2 bg-white px-5 py-2',
                          active ? 'bg-lighter-gray' : ''
                        )}
                      >
                        <div className='flex flex-auto items-center gap-2'>
                          <ThemeIcon className='h-5 w-5' />
                          <h6>Tema</h6>
                        </div>
                        <MdChevronRight className='h-6 w-6' />
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={clsxm(
                          'flex cursor-pointer items-center gap-2 bg-white px-5 py-2',
                          active ? 'bg-lighter-gray' : ''
                        )}
                      >
                        <div className='flex flex-auto items-center gap-2'>
                          <LanguageIcon className='h-5 w-5' />
                          <h6>Bahasa / language</h6>
                        </div>
                        <MdChevronRight className='h-6 w-6' />
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={clsxm(
                          'flex cursor-pointer items-center gap-2 bg-white px-5 py-2',
                          active ? 'bg-lighter-gray' : ''
                        )}
                      >
                        <div className='flex flex-auto items-center gap-2'>
                          <SettingIcon className='h-5 w-5' />
                          <h6>Pengaturan</h6>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                  <div className='my-3 h-[1px] w-full bg-lighter-gray'></div>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={clsxm(
                          'flex cursor-pointer items-center gap-2 bg-white px-5 py-2',
                          active ? 'bg-lighter-gray' : ''
                        )}
                      >
                        <div className='flex flex-auto items-center gap-2'>
                          <HelpCircleIcon className='h-5 w-5' />
                          <h6>Bantuan</h6>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={clsxm(
                          'flex cursor-pointer items-center gap-2 bg-white px-5 py-2',
                          active ? 'bg-lighter-gray' : ''
                        )}
                      >
                        <div className='flex flex-auto items-center gap-2'>
                          <SmileEmojiIcon className='h-5 w-5' />
                          <h6>Apa yang baru?</h6>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={clsxm(
                          'flex cursor-pointer items-center gap-2 bg-white px-5 py-2',
                          active ? 'bg-lighter-gray' : ''
                        )}
                      >
                        <div className='flex flex-auto items-center gap-2'>
                          <MailIcon className='h-5 w-5' />
                          <h6>Hubungi Kami</h6>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        className={clsxm(
                          'flex cursor-pointer items-center gap-2 bg-white px-5 py-2',
                          active ? 'bg-lighter-gray' : ''
                        )}
                        onClick={() => {
                          logout();
                        }}
                      >
                        <div className='flex flex-auto items-center gap-2'>
                          <HiArrowRightOnRectangle className='h-5 w-5' />
                          <h6>Keluar</h6>
                        </div>
                      </div>
                    )}
                  </Menu.Item>
                  <div className='my-3 h-[1px] w-full bg-lighter-gray'></div>
                  <div className='py-2 px-5'>
                    <h6 className='font-semibold'>DOWNLOAD APPS</h6>
                    <div className='mt-3 flex items-center gap-3'>
                      <Link href='/'>
                        <IoLogoAppleAppstore className='h-6 w-6 text-gray-username transition-all duration-300 hover:text-primary-green' />
                      </Link>
                      <Link href='/'>
                        <IoLogoGooglePlaystore className='h-6 w-6 text-gray-username transition-all duration-300 hover:text-primary-green' />
                      </Link>
                    </div>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
      {bottom}
    </div>
  );
}
