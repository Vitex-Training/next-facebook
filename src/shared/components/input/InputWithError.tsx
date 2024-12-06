import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { AppInput, InputProps } from 'src/shared/components/input/AppInput';

export interface InputWithErrorProps extends InputProps {
  readonly errorMessage: string | undefined;
  readonly register: UseFormRegisterReturn;
}

const InputWithError: React.FC<InputWithErrorProps> = ({
  className,
  errorMessage,
  register,
  type,
  variant,
  ...props
}) => {
  return (
    <div className='relative w-full'>
      <AppInput
        {...props}
        className={`${className} peer ${errorMessage && '!border-red-600'}`}
        type={type}
        variant={variant}
        {...register}
      />
      {errorMessage && (
        <div className="absolute z-10 hidden rounded-md bg-red-500 px-3 py-1 text-sm text-white shadow-md before:absolute before:top-[-10px] before:size-0 before:border-x-[6px] before:border-b-[12px] before:border-x-transparent before:border-b-red-500 before:content-[''] peer-focus:block">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

InputWithError.displayName = 'InputError';

export default InputWithError;
