import useProfile from '@/hooks/use-profile';
import { Link } from 'react-router-dom'; // Perbaiki import
import { Button } from './ui/button';

const Profile = () => {
  const { profileData, isLoading, isError, error } = useProfile();

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading profile...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Error: {error?.message}</p>;
  }

  if (!profileData) {
    return <p className="text-center text-gray-500">No profile data available.</p>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 text-center">
        {/* Avatar Placeholder */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-semibold">
            {profileData.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Profile Info */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{profileData.name}</h2>
        <p className="text-gray-600">@{profileData.username}</p>
        <p className="text-gray-600">{profileData.email}</p>

        {/* Button to Orders */}
        <div className="mt-6">
          <Link to="/orders">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
              Your Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
