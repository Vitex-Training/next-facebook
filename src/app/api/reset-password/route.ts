import { sendPasswordResetEmail } from 'firebase/auth';
import { NextResponse } from 'next/server';
import { auth } from 'src/shared/services/firebase/config';
import { findUserInStoreByEmail } from 'src/shared/services/firebase/findUserByEmail';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const { email } = await req.json();

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const user = await findUserInStoreByEmail(email);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }
    // send email to reset user's password
    try {
      await sendPasswordResetEmail(auth, email);
      return NextResponse.json({ msg: 'success' });
    } catch (error) {
      console.error(`Sending email to ${email} failed: `, error);
      return NextResponse.json({ error: 'send reset password email failed' }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json({ error: 'unknown error' }, { status: 500 });
  }
}
