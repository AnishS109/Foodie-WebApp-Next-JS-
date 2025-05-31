import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const session = await getCurrentUser();
  const { qty, Itemname } = await req.json();

  if (!session?.email) {
    return null;
  }

  try {
    const updatedItem = await prisma.cart.updateMany({
      where: {
        Itemname,
        cartOwner: session.email,
      },
      data: {
        quantity: qty,
      },
    });

    return NextResponse.json(
      { msg: 'Quantity updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Quantity Update Error:', error);
    return NextResponse.json(
      { msg: 'Failed to update quantity' },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const session = await getCurrentUser();

  if (!session?.email) return null;

  try {
    const deleteAll = await prisma.cart.deleteMany({
      where: {
        cartOwner: session.email,
      },
    });

    return NextResponse.json({ msg: 'Order has been placed' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { msg: 'Server Error! Try again later.' },
      { status: 500 }
    );
  }
};
