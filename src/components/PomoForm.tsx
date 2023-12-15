import { useState, useCallback } from 'react';
import { Button, TextField } from '@mui/material';
import { POMODORO_INITIAL_INTERVAL } from '../utils/constants';
import { PomoFormProps } from '../utils/types';
import './PomoForm.less';

export default function PomoForm({ onSubmitForm }: PomoFormProps) {
  const [numberPomodoros, setNumberPomodoros] = useState(POMODORO_INITIAL_INTERVAL);

  const setPomodoroIntervalsHandler = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberPomodoros(Number(event.currentTarget.value));
  }, []);

  const formSubmitHandler = useCallback(() => {
    onSubmitForm({
      intervals: numberPomodoros,
    });
  }, [numberPomodoros]);

  const willShowCountNote = numberPomodoros >= 4;

  return (
    <form
      className="pomo-form"
      onSubmit={formSubmitHandler}
    >
      <h2 className="title">Pomodoro Timer</h2>
      <TextField
        classes={{ root: 'interval-timer' }}
        label="Pomodoro Sessions"
        onChange={setPomodoroIntervalsHandler}
        type="number"
        value={numberPomodoros}
      />
      {willShowCountNote && (
        <p className="pomo-count-note">Session counts after 4 will include a long break timer.</p>
      )}
      <Button variant="contained" type="submit">Start timer</Button>
    </form>
  );
}
