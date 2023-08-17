import * as React from 'react';
import { ReactElement } from 'react';

import clsxm from '@/lib/clsxm';

type SelectInputProps = {
  selectClassName?: string;
  type?: string;
  value?: string;
  placeholder?: string;
  // options?: Array<unknown>;
  children?: ReactElement | ReactElement[];
  onChange?: (event: any) => void;
};

export default function SelectInput({
  selectClassName,
  // options,
  value,
  children,
  onChange,
  ...rest
}: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={onChange || undefined}
      className={clsxm(
        'w-full rounded-lg border-lighter-gray py-1.5 text-sm text-dark/80 placeholder:text-dark/35 focus:border-none focus:ring-primary-green',
        selectClassName
      )}
      {...rest}
    >
      {children}
    </select>
  );
}
