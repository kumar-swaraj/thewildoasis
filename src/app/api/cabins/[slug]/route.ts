import { getBookedDatesByCabinId, getCabin } from '@/lib/data-service';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const cabin = await getCabin(slug);
    const reservedDates = await getBookedDatesByCabinId(cabin._id);

    return NextResponse.json({
      ...cabin,
      reservedDates,
      createdAt: undefined,
      updatedAt: undefined,
    });
  } catch {
    return NextResponse.json({
      message: "The cabin data you're looking for doesn't exists",
    });
  }
}
