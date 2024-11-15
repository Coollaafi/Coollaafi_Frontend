import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function loginSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies();

  const queryParams = new URLSearchParams(location.search);
  const refreshToken = queryParams.get('refreshToken');
  const isNewMember = queryParams.get('isNewMember');

  useEffect(() => {
    if (isNewMember == 'true') {
      navigate('/join');
    } else {
      //쿠키로 설정
      setCookies('refreshToken', refreshToken, {
        sameSite: 'strict',
        path: '/home',
      });
      setCookies('refreshToken', refreshToken, {
        sameSite: 'strict',
        path: '/',
      });
      navigate('/home');
    }
  }, []);

  return <div></div>;
}
