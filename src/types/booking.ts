import type { ICabin } from '@/types/cabin';
import type { IGuest } from '@/types/guest';

export interface IBooking {
  _id: string;
  createdAt: string;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: 'unconfirmed' | 'checked-in' | 'checked-out';
  hasBreakfast: boolean;
  isPaid: boolean;
  observations: string;
  cabin: ICabin;
  guest: IGuest;
}

export interface ICreateBookingData {
  startDate: Date;
  endDate: Date;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice?: number;
  totalPrice: number;
  status: 'unconfirmed';
  hasBreakfast?: boolean;
  isPaid?: boolean;
  observations: string;
  cabin: string;
  guest: string;
}
