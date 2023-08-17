import * as React from 'react';

import clsxm from '@/lib/clsxm';

type RadioButtonProps = {
  radioClassName?: string;
  labelClassName?: string;
  name?: string;
  children?: string;
  value?: string;
  checked?: boolean;
  onChange?: (event: any) => void;
};

export default function RadioButton({
  radioClassName,
  labelClassName,
  name,
  children,
  value,
  checked,
  onChange,
  ...rest
}: RadioButtonProps) {
  return (
    <div className='flex items-center gap-1'>
      <input
        {...rest}
        type='radio'
        name={name}
        value={value || ''}
        onChange={onChange || undefined}
        checked={checked || false}
        className={clsxm(
          radioClassName,
          'border-dark/35 checked:text-primary-green focus:ring-primary-green'
        )}
      />
      {children ? (
        <label className={clsxm(labelClassName, 'text-dark/35')}>
          {children}
        </label>
      ) : (
        ''
      )}
    </div>
  );
}
