import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useUserStore } from 'store/user';

export default function loginSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();

  const queryParams = new URLSearchParams(location.search);
  const refreshToken = queryParams.get('refreshToken');
  const accessToken = queryParams.get('accessToken');
  const isNewMember = queryParams.get('isNewMember');

  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setRefreshToken = useUserStore((state) => state.setRefreshToken);

  useEffect(() => {
    if (refreshToken !== null && accessToken !== null && isNewMember !== null) {
      if (isNewMember == 'true') {
        navigate('/join');
      } else {
        //쿠키로 설정
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setCookies('refreshToken', refreshToken, {
          sameSite: 'strict',
          path: '/',
        });
        navigate('/home');
      }
    }
  }, []);

  return <div></div>;
}
