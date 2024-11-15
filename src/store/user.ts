import { create } from 'zustand';

interface UserStoreProps {
  accessToken: string;
  refreshToken: string;
  setAccessToken: (accessToken: string) => void;
  setRefreshToken: (refreshToken: string) => void;
}

export const useUserStore = create<UserStoreProps>((set) => ({
  accessToken: '',
  refreshToken: '',
  setAccessToken: (newAccessToken) => set({ accessToken: newAccessToken }),
  setRefreshToken: (newRefreshToken) => set({ refreshToken: newRefreshToken }),
}));
