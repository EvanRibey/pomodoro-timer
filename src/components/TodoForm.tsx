import { Checkbox, TextField } from '@mui/material';
import { useCallback } from 'react';
import { TodoFormProps } from '../constants/types';
import { TODO_FORM_HELPER_TEXT_FIELD, TODO_FORM_NAME_CHECKBOX, TODO_FORM_NAME_TEXTFIELD } from '../constants';
import './TodoForm.less';

export default function TodoForm({ onCreateTodo }: TodoFormProps) {
  const submitFormHandler = useCallback((event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onCreateTodo({
      name: formData.get(TODO_FORM_NAME_TEXTFIELD),
      isComplete: formData.get(TODO_FORM_NAME_CHECKBOX) === 'on',
    });
    event.currentTarget.reset();
  }, [onCreateTodo]);

  return (
    <form
      autoComplete="off"
      className="todo-form"
      onSubmit={submitFormHandler}
    >
      <Checkbox
        classes={{ root: 'checkbox', colorPrimary: 'primary', checked: 'checked' }}
        name="isComplete"
      />
      <TextField
        classes={{ root: 'text-field' }}
        fullWidth
        helperText={TODO_FORM_HELPER_TEXT_FIELD}
        name="name"
        variant="standard"
      />
    </form>
  );
}
