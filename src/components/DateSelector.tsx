'use client';
import { useReservation } from '@/contexts/ReservationContext';
import { ICabin } from '@/types/cabin';
import { ISetting } from '@/types/setting';
import {
  differenceInCalendarDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function isAlreadyBooked(range: DateRange, datesArr: Date[]) {
  const { from, to } = range;

  return (
    from &&
    to &&
    datesArr.some((date) => isWithinInterval(date, { start: from, end: to }))
  );
}

interface DateSelectorProps {
  cabin: ICabin;
  settings: ISetting;
  reservedDates: string[];
}

export default function DateSelector({
  cabin,
  reservedDates,
  settings,
}: DateSelectorProps) {
  const reservedDatesFormat = reservedDates.map((date) => new Date(date));
  const { range, setRange, resetRange } = useReservation();

  const displayRange: DateRange = isAlreadyBooked(range, reservedDatesFormat)
    ? { from: undefined, to: undefined }
    : range;

  const { minBookingLength, maxBookingLength } = settings;
  const { regularPrice, discount } = cabin;

  let numNights = 0;
  if (displayRange.to && displayRange.from) {
    numNights = differenceInCalendarDays(displayRange.to, displayRange.from);
  }
  const cabinPrice = numNights * (regularPrice - discount);

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="place-self-center pt-12"
        mode="range"
        onSelect={(range) => {
          if (!range) return;
          if (range.from) range.from.setHours(12, 0, 0, 0);
          if (range.to) range.to.setHours(11, 0, 0, 0);
          setRange(range);
        }}
        selected={displayRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          reservedDatesFormat.some((date) => isSameDay(curDate, date))
        }
      />

      <div className="flex h-[72px] items-center justify-between bg-accent-500 px-8 text-primary-800">
        <div className="flex items-baseline gap-6">
          <p className="flex items-baseline gap-2">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="font-semibold text-primary-700 line-through">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{' '}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {range.from || range.to ? (
          <button
            className="border border-primary-800 px-4 py-2 text-sm font-semibold"
            onClick={resetRange}>
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
