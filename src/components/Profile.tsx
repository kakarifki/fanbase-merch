// src/components/Profile.tsx
import useProfile from '@/hooks/use-profile'; // Import useProfile

const Profile = () => {
  const { profileData, isLoading, isError, error } = useProfile(); // Gunakan useProfile hook

  if (isLoading) {
    return <p>Loading profile...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message}</p>;
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
      {/* tambahin */}
    </div>
  );
};

export default Profile;
