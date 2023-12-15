import { useCallback, useState } from 'react';
import generateQueueList from '../utils/generateQueueList';
import { PomodoroTimerFormHandlerProps, QueueItem } from '../utils/types';
import PomoForm from './PomoForm';
import PomoTimer from './PomoTimer';

export default function PomodoroTimer() {
  const [queueList, setQueueList] = useState<QueueItem[]>([]);

  const submitFormHandler = useCallback((formValues: PomodoroTimerFormHandlerProps) => {
    const pomoQueueItems = generateQueueList(formValues.intervals);
    console.log(pomoQueueItems);
    setQueueList(pomoQueueItems);
  }, []);

  const timerCompleteHandler = useCallback(() => {
    setQueueList([]);
  }, []);

  const isFormShowing = !queueList.length;

  return (
    <div>
      {!!queueList.length && (
        <PomoTimer 
          queue={queueList}
          onTimerEnd={timerCompleteHandler}
        />
      )}
      {isFormShowing && <PomoForm onSubmitForm={submitFormHandler}/>}
    </div>
  );
}
