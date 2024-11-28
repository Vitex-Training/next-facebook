import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputWithErrorProps {
  additionalClass?: string;
  errorMessage?: string;
  register: UseFormRegisterReturn;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, InputWithErrorProps {}

const InputWithError: React.FC<InputProps> = ({ additionalClass, errorMessage, register, ...prop }) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className='relative w-full'>
      <input
        {...prop}
        className={`w-full rounded-md border border-[#ccd0d5] p-[11px] text-sm ${additionalClass} ${errorMessage !== 'undefined' ? '!border-red-600' : undefined}`}
        {...register}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      />
      {errorMessage !== 'undefined' && isFocused && (
        <div className="absolute z-10 rounded-md bg-red-500 px-3 py-1 text-sm text-white-0 shadow-md before:absolute before:top-[-10px] before:size-0 before:border-x-[6px] before:border-b-[12px] before:border-x-transparent before:border-b-red-500 before:content-['']">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default InputWithError;
