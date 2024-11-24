'use client';
import SubmitButton from '@/components/SubmitButton';
import { useReservation } from '@/contexts/ReservationContext';
import { createReservation } from '@/lib/action';
import type { ICabin } from '@/types/cabin';
import { differenceInCalendarDays } from 'date-fns';
import { type User } from 'next-auth';
import Image from 'next/image';

interface ReservationFormProps {
  cabin: ICabin;
  user: User;
}

export default function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useReservation();
  const { _id: cabinId, maxCapacity, regularPrice, discount } = cabin;

  const { from: startDate, to: endDate } = range;

  let numNights = 0;
  if (startDate && endDate) {
    numNights = differenceInCalendarDays(endDate, startDate);
  }
  const cabinPrice = numNights * (regularPrice - discount);

  const reservationData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabin: cabinId,
  };

  const createBookingWithData = createReservation.bind(null, reservationData);

  return (
    <div className="scale-[1.01]">
      <div className="flex items-center justify-between bg-primary-800 px-16 py-2 text-primary-300">
        <p>Logged in as</p>

        <div className="flex items-center gap-4">
          <Image
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image ?? ''}
            alt={user.name ?? ''}
            height={32}
            width={32}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (data) => {
          await createBookingWithData(data);
          resetRange();
        }}
        className="flex flex-col gap-5 bg-primary-900 px-16 py-10 text-lg">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required>
            <option
              value=""
              key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option
                value={x}
                key={x}>
                {x} {x === 1 ? 'guest' : 'guests'}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          {!(startDate && endDate) ? (
            <p className="text-base text-primary-300">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve Now</SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}
