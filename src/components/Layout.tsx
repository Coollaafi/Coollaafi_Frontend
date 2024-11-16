import { refreshToken } from 'apis/auth';
import { ReactNode, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useMutation } from 'react-query';
import { useUserStore } from 'store/user';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [cookies] = useCookies(['refreshToken']);
  const setAccessToken = useUserStore((state) => state.setAccessToken);

  const refreshTokenMutation = useMutation(refreshToken, {
    onSuccess: (data) => {
      setAccessToken(data.accessToken);
    },
    onError: (e) => {
      console.log(e);
    },
  });

  useEffect(() => {
    refreshTokenMutation.mutate(cookies.refreshToken);
  }, []);

  return <>{children}</>;
}
