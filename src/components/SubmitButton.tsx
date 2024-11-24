'use client';
import { type PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  pendingLabel: string;
}

export default function SubmitButton({
  pendingLabel,
  children,
}: PropsWithChildren<SubmitButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {pending ? pendingLabel : children}
    </button>
  );
}
