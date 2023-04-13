import Header from './Header';
import { Container, Stack } from '@chakra-ui/react';

const Layout = (props) => {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Header />
        {props.children}

      </Stack>
    </Container>
  );
};
export default Layout;
