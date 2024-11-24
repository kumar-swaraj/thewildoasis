'use client';
import { updateGuestProfile } from '@/lib/action';
import type { IGuest } from '@/types/guest';
import Image from 'next/image';
import { type PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom';

interface UpdateProfileFormProps {
  guest: IGuest;
}

export default function UpdateProfileForm({
  guest,
  children,
}: PropsWithChildren<UpdateProfileFormProps>) {
  const { fullName, email, nationality, nationalID, countryFlag } = guest;

  return (
    <form
      action={updateGuestProfile}
      className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg">
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          defaultValue={fullName}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          defaultValue={email}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          {countryFlag && (
            <Image
              width={32}
              height={24}
              src={countryFlag}
              alt={`Flag of ${nationality}`}
              className="rounded-sm"
            />
          )}
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          id="nationalID"
          name="nationalID"
          defaultValue={nationalID}
          className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-6">
        <Button />
      </div>
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 font-semibold text-primary-800 transition-all hover:bg-accent-600 disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
      {pending ? 'Updating...' : 'Update profile'}
    </button>
  );
}
