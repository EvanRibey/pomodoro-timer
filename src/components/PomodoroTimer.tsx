import { useCallback, useState } from 'react';
import generateQueueList from '../utils/generateQueueList';
import { PomodoroTimerFormHandlerProps, QueueItem } from '../constants/types';
import PomoForm from './PomoForm';
import PomoTimer from './PomoTimer';

export default function PomodoroTimer() {
  const [queueList, setQueueList] = useState<QueueItem[]>([]);

  const removeAllBodyStyles = useCallback(() => {
    document.body.classList.remove('focus', 'break', 'break-long');
  }, []);

  const timerStartHandler = useCallback((timer: QueueItem) => {
    removeAllBodyStyles();
    document.body.classList.add(timer.type);
  }, []);

  const submitFormHandler = useCallback((formValues: PomodoroTimerFormHandlerProps) => {
    const pomoQueueItems = generateQueueList(formValues.intervals);
    setQueueList(pomoQueueItems);
    timerStartHandler(pomoQueueItems[0]);
  }, [timerStartHandler]);

  const timerCompleteHandler = useCallback(() => {
    setQueueList([]);
    removeAllBodyStyles();
  }, [removeAllBodyStyles]);

  const isFormShowing = !queueList.length;

  return (
    <div>
      {!!queueList.length && (
        <PomoTimer 
          queue={queueList}
          onTimerStart={timerStartHandler}
          onTimerEnd={timerCompleteHandler}
        />
      )}
      {isFormShowing && <PomoForm onSubmitForm={submitFormHandler}/>}
    </div>
  );
}
