'use client';
import ReservationCard from '@/components/ReservationCard';
import { deleteReservation } from '@/lib/action';
import type { IBooking } from '@/types/booking';
import { useOptimistic } from 'react';

interface ReservationListProps {
  reservations: IBooking[];
}

export default function ReservationList({
  reservations,
}: ReservationListProps) {
  const [optimisticReservations, optimisticDelete] = useOptimistic(
    reservations,
    (curReservations, reservationId: string) =>
      curReservations.filter((reservation) => reservation._id !== reservationId)
  );

  async function handleDelete(reservationId: string) {
    optimisticDelete(reservationId);
    await deleteReservation(reservationId);
  }

  return (
    <ul className="space-y-6">
      {optimisticReservations.map((reservation) => (
        <ReservationCard
          reservation={reservation}
          onDelete={handleDelete}
          key={reservation._id}
        />
      ))}
    </ul>
  );
}
