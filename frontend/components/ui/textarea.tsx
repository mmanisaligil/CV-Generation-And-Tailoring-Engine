import { TextareaHTMLAttributes } from 'react';
import clsx from 'clsx';

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={clsx('w-full rounded-md border border-slate-300 px-3 py-2 text-sm', className)} {...props} />;
}
