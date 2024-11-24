import CabinList from '@/components/CabinList';
import Filter from '@/components/Filter';
import ReservationReminder from '@/components/ReservationReminder';
import Spinner from '@/components/Spinner';
import { CapacityFilter } from '@/types/cabin';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Cabins',
};

interface Props {
  searchParams: Promise<{
    capacity?: CapacityFilter | undefined;
    [key: string]: string | string[] | undefined;
  }>;
}

export default async function Page({ searchParams }: Props) {
  const filter = (await searchParams)?.capacity ?? 'all';

  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-pretty text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="mb-8 flex justify-end">
        <Filter />
      </div>

      <Suspense
        fallback={<Spinner />}
        key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
