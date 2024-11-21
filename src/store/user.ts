import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { cookieStorage } from 'zustand-cookie-storage';

interface UserStoreProps {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useUserStore = create(
  persist<UserStoreProps>(
    (set) => ({
      accessToken: '',
      refreshToken: '',
      setAccessToken: (newAccessToken) => set({ accessToken: newAccessToken }),
      setRefreshToken: (newRefreshToken) =>
        set({ refreshToken: newRefreshToken }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);
