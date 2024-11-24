import DateSelector from '@/components/DateSelector';
import ReservationForm from '@/components/ReservationForm';
import { auth } from '@/lib/auth';
import { getBookedDatesByCabinId, getSettings } from '@/lib/data-service';
import { ICabin } from '@/types/cabin';
import LoginMessage from './LoginMessage';

interface ReservationProps {
  cabin: ICabin;
}

export default async function Reservation({ cabin }: ReservationProps) {
  const [settings, reservedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin._id),
  ]);

  const session = await auth();

  return (
    <div className="grid min-h-[400px] grid-cols-2 border border-primary-800">
      <DateSelector
        cabin={cabin}
        settings={settings}
        reservedDates={reservedDates}
      />
      {session?.user ? (
        <ReservationForm
          cabin={cabin}
          user={session.user}
        />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}
