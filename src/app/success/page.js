'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/refresh-session')
      .then(res => res.json())
      .then((data) => {
        if (data.is_premium) {
          router.refresh(); // This works with App Router
          router.push('/');
        }
      });
  }, [router]);

  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
      <p className="text-lg text-gray-600 mt-4">Thank you for your purchase.</p>
    </div>
  );
}