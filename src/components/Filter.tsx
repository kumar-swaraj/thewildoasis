'use client';
import { CapacityFilter } from '@/types/cabin';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get('capacity') ?? 'all';

  function handleFilter(filter: CapacityFilter) {
    const params = new URLSearchParams(searchParams);

    params.set('capacity', filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex border border-primary-800">
      {(['all', 'small', 'medium', 'large'] satisfies CapacityFilter[]).map(
        (filter) => (
          <Button
            filter={filter}
            activeFilter={activeFilter}
            handleFilter={handleFilter}
            key={filter}
          />
        )
      )}
    </div>
  );
}

interface ButtonProps {
  filter: CapacityFilter;
  activeFilter: string;
  handleFilter: (filter: CapacityFilter) => void;
}

function Button({ filter, activeFilter, handleFilter }: ButtonProps) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${activeFilter === filter ? 'bg-primary-700 text-primary-50' : ''}`}
      onClick={() => handleFilter(filter)}>
      {filter === 'all' && <span>All cabins</span>}
      {filter === 'small' && <span>1&mdash;3 guests</span>}
      {filter === 'medium' && <span>4&mdash;7 guests</span>}
      {filter === 'large' && <span>8&mdash;12 guests</span>}
    </button>
  );
}
