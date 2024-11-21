import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { cookieStorage } from 'zustand-cookie-storage';

interface UserStoreProps {
  accessToken: string;
  refreshToken: string;
  memberId: string;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
  setMemberId: (memberId: string) => void;
}

export const useUserStore = create(
  persist<UserStoreProps>(
    (set) => ({
      accessToken: '',
      refreshToken: '',
      memberId: '',
      setAccessToken: (newAccessToken) => set({ accessToken: newAccessToken }),
      setRefreshToken: (newRefreshToken) =>
        set({ refreshToken: newRefreshToken }),
      setMemberId: (newMemberId) => set({ memberId: newMemberId }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);
