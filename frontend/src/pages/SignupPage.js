import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

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
    fetch('https://www.pre-onboarding-selection-task.shop/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) =>
      res.status === 201 ? navigate('/signin') : alert(`Error! ${res.status}`),
    );
  };

  return (
    <>
      <h2>회원가입 페이지</h2>
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
          data-testid="signup-button"
          type="submit"
          disabled={!isDisabled}
        >
          회원가입
        </button>
      </form>
    </>
  );
};
export default SignupPage;
