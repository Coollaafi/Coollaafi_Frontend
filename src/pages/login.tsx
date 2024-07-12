export default function LoginPage() {
  const Rest_api_key = process.env.Rest_api_key;
  const redirect_url = 'http://localhost:3000';
  const kakaoUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_url}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoUrl;
  };

  return <button onClick={handleLogin}>카카오로 시작하기</button>;
}
