import { Checkbox, IconButton, InputAdornment, TextField } from '@mui/material';
import { TodoProps } from '../constants/types';
import './Todo.less';
import classNames from 'classnames';
import { useCallback } from 'react';
import { Close } from '@mui/icons-material';

export default function Todo({
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
  }, [onComplete]);

  const deleteTodoHandler = useCallback(() => {
    onDelete();
  }, [onDelete]);

  return (
    <div className="todo">
      <Checkbox
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
