import { auth } from '@/lib/auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guest area',
};

export default async function Page() {
  const session = await auth();

  // This is only for typescript, without session user can't reach this page
  if (!session?.user) return null;

  const firstName = session.user.name
    ? session.user.name.split(' ').at(0)
    : 'strange';

  return (
    <h2 className="mb-7 text-2xl font-semibold text-accent-400">
      Welcome, {firstName}
    </h2>
  );
}
