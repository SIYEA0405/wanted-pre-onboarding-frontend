import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function Home() {
  const [token, setToken] = useState(
    localStorage.getItem('access_token') || '',
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/todo');
    }
  }, []);

  return (
    <Layout>
      <Stack spacing={6} direction={'row'}>
        <Button
          rounded={'full'}
          px={6}
          bg={'#A9B8AF'}
          _hover={{ bg: '#F1B6B6' }}
        >
          <Link to="/signin">로그인</Link>
        </Button>
        <Button
          rounded={'full'}
          px={6}
          bg={'#C7D3C7'}
          _hover={{ bg: '#FFDEDB' }}
        >
          <Link to="/signup">회원가입</Link>
        </Button>
      </Stack>
    </Layout>
  );
}

export default Home;
