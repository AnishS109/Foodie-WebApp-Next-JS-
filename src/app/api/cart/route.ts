import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const { Itemname, cartOwner } = await req.json();

  try {
    const isExist = await prisma.cart.findFirst({
      where: {
        Itemname,
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
