import { Menu } from '@headlessui/react';
import axios from 'axios';
import Image from 'next/image';
import router from 'next/router';
import * as React from 'react';
import { useCookies } from 'react-cookie';

import clsxm from '@/lib/clsxm';

export default function Navbar({
  data,
  className,
  updateNotification,
}: {
  data: {
    id?: string;
    is_readed?: boolean;
    photo_url: string;
    type: string;
    subject: {
      name?: string;
    };
    meta: {
      goalId?: string;
      title?: string;
      comment?: string;
    };
  };
  className?: string;
  updateNotification?: (event: unknown) => void;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'token_type',
  ]);
  const access_token = cookies['access_token'];
  const token_type = cookies['token_type'];

  const readNotification = async () => {
    if (data.id) {
      await axios.post(
        API_URL + `notifications/${data.id}/read`,
        {},
        {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        }
      );
    }
  };
  const confirmAddGoal = async (updateEvent: any) => {
    if (!data.meta.goalId) {
      return false;
    }
    await readNotification();
    try {
      await axios.post(
        API_URL + `goals/${data.meta.goalId}/approve-member`,
        {},
        {
          headers: {
            Authorization: `${token_type} ${access_token}`,
          },
        }
      );
      router.push(`/goal/${data.meta.goalId}`);
    } catch (error) {
      console.log(error);
    }
    updateEvent();
  };
  return (
    data && (
      <Menu.Item>
        {({ active }) => (
          <div
            className={clsxm(
              'flex cursor-pointer items-center gap-3 py-3 px-5 pb-7 transition-all duration-300',
              !data.is_readed && !active ? 'bg-light-green' : '',
              !data.is_readed && active ? 'bg-light-green-bold' : '',
              data.is_readed && active ? 'bg-lighter-gray' : '',
              className
            )}
          >
            {data.photo_url && (
              <Image
                src={data.photo_url}
                alt='notification-photo'
                className='h-10 w-10 flex-none rounded-full'
                width={40}
                height={40}
              />
            )}
            <div className='flex-auto'>
              {data.type &&
                ['GoalInvitation', 'add_goal'].includes(data.type) && (
                  <div className='flex flex-auto items-center gap-3'>
                    <div className='flex flex-auto flex-col gap-1'>
                      <h6 className='text-md'>
                        <span className='font-semibold'>
                          {data.subject?.name}
                        </span>{' '}
                        <span className='text-sm text-gray-message_notification'>
                          wants to add you to Goal
                        </span>{' '}
                        <span className='font-semibold'>{data.meta.title}</span>
                      </h6>
                      <small className='text-xs font-semibold text-gray-mark_notification'>
                        Now
                      </small>
                    </div>

                    <div>
                      {!data.is_readed && (
                        <button
                          onClick={() => confirmAddGoal(updateNotification)}
                          className='rounded-lg bg-blue py-2 px-4 text-xs text-white'
                        >
                          Confirmation
                        </button>
                      )}
                    </div>
                  </div>
                )}
              {data.type && data.type === 'follow' && (
                <div className='flex flex-auto items-center gap-3'>
                  <div className='flex flex-auto flex-col gap-1'>
                    <h6 className='text-md'>
                      <span className='font-semibold'>{data.subject.name}</span>{' '}
                      <span className='text-sm text-gray-message_notification'>
                        started following you
                      </span>
                    </h6>
                    <small className='text-xs font-semibold text-gray-mark_notification'>
                      Now
                    </small>
                  </div>

                  <div>
                    <button className='rounded-lg bg-primary-green py-2 px-4 text-xs text-white'>
                      Follow
                    </button>
                  </div>
                </div>
              )}
              {data.type && data.type === 'comment_task' && (
                <div className='flex flex-auto items-center gap-3 pr-24'>
                  <div className='flex flex-auto flex-col gap-1'>
                    <h6 className='text-md'>
                      <span className='font-semibold'>{data.subject.name}</span>{' '}
                      <span className='text-sm text-gray-message_notification'>
                        Commented on Task
                      </span>{' '}
                      <span>{data.meta.title}</span>
                    </h6>
                    <div className='flex items-stretch gap-2'>
                      <div className='w-2 rounded-sm bg-gray-comment_notification'></div>
                      <h6 className='text-left text-xs text-gray-message_notification'>
                        {data.meta.comment}
                      </h6>
                    </div>
                    <small className='text-xs font-semibold text-gray-mark_notification'>
                      Now
                    </small>
                  </div>
                </div>
              )}
              {data.type && data.type === 'vote_goal' && (
                <div className='flex flex-auto items-center gap-3 pr-24'>
                  <div className='flex flex-auto flex-col gap-1'>
                    <h6 className='text-md'>
                      <span className='font-semibold'>{data.subject.name}</span>{' '}
                      <span className='text-sm text-gray-message_notification'>
                        voted your Goal
                      </span>{' '}
                      <span>{data.meta.title}</span>
                    </h6>
                    <div className='flex items-stretch gap-2'>
                      <div className='w-2 rounded-sm bg-gray-comment_notification'></div>
                      <h6 className='text-left text-xs text-gray-message_notification'>
                        {data.meta.comment}
                      </h6>
                    </div>
                    <small className='text-xs font-semibold text-gray-mark_notification'>
                      Now
                    </small>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Menu.Item>
    )
  );
}
