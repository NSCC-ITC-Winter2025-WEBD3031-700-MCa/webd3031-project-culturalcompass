import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route'; // Now this import will work correctly
import { prisma } from '../../../lib/prisma'; // Adjust path to your Prisma client
import Dashboard from './Dashboard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  console.log('Session:', session);  // Log the session to verify it contains isAdmin
  if (session && session.user) {
    console.log('Admin Check:', session.user.isAdmin);  // Check if isAdmin exists in the session
  }

  // If no session exists or the user is not an admin, display an unauthorized message
  if (!session || session.user?.isAdmin !== true) {
    return <p>Unauthorized</p>;
  }

  // Fetch the list of users from the database (only if the user is an admin)
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
