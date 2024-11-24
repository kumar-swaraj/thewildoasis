import ReservationList from '@/components/ReservationList';
import { auth } from '@/lib/auth';
import { getBookings } from '@/lib/data-service';
import type { IBooking } from '@/types/booking';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Reservations',
};

export default async function Page() {
  const session = await auth();

  let reservations: IBooking[] = [];
  if (session?.user?.id) {
    reservations = await getBookings(session.user.id);
    reservations.sort(
      (a, b) =>
        new Date(b.startDate).valueOf() - new Date(a.startDate).valueOf()
    );
  }

  return (
    <div>
      <h2 className="mb-7 text-2xl font-semibold text-accent-400">
        Your reservations
      </h2>

      {reservations.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{' '}
          <Link
            className="text-accent-500 underline"
            href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList reservations={reservations} />
      )}
    </div>
  );
}
