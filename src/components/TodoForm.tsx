import { Checkbox, TextField } from '@mui/material';
import { TodoFormProps } from '../constants/types';
import { useCallback, useState } from 'react';
import './TodoForm.less';

export default function TodoForm({
  onCreateTodo,
}: TodoFormProps) {
  const [todoName, setTodoName] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const updateTodoNameHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(event.target.value);
  }, []);

  const enterKeyPressHandler = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onCreateTodo({ name: todoName, isComplete });
      setTodoName('');
      setIsComplete(false);
    }
  }, [isComplete, onCreateTodo, todoName]);

  const updateTodoCompleteHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIsComplete(event.target.checked);
  }, []);

  return (
    <div className="todo-form">
      <Checkbox
        classes={{ root: 'checkbox', colorPrimary: 'primary', checked: 'checked' }}
        onChange={updateTodoCompleteHandler}
        checked={isComplete}
      />
      <TextField
        classes={{ root: 'text-field' }}
        fullWidth
        onChange={updateTodoNameHandler}
        onKeyUp={enterKeyPressHandler}
        value={todoName}
        variant="standard"
      />
    </div>
  );
}
