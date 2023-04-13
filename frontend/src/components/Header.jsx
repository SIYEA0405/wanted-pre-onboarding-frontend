import { Heading } from '@chakra-ui/react';

const Header = () => {
  return (
    <Heading
      fontWeight={600}
      fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
      lineHeight={'110%'}
    >
      My Todo List
    </Heading>
  );
};

export default Header;
