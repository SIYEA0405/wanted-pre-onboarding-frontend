import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import TodoPage from "./pages/TodoPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="signin" element={<SigninPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
