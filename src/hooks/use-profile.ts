// src/hooks/use-profile.ts
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '@/lib/auth-client';

interface ProfileData {
  id: string;
  username: string;
  email: string;
  name: string;
}

const useProfile = () => {
  const { data, isLoading, isError, error, refetch } = useQuery<ProfileData | null, Error>({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data, error } = await getProfile();
      if (error) {
        throw new Error(error.message);
      }
      if (!data) {
        throw new Error('Profile data is null');
      }
      return data;
    },
  });

  return { profileData: data, isLoading, isError, error, refetch }; // Tambahkan refetch untuk zustand
}; 

export default useProfile;
