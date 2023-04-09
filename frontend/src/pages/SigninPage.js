import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/todo');
    }
  }, []);

  useEffect(() => {
    email.includes('@') && password.length >= 8
      ? setIsDisabled(true)
      : setIsDisabled(false);
  }, [email, password]);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    await e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    fetch('https://www.pre-onboarding-selection-task.shop/auth/signin', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        const { access_token, statusCode, message } = res;
        if (access_token) {
          localStorage.setItem('access_token', access_token);
          navigate('/todo');
        } else {
          alert(`${statusCode}: ${message}`);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h2>로그인 페이지</h2>
      <form>
        <label className="label">
          Email
          <input
            onChange={handleEmail}
            data-testid="email-input"
            className="email-input"
            value={email}
            type="email"
          />
        </label>

        <label className="label">
          Password
          <input
            onChange={handlePassword}
            data-testid="password-input"
            className="password-input"
            value={password}
            type="password"
          />
        </label>

        <button
          onClick={handleSubmit}
          className="btn"
          data-testid="signin-button"
          type="submit"
          disabled={!isDisabled}
        >
          로그인
        </button>
      </form>
    </>
  );
};
export default SigninPage;
