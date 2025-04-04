'use client'; // Ensure this is a Client Component

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PaymentSuccess = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('Session Data:', session); // Log session data for debugging

      // After payment, check if user is premium. If not, refresh the session
      if (!session.user.is_premium) {
        fetch('/api/auth/session')  // Re-fetch the session to get the latest state
          .then((res) => res.json())
          .then((updatedSession) => {
            if (updatedSession.user.is_premium) {
              // If the user is now premium, redirect to the homepage
              router.push('/');
            } else {
              console.log('User is not premium yet.');
            }
          })
          .catch((err) => {
            console.error('Error refreshing session:', err);
          });
      } else {
        // If the user is premium, redirect to homepage
        router.push('/');
      }
    }
  }, [status, session, router]);

  return (
    <div className="text-center py-20">
        <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
        <p className="text-lg text-gray-600 mt-4">Thank you for your purchase.</p>
      </div>
  );
};

export default PaymentSuccess;