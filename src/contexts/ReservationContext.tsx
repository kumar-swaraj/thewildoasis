'use client';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface ReservationContextType {
  range: DateRange;
  setRange: (range: DateRange) => void;
  resetRange: () => void;
}

const ReservationContext = createContext<ReservationContextType | null>(null);

const initialState: DateRange = { from: undefined, to: undefined };

export function ReservationProvider({ children }: PropsWithChildren) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider
      value={{
        range,
        setRange,
        resetRange,
      }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error('useReservation has to be used within ReservationProvider');
  }

  return context;
}
