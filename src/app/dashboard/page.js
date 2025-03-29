import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route'; // Correct path to auth options
import { prisma } from '../../../lib/prisma'; // Adjust path to your Prisma client
import Dashboard from './Dashboard';
import SignIn from '../../components/Auth/SignIn';  // Make sure the path is correct
import ErrorPage from '../not-found';
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  console.log('Session:', session);  // Log the session to verify it contains isAdmin
  if (session && session.user) {
    console.log('Admin Check:', session.user.isAdmin);  // Check if isAdmin exists in the session
  }

  // // If no session exists, return the SignIn component
  // if (!session) {
  //   return <SignIn />;
  // }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-800">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full dark:bg-gray-900 dark:text-white">
          <SignIn />
        </div>
      </div>
    );
  }
  // If user is not an admin, return Unauthorized message
  if (session.user?.isAdmin !== true) {
    return (
      <>
        <ErrorPage/>
      </>
    );
  }
  

  // Fetch the list of users from the database (only if the user is an admin)
  const users = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      is_premium: true,
      google_id: true,  
      github_id: true
    },
  });

  // Pass the session and users as props to the client-side component
  return <Dashboard session={session} users={users} />;
}
