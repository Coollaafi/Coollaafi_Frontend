import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserStore } from 'store/user';

export default function loginSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const refreshToken = queryParams.get('refreshToken');
  const accessToken = queryParams.get('accessToken');
  const memberId = queryParams.get('memberId');
  const isMembershipRequired = queryParams.get('isMembershipRequired');

  const setAccessToken = useUserStore((state) => state.setAccessToken);
  const setRefreshToken = useUserStore((state) => state.setRefreshToken);
  const setMemberId = useUserStore((state) => state.setMemberId);

  useEffect(() => {
    if (refreshToken && accessToken && memberId) {
      if (isMembershipRequired == 'true') {
        navigate(
          `/join?accessToken=${accessToken}&refreshToken=${refreshToken}&memberId=${memberId}`,
        );
      } else {
        navigate(`/home/${memberId}`);
        //전역 상태 관리
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        setMemberId(memberId);
      }
    }
  }, []);

  return <div></div>;
}
