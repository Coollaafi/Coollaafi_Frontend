import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/user';

export default function loginSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const refreshToken = queryParams.get('refreshToken');
  const accessToken = queryParams.get('accessToken');
  const isNewMember = queryParams.get('isNewMember');

  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setRefreshToken = useUserStore((state) => state.setRefreshToken);

  useEffect(() => {
    if (refreshToken !== null && accessToken !== null && isNewMember !== null) {
      if (isNewMember == 'true') {
        navigate(
          `/join?accessToken=${accessToken}&refreshToken=${refreshToken}`,
        );
      } else {
        navigate('/home');
        //전역 상태 관리
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
      }
    }
  }, []);

  return <div></div>;
}
