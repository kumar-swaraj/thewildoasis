'use client';
import SpinnerMini from '@/components/SpinnerMini';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useTransition } from 'react';

interface DeleteReservationProps {
  reservationId: string;
  onDelete: (reservationId: string) => Promise<void>;
}

function DeleteReservation({
  reservationId,
  onDelete,
}: DeleteReservationProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (confirm('Are your sure you want to delete this reservation?')) {
      startTransition(() => onDelete(reservationId));
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="group flex flex-grow items-center gap-2 px-3 text-xs font-bold uppercase text-primary-300 transition-colors hover:bg-accent-600 hover:text-primary-900">
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 transition-colors group-hover:text-primary-800" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation;
