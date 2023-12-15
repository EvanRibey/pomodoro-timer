import { useState, useCallback } from 'react';
import { Button, Input } from '@mui/material';
import { POMODORO_INITIAL_INTERVAL } from '../utils/constants';
import { PomoFormProps } from '../utils/types';
import './PomoForm.less';

export default function PomoForm({
  onSubmitForm,
}: PomoFormProps) {
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
      <Input
        classes={{ root: 'interval-timer' }}
        onChange={setPomodoroIntervalsHandler}
        type="number"
        value={numberPomodoros}
      />
      {willShowCountNote && (
        <p className="pomo-count-note">Pomodoro counts after 4 will include a long break timer.</p>
      )}
      <Button variant="contained">Start timer</Button>
    </form>
  );
}
