import Cabin from '@/components/Cabin';
import Reservation from '@/components/Reservation';
import Spinner from '@/components/Spinner';
import { getCabin } from '@/lib/data-service';
import { Metadata } from 'next';
import { Suspense } from 'react';

interface Props {
  params: Promise<{ slug: string }>;
}

// Next.js will wait for data fetching inside generateMetadata to complete before streaming UI to the client. This guarantees the first part of a streamed response includes <head> tags.

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  return {
    title: `Cabin ${slug}`,
  };

  // On the initial load, streaming is blocked until generateMetadata has fully resolved, including any content from loading.tsx.
  /* const cabin = await getCabin(slug);
  return {
    title: `Cabin ${cabin.name}`,
  }; */
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const cabin = await getCabin(slug);

  return (
    <div className="mx-auto mt-8 max-w-6xl">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="mb-10 text-center text-5xl font-semibold text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
