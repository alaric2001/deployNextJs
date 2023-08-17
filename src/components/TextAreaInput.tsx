import * as React from 'react';

import clsxm from '@/lib/clsxm';

type TextAreaInputProps = {
  inputClassName?: string;
  value?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function TextAreaInput({
  inputClassName,
  placeholder,
  onChange,
  value,
  ...rest
}: TextAreaInputProps) {
  return (
    <textarea
      placeholder={placeholder || ''}
      onChange={onChange}
      {...rest}
      className={clsxm(
        inputClassName,
        'w-full rounded-lg border-gray-username p-3 placeholder:text-dark/35 focus:border-none focus:ring-primary-green'
      )}
      value={value}
    />
  );
}
