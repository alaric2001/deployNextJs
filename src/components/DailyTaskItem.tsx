import * as React from 'react';
import { IoRepeat } from 'react-icons/io5';
import Moment from 'react-moment';

import clsxm from '@/lib/clsxm';

import Checkbox from '@/components/Checkbox';
import CalendarIcon from '@/components/icons/iconly/CalendarIcon';

type DailyTaskItemProps = {
  title: string;
  date: string;
  type?: string;
  is_checked?: boolean;
  onChangeCheck?: (event: unknown) => void;
};

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function DailyTaskItem({
  title,
  date,
  is_checked,
  type,
  onChangeCheck,
}: DailyTaskItemProps) {
  return (
    <div
      className={clsxm(
        'flex items-center gap-3 rounded-lg border p-2',
        type === 'danger' ? 'border-danger' : 'border-primary-green'
      )}
    >
      <div>
        <Checkbox
          onChange={onChangeCheck}
          checked={is_checked}
          type={type}
          checkClassName={clsxm(
            'rounded-md w-4 h-4 border-1',
            type === 'danger'
              ? 'border-danger text-danger focus:ring-danger'
              : 'border-primary-green text-primary-green focus:ring-primary-green'
          )}
        ></Checkbox>
      </div>
      <div className='flex flex-col gap-1 '>
        <span
          className={clsxm(
            'text-xs text-dark-coin',
            is_checked ? 'line-through' : ''
          )}
        >
          {title}
        </span>
        <div className='flex items-center gap-2'>
          <CalendarIcon
            className={clsxm(
              'h-4 w-4',
              type === 'danger' ? 'text-danger' : 'text-primary-green'
            )}
          />
          <span
            className={clsxm(
              'text-xs',
              type === 'danger' ? 'text-danger' : 'text-primary-green'
            )}
          >
            <Moment date={date} format='DD/MM/YYYY' />
          </span>
          <div>
            <IoRepeat />
          </div>
        </div>
      </div>
    </div>
  );
}
