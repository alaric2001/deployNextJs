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

export default function SimpleNavbar({
  children,
  bottom,
  className,
}: {
  children: React.ReactNode;
  bottom?: React.ReactElement;
  className?: string;
}) {
  const [photo_url, setPhotoUrl] = useState(
    'https://ui-avatars.com/api/?name=Rani+Mulyani'
  );
  const [name, setName] = useState('Rani Mulyani');
  const [coin, setCoin] = useState(12);
  const [username, setUsername] = useState('@ranimulyani76');
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
    getMe();
    getNotificationInfo();
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
      .post(
        API_URL + 'logout',
        {},
        {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        }
      )
      .then(async () => {
        await removeCookie('access_token');
        await removeCookie('token_type');
        window.location.href = '/login';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='flex w-full flex-col border-b border-lighter-gray bg-white py-1 pr-4 border-b-0'>
      <div className='top-0 flex w-full items-center '>
        <div className={clsxm(className, 'flex-auto')}>{children}</div>
      </div>
      {bottom}
    </div>
  );
}
