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

const SignupPage = () => {
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
    fetch('https://www.pre-onboarding-selection-task.shop/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    }).then((res) =>
      res.status === 201 ? navigate('/signin') : alert(`Error! ${res.status}`),
    );
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
            data-testid="signup-button"
            bg={'#A9B8AF'}
            _hover={{
              bg: '#F1B6B6',
            }}
            type="submit"
            disabled={!isDisabled}
          >
            회원가입
          </Button>
          <Text
            as={'ins'}
            color={'#93949B'}
            _hover={{
              color: '#1A202C',
            }}
          >
            <Link to="/signin">로그인 페이지로 돌아가기</Link>
          </Text>
        </Stack>
      </Stack>
    </Layout>
  );
};
export default SignupPage;
