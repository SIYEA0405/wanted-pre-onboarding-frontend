import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';

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
        setTodos([...data.map((td) => ({ ...td, editMode: false }))]);
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
        setTodos([...todos, { ...data, editMode: false }]);
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
        const updatedTodos = todos.map((td) => {
          if (td.id === id) {
            return {
              ...td,
              isCompleted: data.isCompleted,
              todo: data.todo,
            };
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
    const updatedTodos = todos.map((td) => {
      if (td.id === id) {
        return {
          ...td,
          editMode: !td.editMode,
        };
      }
      return td;
    });
    setTodos(updatedTodos);
  };

  const handleCancel = (id) => {
    const updatedTodos = todos.map((td) => {
      if (td.id === id) {
        return {
          ...td,
          editMode: false,
        };
      }
      return td;
    });
    setTodos(updatedTodos);
  };

  const handleEditInput = (e, id) => {
    const updatedTodos = todos.map((td) => {
      if (td.id === id) {
        return {
          ...td,
          todo: e.target.value,
        };
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
        const updatedTodos = todos.map((td) => {
          if (td.id === id) {
            return {
              ...td,
              editMode: false,
            };
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
        const updatedTodos = todos.filter((td) => td.id !== id);
        setTodos(updatedTodos);
        alert('해당 todo가 삭제되었습니다.');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Layout>
      <Stack direction={'row'} spacing={1}>
        <FormControl id="text">
          <Input
            bg="white"
            onChange={handleInputTodo}
            data-testid="new-todo-input"
            placeholder="Todo입력"
            value={addTodo}
            type="text"
          />
        </FormControl>
        <Button
          onClick={handleCreateTodo}
          data-testid="new-todo-add-button"
          bg={'#A9B8AF'}
          _hover={{
            bg: '#F1B6B6',
          }}
          type="submit"
        >
          추가
        </Button>
      </Stack>
      {todos.map((td) => {
        const { id, todo, isCompleted, editMode } = td;
        const renderContent = () => {
          if (editMode) {
            return (
              <Input
                data-testid="modify-input"
                defaultValue={todo}
                onChange={(e) => handleEditInput(e, id)}
              />
            );
          } else {
            return <span>{todo}</span>;
          }
        };

        return (
          <li key={id}>
            <Stack direction={'row'} spacing={1}>
              <label>
                <input
                  type="checkbox"
                  onClick={() =>
                    handleUpdateTodo(id, todo, isCompleted, editMode)
                  }
                  defaultChecked={isCompleted}
                />
                {renderContent()}
              </label>

              {editMode ? (
                <Stack spacing={1}>
                  <Button
                    data-testid="submit-button"
                    onClick={() => handleSubmitEdit(id, todo, isCompleted)}
                    bg={'#A9B8AF'}
                    _hover={{
                      bg: '#F1B6B6',
                    }}
                    type="submit"
                  >
                    제출
                  </Button>
                  <Button
                    data-testid="cancel-button"
                    onClick={() => handleCancel(id)}
                    bg={'red'}
                    _hover={{
                      bg: '#F1B6B6',
                    }}
                  >
                    취소
                  </Button>
                </Stack>
              ) : (
                <>
                  <Button
                    onClick={() => handleModify(id)}
                    data-testid="modify-button"
                    bg={'#C7D3C7'}
                    _hover={{
                      bg: '#F1B6B6',
                    }}
                    type="submit"
                  >
                    수정
                  </Button>
                  <Button
                    onClick={() => handleDelete(id)}
                    data-testid="delete-button"
                    bg={'#A9B8AF'}
                    _hover={{
                      bg: '#F1B6B6',
                    }}
                  >
                    삭제
                  </Button>
                </>
              )}
            </Stack>
          </li>
        );
      })}
    </Layout>
  );
};

export default TodoPage;
