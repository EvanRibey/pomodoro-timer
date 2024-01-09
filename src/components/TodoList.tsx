import { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { POMO_FORM_DEFAULT_TASKS, STORAGE_KEY_TODO_LIST } from '../constants';
import { TodoItem, TodoListCreateTodoHandlerProps } from '../types/';
import { useLocalStorage } from '../utils/';
import { Todos, TodoForm } from '.';
import './TodoList.less';

export function TodoList() {
  const [todos, setTodos] = useLocalStorage<TodoItem[]>(STORAGE_KEY_TODO_LIST, POMO_FORM_DEFAULT_TASKS);

  const completeTodoHandler = useCallback((todoId: string) => {
    setTodos((prevTodos: TodoItem[]) => prevTodos.map((todo) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        isComplete: !todo.isComplete,
      };
    }));
  }, []);

  const updateTodoHandler = useCallback((todoId: string, newTodoName: string) => {
    setTodos((prevTodos: TodoItem[]) => prevTodos.map((todo) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        name: newTodoName,
      };
    }));
  }, []);

  const deleteTodoHandler = useCallback((todoId: string) => {
    setTodos((prevTodos: TodoItem[]) => prevTodos.filter(todo => todo.id !== todoId));
  }, []);

  const createTodoHandler = useCallback(({ name, isComplete }: TodoListCreateTodoHandlerProps) => {
    setTodos((prevTodos: TodoItem[]) => ([
      ...prevTodos,
      {
        id: nanoid(),
        name,
        isComplete,
      },
    ]));
  }, []);

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
