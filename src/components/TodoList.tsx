import { useCallback, useMemo, useState } from 'react';
import './TodoList.less';
import { nanoid } from 'nanoid';
import { TodoItem, TodoListCreateTodoHandlerProps } from '../constants/types';
import Todos from './Todos';
import TodoForm from './TodoForm';
import { POMO_FORM_DEFAULT_TASKS, STORAGE_KEY_TODO_LIST } from '../constants';

export default function TodoList() {
  const initialTodoItems = useMemo(() => {
    const initialTodoItems = localStorage.getItem(STORAGE_KEY_TODO_LIST);
    if (initialTodoItems) return JSON.parse(initialTodoItems);
    return null;
  }, []);

  const [todos, setTodos] = useState<TodoItem[]>(initialTodoItems || POMO_FORM_DEFAULT_TASKS);

  const setStorage = useCallback((newTodos: TodoItem[]) => {
    localStorage.setItem(STORAGE_KEY_TODO_LIST, JSON.stringify(newTodos));
  }, []);

  const completeTodoHandler = useCallback((todoId: string) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.id !== todoId) return todo;
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      });

      setStorage(newTodos);

      return newTodos;
    });
  }, [setStorage]);

  const updateTodoHandler = useCallback((todoId: string, newTodoName: string) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.map((todo) => {
        if (todo.id !== todoId) return todo;
        return {
          ...todo,
          name: newTodoName,
        };
      });

      setStorage(newTodos);

      return newTodos;
    });
  }, [setStorage]);

  const deleteTodoHandler = useCallback((todoId: string) => {
    setTodos((prevTodos) => {
      const newTodos = prevTodos.filter(todo => todo.id !== todoId)

      setStorage(newTodos);

      return newTodos;
    });
  }, []);

  const createTodoHandler = useCallback(({ name, isComplete }: TodoListCreateTodoHandlerProps) => {
    setTodos((prevTodos) => {
      const newTodos = [
        ...prevTodos,
        {
          id: nanoid(),
          name,
          isComplete,
        },
      ];
      setStorage(newTodos);
      return newTodos;
    });
  }, [setStorage]);

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
