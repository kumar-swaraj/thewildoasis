import SubmitButton from '@/components/SubmitButton';
import { updateReservation } from '@/lib/action';
import { getBooking } from '@/lib/data-service';
import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Reservation',
};

export default async function Page({
  params,
}: {
  params: Promise<{ reservationId: string }>;
}) {
  const { reservationId } = await params;
  const reservation = await getBooking(reservationId);

  const updateReservationWithId = updateReservation.bind(null, reservationId);

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Edit Reservation #{reservationId}
      </h2>

      <form
        action={updateReservationWithId}
        className="flex flex-col gap-6 bg-primary-900 px-12 py-8 text-lg">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            defaultValue={reservation.numGuests}
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
            required>
            <option
              value=""
              key="">
              Select number of guests...
            </option>
            {Array.from(
              { length: reservation.cabin.maxCapacity },
              (_, i) => i + 1
            ).map((x) => (
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
            defaultValue={reservation.observations}
            name="observations"
            className="w-full rounded-sm bg-primary-200 px-5 py-3 text-primary-800 shadow-sm"
          />
        </div>

        <div className="flex items-center justify-end gap-6">
          <SubmitButton pendingLabel="Updating...">
            Update Reservation
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}
