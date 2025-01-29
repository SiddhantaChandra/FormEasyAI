import { prisma } from '@/lib/prismadb';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const session = getKindeServerSession();
    if (!session) {
      console.error('Session is null or undefined.');
    }

    const user = await session.getUser();
    if (!user) {
      console.error('User not found in session.');
      return NextResponse.json(
        { error: 'Unauthorized to use this resource.' },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(req.url);
    const formId = searchParams.get('formId');

    console.log('Form ID:', formId);

    if (!formId) {
      return NextResponse.json(
        { error: 'Unable to find form Id :<' },
        { status: 401 },
      );
    }
    console.log(
      'Attempting Prisma Query for formId:',
      formId,
      'and userId:',
      user.id,
    );
    const form = await prisma.form.findFirst({
      where: {
        userId: user.id,
        formId: formId,
      },
      include: {
        settings: true,
      },
    });

    console.log('Prisma Query Result:', form);

    if (!form) {
      return NextResponse.json(
        { error: 'Unable to find the form :<' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      data: {
        success: true,
        message: 'Form fetched successfully',
        form,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || 'Internal Server Error :<',
      },
      { status: 500 },
    );
  }
}
