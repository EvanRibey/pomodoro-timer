import { useCallback, useEffect, useMemo, useState } from 'react';
import { nanoid } from 'nanoid';
import { TodoItem, TodoListCreateTodoHandlerProps } from '../constants/types';
import Todos from './Todos';
import TodoForm from './TodoForm';
import { POMO_FORM_DEFAULT_TASKS, STORAGE_KEY_TODO_LIST } from '../constants';
import usePrevious from '../utils/usePrevious';
import './TodoList.less';

export default function TodoList() {
  const initialTodoItems = useMemo(() => {
    const initialTodoItems = localStorage.getItem(STORAGE_KEY_TODO_LIST);
    if (initialTodoItems) return JSON.parse(initialTodoItems);
    return null;
  }, []);

  const [todos, setTodos] = useState<TodoItem[]>(initialTodoItems || POMO_FORM_DEFAULT_TASKS);

  const prevTodos = usePrevious(todos);

  const setStorage = useCallback((newTodos: TodoItem[]) => {
    localStorage.setItem(STORAGE_KEY_TODO_LIST, JSON.stringify(newTodos));
  }, []);

  const completeTodoHandler = useCallback((todoId: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        isComplete: !todo.isComplete,
      };
    }));
  }, []);

  const updateTodoHandler = useCallback((todoId: string, newTodoName: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        name: newTodoName,
      };
    }));
  }, []);

  const deleteTodoHandler = useCallback((todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
  }, []);

  const createTodoHandler = useCallback(({ name, isComplete }: TodoListCreateTodoHandlerProps) => {
    setTodos((prevTodos) => ([
      ...prevTodos,
      {
        id: nanoid(),
        name,
        isComplete,
      },
    ]));
  }, []);

  useEffect(() => {
    if (todos !== prevTodos) {
      setStorage(todos);
    }
  }, [prevTodos, setStorage, todos]);

  return (
    <div className="todo-list">
      <Todos
        onCompleteTodo={completeTodoHandler}
        onDeleteTodo={deleteTodoHandler}
        onUpdateTodo={updateTodoHandler}
        todos={todos}
      />
      <TodoForm
        onCreateTodo={createTodoHandler}
      />
    </div>
  );
}
