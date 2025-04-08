import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  const token = await getToken({ req });

  if (!token || !token.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: token.email },
  });

  return NextResponse.json({
    is_premium: user?.is_premium,
  });
}