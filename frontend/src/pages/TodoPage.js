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
        setTodos([...data.map(td => ({...td, editMode: false}))]);
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

  const handleInputTodo = (e) => {
    setAddTodo(e.target.value);
  };

  const handleCreateTodo = (e) => {
    e.preventDefault();
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
        setTodos([...todos, {...data, editMode: false}]);
        setAddTodo('');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUpdateTodo = (id, todo, isCompleted, editMode) => {
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
        const updatedTodos = todos.map(td => {
          if (td.id === id) {
            return {
              ...td,
              isCompleted: data.isCompleted,
              todo: data.todo
            }
          }
          return td;
        });
        setTodos(updatedTodos);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleModify = (id) => {
    const updatedTodos = todos.map(td => {
      if (td.id === id) {
        return {
          ...td,
          editMode: !td.editMode
        }
      }
      return td;
    });
    setTodos(updatedTodos);
  };

  const handleCancel = (id) => {
    const updatedTodos = todos.map(td => {
      if (td.id === id) {
        return {
          ...td,
          editMode: false
        }
      }
      return td;
    });
    setTodos(updatedTodos);
  }

  const handleEditInput = (e, id) => {
    const updatedTodos = todos.map(td => {
      if (td.id === id) {
        return {
          ...td,
          todo: e.target.value
        }
      }
      return td;
    });
    setTodos(updatedTodos);
  };

  const handleSubmitEdit = (id, todo, isCompleted) => {
    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ todo: todo, isCompleted: isCompleted }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`변경후: ${id} ${data.todo} /${data.isCompleted}`);
        const updatedTodos = todos.map(td => {
          if (td.id === id) {
            return {
              ...td,
              editMode: false
            }
          }
          return td;
        });
        setTodos(updatedTodos);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDelete = (id) => {
    fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        const updatedTodos = todos.filter(td => td.id !== id);
        setTodos(updatedTodos);
        alert('해당 todo가 삭제되었습니다.')
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h2>Todo 페이지</h2>

      <input
        onChange={handleInputTodo}
        className="todo-input"
        data-testid="new-todo-input"
        placeholder="Todo입력"
        value={addTodo}
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
        const { id, todo, isCompleted, editMode } = td;

        const renderContent = () => {
          if (editMode) {
            return (
              <input
                data-testid="modify-input"
                defaultValue={todo}
                onChange={(e) => handleEditInput(e, id)}
              />
            );
          } else {
            return <span>{todo}</span>;
          }
        }

        return (
          <li key={id}>
            <label>
              <input
                type="checkbox"
                onClick={() => handleUpdateTodo(id, todo, isCompleted, editMode)}
                defaultChecked={isCompleted}
              />
              {renderContent()}
            </label>
            {editMode ? (
              <>
                <button
                  data-testid="submit-button"
                  onClick={() => handleSubmitEdit(id, todo, isCompleted)}
                >
                  제출
                </button>
                <button
                  data-testid="cancel-button"
                  onClick={() => handleCancel(id)}
                >
                  취소
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleModify(id)}
                  className="btn"
                  data-testid="modify-button"
                  type="submit"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="btn"
                  data-testid="delete-button"
                  type="submit"
                >
                  삭제
                </button>
              </>
            )}
          </li>
        );
      })}
    </>
  );
};

export default TodoPage;