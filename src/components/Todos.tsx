import { useCallback } from 'react';
import { TodosProps } from '../types/';
import { Todo } from '.';

export function Todos({
  onCompleteTodo,
  onDeleteTodo,
  onUpdateTodo,
  todos,
}: TodosProps) {
  const completeTodoHandler = useCallback((todoId: string) => () => {
    onCompleteTodo(todoId);
  }, [onCompleteTodo]);

  const deleteTodoHandler = useCallback((todoId: string) => () => {
    onDeleteTodo(todoId);
  }, [onDeleteTodo]);

  const updateTodoHandler = useCallback((todoId: string) => (newTodoName: string) => {
    onUpdateTodo(todoId, newTodoName);
  }, [onUpdateTodo]);

  return todos.map((todo) => (
    <Todo
      key={todo.id}
      onComplete={completeTodoHandler(todo.id)}
      onDelete={deleteTodoHandler(todo.id)}
      onUpdate={updateTodoHandler(todo.id)}
      todo={todo}
    />
  ));
}
