import { config } from '@/lib/config';
import type { IBooking, ICreateBookingData } from '@/types/booking';
import type { ICabin } from '@/types/cabin';
import type { IGuest } from '@/types/guest';
import type { ISetting } from '@/types/setting';
import { notFound } from 'next/navigation';

const URL = config.apiServer.url;
const KEY = config.apiServer.key;

interface ErrorResponse {
  status: 'fail' | 'error';
  message: string;
}

const handleResponseNotOk = async (res: Response) => {
  const errorData = (await res.json()) as ErrorResponse;
  console.error(errorData.message);
  throw new Error(errorData.message);
};

export async function getCabin(slug: string) {
  const res = await fetch(`${URL}/cabins?slug=${slug}`, {
    method: 'GET',
    headers: {
      'x-api-key': KEY,
    },
  });

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { cabins: ICabin[] };
  };

  return data.data.cabins.at(0) ?? notFound();
}

export async function getCabinById(cabinId: string) {
  const res = await fetch(`${URL}/cabins/${cabinId}`, {
    method: 'GET',
    headers: {
      'x-api-key': KEY,
    },
  });

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { cabin: ICabin };
  };

  return data.data.cabin ?? notFound();
}

export async function getCabins() {
  const res = await fetch(`${URL}/cabins?sort=name`, {
    method: 'GET',
    headers: {
      'x-api-key': KEY,
    },
  });

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { cabins: ICabin[] };
  };

  return data.data.cabins;
}

// Guests are uniquely identified by their email address
export async function getGuest(email: string) {
  const res = await fetch(`${URL}/guests?email=${email}`, {
    method: 'GET',
    headers: {
      'x-api-key': KEY,
    },
  });

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { guests: IGuest[] };
  };

  return data.data.guests.at(0) ?? null;
}

export async function getBooking(id: string) {
  const res = await fetch(`${URL}/bookings/${id}`, {
    method: 'GET',
    headers: {
      'x-api-key': KEY,
    },
  });

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { booking: IBooking };
  };

  return data.data.booking;
}

export async function getBookings(guestId: string) {
  const res = await fetch(`${URL}/bookings?guest=${guestId}`, {
    method: 'GET',
    headers: {
      'x-api-key': KEY,
    },
  });

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { bookings: IBooking[] };
  };

  return data.data.bookings;
}

export async function getBookedDatesByCabinId(cabinId: string) {
  const res = await fetch(
    `${URL}/bookings/get-booked-dates-by-cabin-id?cabinId=${cabinId}`,
    {
      method: 'GET',
      headers: {
        'x-api-key': KEY,
      },
    }
  );

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { bookedDates: string[] };
  };

  return data.data.bookedDates;
}

export async function getSettings() {
  const res = await fetch(`${URL}/settings`, {
    method: 'GET',
    headers: {
      'x-api-key': KEY,
    },
  });

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { setting: ISetting };
  };

  return data.data.setting;
}

export async function getCountries() {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = (await res.json()) as {
      name: string;
      flag: string;
    }[];
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
// CREATE

export async function createGuest(
  newGuest: Pick<IGuest, 'fullName' | 'email'>
) {
  const res = await fetch(`${URL}/guests`, {
    method: 'POST',
    body: JSON.stringify(newGuest),
    headers: {
      'x-api-key': KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { guest: IGuest };
  };

  return data.data.guest;
}

export async function createBooking(newBooking: ICreateBookingData) {
  const res = await fetch(`${URL}/bookings`, {
    method: 'POST',
    body: JSON.stringify(newBooking),
    headers: {
      'x-api-key': KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { booking: IBooking };
  };

  return data.data.booking;
}

/////////////
// UPDATE

export async function updateGuest(
  id: string,
  updatedFields: Partial<Omit<IGuest, '_id' | 'createdAt' | 'updatedAt'>>
) {
  const res = await fetch(`${URL}/guests/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedFields),
    headers: {
      'x-api-key': KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { guest: IGuest };
  };

  return data.data.guest;
}

export async function updateBooking(
  id: string,
  updatedFields: Partial<Omit<IBooking, '_id' | 'createdAt' | 'updatedAt'>>
) {
  const res = await fetch(`${URL}/bookings/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedFields),
    headers: {
      'x-api-key': KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) await handleResponseNotOk(res);

  const data = (await res.json()) as {
    status: 'success';
    data: { booking: IBooking };
  };

  return data.data.booking;
}

/////////////
// DELETE

export async function deleteBooking(id: string) {
  const res = await fetch(`${URL}/bookings/${id}`, {
    method: 'DELETE',
    headers: {
      'x-api-key': KEY,
    },
  });

  if (!res.ok) await handleResponseNotOk(res);
}
