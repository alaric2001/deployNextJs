import * as React from 'react';

import clsxm from '@/lib/clsxm';

type TextInputProps = {
  inputClassName?: string;
  type?: string;
  placeholder?: string;
  value?: string | any;
  autoComplete?: string;
  onChange?: (event: any) => void;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
};

export default function TextInput({
  inputClassName,
  placeholder,
  type,
  value,
  autoComplete,
  onChange,
  onBlur,
  onKeyDown,
  ...rest
}: TextInputProps) {
  return (
    <input
      type={type || 'text'}
      placeholder={placeholder || ''}
      value={value || ''}
      onChange={onChange || undefined}
      onBlur={onBlur || undefined}
      onKeyDown={onKeyDown || undefined}
      autoComplete={autoComplete || 'off'}
      {...rest}
      className={clsxm(
        inputClassName
          ? inputClassName
          : 'w-full rounded-lg border-gray-username py-1.5 placeholder:text-dark/35 focus:border-none focus:ring-primary-green'
      )}
    />
  );
}
