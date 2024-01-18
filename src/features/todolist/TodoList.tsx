import { useCallback } from 'react';
import { TodoListCreateTodoHandlerProps } from '@/common/types';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { Todos, TodoForm } from '.';
import {
  createTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from './todolistSlice';
import './TodoList.less';

export function TodoList() {
  const dispatch = useAppDispatch();

  const { todos } = useAppSelector(({ todolist }) => todolist);

  const completeTodoHandler = useCallback((todoId: string) => {
    dispatch(toggleTodo(todoId));
  }, [dispatch]);

  const updateTodoHandler = useCallback((todoId: string, newTodoName: string) => {
    dispatch(updateTodo({ id: todoId, name: newTodoName }));
  }, [dispatch]);

  const deleteTodoHandler = useCallback((todoId: string) => {
    dispatch(deleteTodo(todoId));
  }, [dispatch]);

  const createTodoHandler = useCallback(({ name, isComplete }: TodoListCreateTodoHandlerProps) => {
    dispatch(createTodo(name, isComplete));
  }, [dispatch]);

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
