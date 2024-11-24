import { auth } from '@/lib/auth';
import Image from 'next/image';
import Link from 'next/link';

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex items-center gap-16">
        <li>
          <Link
            href="/cabins"
            className="transition-colors hover:text-accent-400">
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="transition-colors hover:text-accent-400">
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="flex items-center gap-4 transition-colors hover:text-accent-400">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name ?? ''}
                height={32}
                width={32}
                referrerPolicy="no-referrer"
                className="h-8 rounded-full"
              />
            )}
            <span>Guest area</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
