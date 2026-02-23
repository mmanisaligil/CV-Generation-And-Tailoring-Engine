import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx('rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60', className)}
      {...props}
    />
  );
}
