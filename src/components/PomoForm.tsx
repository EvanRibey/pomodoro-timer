import './PomoForm.less';
import { useState, useCallback } from 'react';
import classNames from 'classnames';
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
} from '../constants';
import { PomoFormProps } from '../constants/types';

export default function PomoForm({ onSubmitForm }: PomoFormProps) {
  const [numberPomodoros, setNumberPomodoros] = useState(POMODORO_INITIAL_INTERVAL);
  const [isLongPomoChecked, setIsLongPomoChecked] = useState(false);

  const setPomodoroIntervalsHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberPomodoros(Number(event.currentTarget.value));
  }, []);

  const changeLongPomoHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLongPomoChecked(event.target.checked);
  }, []);

  const formSubmitHandler = useCallback((event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitForm({
      intervals: numberPomodoros,
      isLong: isLongPomoChecked,
    });
  }, [isLongPomoChecked, numberPomodoros]);

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
        onChange={setPomodoroIntervalsHandler}
        type="number"
        value={numberPomodoros}
      />
      <FormControlLabel
        classes={{ root: classNames({ 'long-switch': !isLongPomoChecked }) }}
        control={
          <Switch
            checked={isLongPomoChecked}
            onChange={changeLongPomoHandler}
          />
        }
        label={POMO_FORM_LABEL_LONG_CYCLES}
      />
      {isLongPomoChecked && (
        <FormHelperText classes={{ root: 'long-switch' }}>{POMO_FORM_HELPER_LONG_CYCLES}</FormHelperText>
      )}
      <Button variant="contained" type="submit">Start timer</Button>
    </form>
  );
}
