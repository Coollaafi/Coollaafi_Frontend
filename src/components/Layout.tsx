import { refreshTokenApi } from 'apis/auth';
import { ReactNode, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useUserStore } from 'store/user';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const refreshToken = useUserStore((state) => state.refreshToken);
  const setAccessToken = useUserStore((state) => state.setAccessToken);

  const refreshTokenMutation = useMutation(refreshTokenApi, {
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    console.log(refreshToken);
    refreshTokenMutation.mutate(refreshToken);
  }, []);

  return <>{children}</>;
}
