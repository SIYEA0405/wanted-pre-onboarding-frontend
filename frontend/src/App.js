import './App.css';
import { BrowserRouter, Link, Routes, Route, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
