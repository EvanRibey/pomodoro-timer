import { useCallback, useState } from 'react';
import './TodoList.less';
import { TodoItem } from '../constants/types';
import Todos from './Todos';
import TodoForm from './TodoForm';

export default function TodoList() {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  const completeTodoHandler = useCallback((todoName: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => {
      if (todo.name !== todoName) return todo;
      return {
        ...todo,
        isComplete: true,
      };
    }));
  }, []);

  const updateTodoHandler = useCallback((prevTodoName: string, newTodoName: string) => {
    setTodos((prevTodos) => prevTodos.map((todo) => {
      if (todo.name !== prevTodoName) return todo;
      return {
        ...todo,
        name: newTodoName,
      };
    }));
  }, []);

  const deleteTodoHandler = useCallback((todoName: string) => {
    setTodos((prevTodos) => prevTodos.filter(todo => todo.name === todoName));
  }, []);

  const createTodoHandler = useCallback((todoItem: string) => {
    setTodos((prevTodos) => ([
      ...prevTodos,
      {
        name: todoItem,
        isComplete: false,
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
