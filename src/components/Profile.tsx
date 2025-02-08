// components/Profile.tsx
import { useState, useEffect } from 'react';
import { getProfile } from '@/lib/auth-client'; // Import getProfile dari authClient

interface ProfileData {
  id: string;
  username: string;
  email: string;
  name: string;
  // Tambahkan properti lain sesuai dengan data profile yang kamu miliki
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const { data, error } = await getProfile();
        if (data) {
          setProfileData(data);
          setError(null);
        } else if (error) {
          setError(error.message);
          setProfileData(null);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch profile');
        setProfileData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!profileData) {
    return <p>No profile data available.</p>;
  }

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {profileData.name}</p>
      <p>Username: {profileData.username}</p>
      <p>Email: {profileData.email}</p>
      {/* Tampilkan properti lain sesuai kebutuhan */}
    </div>
  );
};

export default Profile;
