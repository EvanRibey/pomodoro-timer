import { useCallback } from 'react';
import classNames from 'classnames';
import { Checkbox, IconButton, InputAdornment, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { TodoProps } from '@/common/types';
import './Todo.less';

export function Todo({
  onComplete,
  onDelete,
  onUpdate,
  todo,
}: TodoProps) {
  const { name, isComplete} = todo;

  const changeTodoNameHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    onUpdate(event.target.value);
  }, [onUpdate]);

  const changeTodoCompleteHandler = useCallback(() => {
    onComplete(name);
  }, [name, onComplete]);

  const deleteTodoHandler = useCallback(() => {
    onDelete();
  }, [onDelete]);

  return (
    <div className="todo">
      <Checkbox
        classes={{ root: 'checkbox', colorPrimary: 'primary', checked: 'checked' }}
        onChange={changeTodoCompleteHandler}
        checked={isComplete}
      />
      <TextField
        classes={{ root: classNames({ 'complete': isComplete }, 'input') }}
        disabled={isComplete}
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={deleteTodoHandler}>
                <Close />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={changeTodoNameHandler}
        value={name}
        variant="standard"
      />
    </div>
  );
}
