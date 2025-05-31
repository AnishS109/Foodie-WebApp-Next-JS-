import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/session';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { Itemname, cartOwner } = await req.json();

  try {
    const isExist = await prisma.cart.findFirst({
      where: {
        Itemname,
        cartOwner,
      },
    });

    if (isExist) {
      return NextResponse.json(
        { msg: `${Itemname} already in cart` },
        { status: 400 }
      );
    }

    const newItem = await prisma.cart.create({
      data: {
        Itemname,
        cartOwner,
      },
    });
    return NextResponse.json(
      { msg: `${Itemname} added to cart.` },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: `Server Error! Try again later.` },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  const { Itemname } = await req.json();
  const session = await getCurrentUser();

  if (!session?.email) return null;

  try {
    const removeItem = await prisma.cart.deleteMany({
      where: {
        Itemname,
        cartOwner: session.email,
      },
    });

    return NextResponse.json({ msg: 'done' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: 'Failed to remove item' }, { status: 500 });
  }
};
