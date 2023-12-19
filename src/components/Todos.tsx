import { useCallback } from 'react';
import { TodosProps } from '../constants/types';
import Todo from './Todo';

export default function Todos({
  onCompleteTodo,
  onDeleteTodo,
  onUpdateTodo,
  todos,
}: TodosProps) {
  const completeTodoHandler = useCallback((todoName: string) => () => {
    onCompleteTodo(todoName);
  }, [onCompleteTodo]);

  const deleteTodoHandler = useCallback((todoName: string) => () => {
    onCompleteTodo(todoName);
  }, [onDeleteTodo]);

  const updateTodoHandler = useCallback((prevTodoName: string) => (newTodoName: string) => {
    onUpdateTodo(prevTodoName, newTodoName);
  }, [onUpdateTodo]);

  return todos.map((todo) => (
    <Todo
      key={todo.name}
      onComplete={completeTodoHandler(todo.name)}
      onDelete={deleteTodoHandler(todo.name)}
      onUpdate={updateTodoHandler(todo.name)}
      todo={todo}
    />
  ));
}
