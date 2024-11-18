'use client';
import { CounterAction } from 'src/app/(publicPages)/(auth)/state';

export const CounterController = () => {
  return (
    <div className='flex gap-4'>
      <button className='bg-red-600' onClick={CounterAction.increment}>
        Increment
      </button>
      <button className='bg-red-600' onClick={CounterAction.decrement}>
        Decrement
      </button>
    </div>
  );
};
