'use server';
import { auth, signIn, signOut } from '@/lib/auth';
import {
  createBooking,
  deleteBooking,
  getBooking,
  getCabinById,
  updateBooking,
  updateGuest,
} from '@/lib/data-service';
import { ICreateBookingData } from '@/types/booking';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

export async function updateGuestProfile(data: FormData) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in');

  const countryFormValue = data.get('nationality');
  const nationalIDFormValue = data.get('nationalID');

  if (!countryFormValue || !nationalIDFormValue)
    throw new Error('Country and National ID are mandatory');

  const [nationality, countryFlag] = countryFormValue.toString().split('%');
  const nationalID = nationalIDFormValue.toString();

  if (!nationality || !countryFlag)
    throw new Error('Please provide a valid country');

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error('Please provide a valid national ID');

  if (session.user?.id) {
    await updateGuest(session.user.id, {
      countryFlag,
      nationality,
      nationalID,
    });

    revalidatePath('/account/profile');
  }
}

export async function deleteReservation(reservationId: string) {
  // Authentication
  const session = await auth();
  if (!session?.user?.id) throw new Error('You must be logged in');

  // Authorization
  const userBooking = await getBooking(reservationId);
  if (userBooking.guest._id !== session.user.id)
    throw new Error("You're not allowed to delete this booking");

  if (new Date(userBooking.startDate).valueOf() < new Date().valueOf())
    throw new Error("You can't delete past booking");

  await deleteBooking(reservationId);

  revalidatePath('/account/reservations');
}

export async function updateReservation(reservationId: string, data: FormData) {
  // Authentication
  const session = await auth();
  if (!session?.user?.id) throw new Error('You must be logged in');

  // Authorization
  const reservation = await getBooking(reservationId);
  if (reservation.guest._id !== session.user.id)
    throw new Error("You're not allowed to edit this booking");

  const numGuestsFormValue = data.get('numGuests');
  if (!numGuestsFormValue) throw new Error('numGuest is mandatory field');
  const numGuests = Number(numGuestsFormValue.toString());
  if (
    isNaN(numGuests) ||
    numGuests > reservation.cabin.maxCapacity ||
    numGuests <= 0
  )
    throw new Error(
      'numGuests should be positive number, and less than maxCapacity of the cabin'
    );

  const observations = data.get('observations')?.toString() ?? '';
  if (observations.length > 201)
    throw new Error('observations should be less than 200 characters');

  await updateBooking(reservationId, { numGuests, observations });

  revalidatePath(`/account/reservations/edit/${reservationId}`);
  revalidatePath('/account/reservations');
  redirect('/account/reservations');
}

interface ReservationData {
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  cabin: string;
}

export async function createReservation(
  reservationData: ReservationData,
  data: FormData
) {
  const session = await auth();
  if (!session?.user?.id) throw new Error('You must be logged in');

  const cabin = await getCabinById(reservationData.cabin);

  const numGuestsFormValue = data.get('numGuests');
  if (!numGuestsFormValue) throw new Error('numGuest is mandatory field');
  const numGuests = Number(numGuestsFormValue.toString());
  if (isNaN(numGuests) || numGuests <= 0 || numGuests > cabin.maxCapacity)
    throw new Error(
      'numGuests should be positive number and less than equal to maxCapacity of cabin'
    );

  const observations = data.get('observations')?.toString() ?? '';
  if (observations.length > 201)
    throw new Error('observations should be less than 200 characters');

  if (!reservationData.startDate || !reservationData.endDate)
    throw new Error('startDate and endDate is mandatory');

  const newReservation: ICreateBookingData = {
    numGuests,
    observations,
    isPaid: false,
    extrasPrice: 0,
    hasBreakfast: false,
    status: 'unconfirmed',
    startDate: reservationData.startDate,
    endDate: reservationData.endDate,
    numNights: reservationData.numNights,
    cabinPrice: reservationData.cabinPrice,
    totalPrice: reservationData.cabinPrice,
    cabin: reservationData.cabin,
    guest: session.user.id,
  };

  await createBooking(newReservation);

  revalidatePath(`/cabins/${cabin.slug}`);
  redirect('/cabins/thankyou');
}
