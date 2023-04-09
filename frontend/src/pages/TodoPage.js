import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const [token, setToken] = useState(
    localStorage.getItem('access_token') || '',
  );
  const [todos, setTodos] = useState([]);
  const [addTodo, setAddTodo] = useState('');

  const navigate = useNavigate();

  const getTodos = () => {
    fetch('https://www.pre-onboarding-selection-task.shop/todos', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...data]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setToken(localStorage.getItem('access_token'));
    if (!token) {
      navigate('/signin');
    }
    getTodos();
  }, [token]);

  useEffect(() => {
    getTodos();
  }, [todos]);

  const handleInputTodo = (e) => {
    setAddTodo(e.target.value);
  };

  const handleCreateTodo = async (e) => {
    await e.preventDefault();
    fetch('https://www.pre-onboarding-selection-task.shop/todos', {
      method: 'POST',
      body: JSON.stringify({ todo: addTodo }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTodos([...todos, data]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateTodo = (id, todo, isCompleted) => {
    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ todo: todo, isCompleted: !isCompleted }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`변경후: ${id} ${data.todo} /${data.isCompleted}`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleModify = () => {
    console.log('수정버튼클릭');
  };
  const handleDelete = () => {
    console.log('삭제버튼클릭');
  };

  return (
    <>
      <h2>Todo 페이지</h2>

      <input
        onChange={handleInputTodo}
        className="todo-input"
        data-testid="new-todo-input"
        placeholder="Todo입력"
        type="text"
      />

      <button
        onClick={handleCreateTodo}
        className="btn"
        data-testid="new-todo-add-button"
        type="submit"
      >
        추가
      </button>
      {todos.map((td) => {
        const { id, todo, isCompleted } = td;
        return (
          <li key={id}>
            <label>
              <input
                type="checkbox"
                onClick={() => handleUpdateTodo(id, todo, isCompleted)}
                defaultChecked={isCompleted}
              />
              <span>{todo}</span>
            </label>
            <button
              onClick={handleModify}
              className="btn"
              data-testid="modify-button"
              type="submit"
            >
              수정
            </button>
            <button
              onClick={handleDelete}
              className="btn"
              data-testid="delete-button"
              type="submit"
            >
              삭제
            </button>
          </li>
        );
      })}
    </>
  );
};

export default TodoPage;
