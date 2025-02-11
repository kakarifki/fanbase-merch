// src/hooks/useProfile.ts
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/lib/auth-client'; // Import getProfile dari authClient

interface ProfileData {
  id: string;
  username: string;
  email: string;
  name: string;
  // tambahin data profile 
}

const useProfile = () => {
  const { data: profileData, isLoading, isError, error } = useQuery<ProfileData, Error>({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await getProfile();
      if (error) {
        throw new Error(error.message); 
      }
      return data!;
    },
  });

  return { profileData, isLoading, isError, error };
};

export default useProfile;
