
'use client';  

import { useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Refresh the session after successful payment
    signIn('credentials', { redirect: false }).then(() => {
      // Optionally redirect to another page if needed
      console.log('Session updated');
      router.push('/');
    });
  }, [router]);

  return (
    <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mt-4">Thank you for your purchase.</p>
      </div>
  );
}
