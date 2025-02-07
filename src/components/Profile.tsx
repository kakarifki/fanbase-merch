// components/Profile.tsx
import { authClient } from '@/lib/auth-client'; // Import authClient

// Ambil tipe data Session dari authClient
type Session = typeof authClient.$Infer.Session; 

interface ProfileProps {
  session: Session | null;
}

const Profile = ({ session }: ProfileProps) => {
  if (!session || !session.user) {
    return <p>No user information available</p>;
  }

  return (
    <div>
      <h2>Welcome, {session.user.name}!</h2>
      <p>Username: {session.user.username}</p>
      <p>Email: {session.user.email}</p>
    </div>
  );
};

export default Profile;
