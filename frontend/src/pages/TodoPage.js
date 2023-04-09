import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/signin');
    }
  }, []);
  return (
    <>
      <h2>Todo 페이지</h2>
    </>
  );
};

export default TodoPage;
