import { useCallback, useState } from 'react';
import './TodoList.less';
import { nanoid } from 'nanoid';
import { TodoItem, TodoListCreateTodoHandlerProps } from '../constants/types';
import Todos from './Todos';
import TodoForm from './TodoForm';
import { POMO_FORM_DEFAULT_TASKS } from '../constants';

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>(POMO_FORM_DEFAULT_TASKS);

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
