import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

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
    <Layout>
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            onChange={handleEmail}
            data-testid="email-input"
            type="email"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            onChange={handlePassword}
            data-testid="password-input"
            type="password"
          />
        </FormControl>
        <Stack spacing={10}>
          <Button
            onClick={handleSubmit}
            data-testid="signin-button"
            bg={'#A9B8AF'}
            _hover={{
              bg: '#F1B6B6',
            }}
            type="submit"
            disabled={!isDisabled}
          >
            로그인
          </Button>
          <Text
            as={'ins'}
            color={'#93949B'}
            _hover={{
              color: '#1A202C',
            }}
          >
            <Link to="/signup">회원가입 페이지로 돌아가기</Link>
          </Text>
        </Stack>
      </Stack>
    </Layout>
  );
};
export default SigninPage;
