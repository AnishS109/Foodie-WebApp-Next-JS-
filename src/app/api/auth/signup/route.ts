import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export const POST = async (req: NextRequest) => {
  const { email, password }: { email: string; password: string } =
    await req.json();

  try {
    const emailExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailExist) {
      return NextResponse.json(
        { msg: 'Email already exists!' },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(
      { msg: 'Account created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: 'Server Error! Try again later.' },
      { status: 500 }
    );
  }
};