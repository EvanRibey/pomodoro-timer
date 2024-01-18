import { useState, useCallback } from 'react';
import {
  Button,
  FormControlLabel,
  FormHelperText,
  Switch,
  TextField,
} from '@mui/material';
import {
  POMODORO_INITIAL_INTERVAL,
  POMO_FORM_HELPER_COUNT,
  POMO_FORM_HELPER_LONG_CYCLES,
  POMO_FORM_LABEL_COUNT,
  POMO_FORM_LABEL_LONG_CYCLES,
  POMO_FORM_NAME_CHECKBOX,
  POMO_FORM_NAME_TEXTFIELD,
  STORAGE_KEY_POMO_LONG,
} from '@/common/constants';
import { PomoFormProps } from '@/common/types';
import { useLocalStorage } from '@/common/utils';
import './PomoForm.less';

export function PomoForm({ onSubmitForm }: PomoFormProps) {
  const [numberPomodoros, setNumberPomodoros] = useState(POMODORO_INITIAL_INTERVAL);
  const [isLongPomoChecked, setIsLongPomoChecked] = useLocalStorage<boolean>(STORAGE_KEY_POMO_LONG, false);

  const setPomodoroIntervalsHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberPomodoros(Number(event.currentTarget.value));
  }, []);

  const changeLongPomoHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLongPomoChecked(event.target.checked);
  }, []);

  const formSubmitHandler = useCallback((event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    onSubmitForm({
      intervals: Number(formData.get(POMO_FORM_NAME_TEXTFIELD)),
      isLong: formData.get(POMO_FORM_NAME_CHECKBOX) === 'on',
    });
  }, []);

  const countNote = numberPomodoros >= 4 ? POMO_FORM_HELPER_COUNT : '';

  return (
    <form
      autoComplete="off"
      className="pomo-form"
      onSubmit={formSubmitHandler}
    >
      <h2 className="title">Pomodoro Timer</h2>
      <TextField
        classes={{ root: 'interval-timer' }}
        helperText={countNote}
        label={POMO_FORM_LABEL_COUNT}
        name={POMO_FORM_NAME_TEXTFIELD}
        onChange={setPomodoroIntervalsHandler}
        type="number"
        value={numberPomodoros}
      />
      <FormControlLabel
        classes={{ root: 'long-switch-label' }}
        control={
          <Switch
            checked={isLongPomoChecked}
            name={POMO_FORM_NAME_CHECKBOX}
            onChange={changeLongPomoHandler}
          />
        }
        label={POMO_FORM_LABEL_LONG_CYCLES}
      />
      <FormHelperText classes={{ root: 'long-switch' }}>{POMO_FORM_HELPER_LONG_CYCLES}</FormHelperText>
      <Button variant="contained" type="submit">Start timer</Button>
    </form>
  );
}
