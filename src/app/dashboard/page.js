// src/app/dashboard/page.js

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route'; // Adjust the path to match your auth configuration
import { prisma } from '../../../lib/prisma';; // Adjust the path to match your prisma configuration
import Dashboard from './Dashboard';

// Server component, no need to use 'use client' here
export default async function DashboardPage() {
  // Fetch the session data server-side
  const session = await getServerSession(authOptions);

  // Redirect if no session or non-admin user
  if (!session) {
    return { redirect: '/signin' }; // Redirect to sign-in page if no session
  }

  if (session.user.isAdmin === 'FALSE') {
    return { redirect: '/unauthorized' }; // Redirect non-admin users
  }

  // Fetch the list of users from the database
  const users = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      is_premium: true,
    },
  });

  // Pass the session and users as props to the client-side component
  return <Dashboard session={session} users={users} />;
}

