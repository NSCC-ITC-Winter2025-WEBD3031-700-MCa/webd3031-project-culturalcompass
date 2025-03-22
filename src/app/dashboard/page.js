import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
 
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
 
  if (!session) {
    redirect('/signin'); // Redirect to login if not authenticated
  }
 
  if (!session.user.isAdmin) {
    redirect('/unauthorized'); // Redirect non-admin users
  }
 
  return <div className="p-4">Welcome to the Admin Dashboard, {session.user?.name} 🎉</div>;
}