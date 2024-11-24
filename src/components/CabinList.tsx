import CabinCard from '@/components/CabinCard';
import { getCabins } from '@/lib/data-service';
import { CapacityFilter, ICabin } from '@/types/cabin';

interface CabinListProps {
  filter: CapacityFilter;
}

export default async function CabinList({ filter }: CabinListProps) {
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins: ICabin[];
  if (filter === 'small') {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  } else if (filter === 'medium') {
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  } else if (filter === 'large') {
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  } else {
    displayedCabins = cabins;
  }

  return (
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard
          cabin={cabin}
          key={cabin._id}
        />
      ))}
    </div>
  );
}
