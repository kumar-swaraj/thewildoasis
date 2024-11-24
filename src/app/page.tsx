import bg from '@/assets/images/bg.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="mt-24">
      <Image
        src={bg}
        alt="Mountains and forest with two canins"
        className="object-cover object-top"
        placeholder="blur"
        quality={100}
        fill
      />
      <div className="relative z-10 text-center">
        <h1 className="mb-10 text-8xl font-normal tracking-tight text-primary-50">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-lg font-semibold text-primary-800 transition-none hover:bg-accent-600">
          Explore luxury cabins
        </Link>
      </div>
    </div>
  );
}
