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
      setAccessToken(data.result);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    refreshTokenMutation.mutate(refreshToken);
  }, [refreshToken]);

  return <>{children}</>;
}
