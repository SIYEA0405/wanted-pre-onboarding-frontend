import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';

function App() {
  return (
    <ChakraProvider>
      <Box w="100%" h="100%" bg="#DFE2DA" className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="signin" element={<SigninPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Box>
    </ChakraProvider>
  );
}

export default App;
