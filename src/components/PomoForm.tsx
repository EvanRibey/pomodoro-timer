import { useState, useMemo, useCallback, useEffect } from 'react';
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
} from '../constants';
import { PomoFormProps } from '../types/';
import './PomoForm.less';

export function PomoForm({ onSubmitForm }: PomoFormProps) {
  const initialPomoLongStatus = useMemo(() => {
    const initialState = localStorage.getItem(STORAGE_KEY_POMO_LONG);
    if (initialState) return JSON.parse(initialState);
    return false;
  }, []);

  const [numberPomodoros, setNumberPomodoros] = useState(POMODORO_INITIAL_INTERVAL);
  const [isLongPomoChecked, setIsLongPomoChecked] = useState<boolean>(initialPomoLongStatus || false);

  const setStorage = useCallback((newLongChecked: boolean) => {
    localStorage.setItem(STORAGE_KEY_POMO_LONG, String(newLongChecked));
  }, []);

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

  useEffect(() => {
    setStorage(isLongPomoChecked);
  }, [setStorage, isLongPomoChecked]);

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
