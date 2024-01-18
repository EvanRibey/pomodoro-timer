import { useCallback, useState } from 'react';
import { generateQueueList } from '@/common/utils';
import { PomodoroTimerFormHandlerProps, QueueItem } from '@/common/types';
import { APP_TITLE } from '@/common/constants';
import { PomoForm, PomoTimer } from '.';
import './PomodoroTimer.less';

export function PomodoroTimer() {
  const [queueList, setQueueList] = useState<QueueItem[]>([]);

  const removeAllBodyStyles = useCallback(() => {
    document.body.classList.remove('focus', 'break', 'longBreak');
  }, []);

  const timerStartHandler = useCallback((timer: QueueItem) => {
    removeAllBodyStyles();
    document.body.classList.add(timer.type);
  }, []);

  const submitFormHandler = useCallback((formValues: PomodoroTimerFormHandlerProps) => {
    const { intervals, isLong } = formValues;
    const pomoQueueItems = generateQueueList(intervals, isLong);
    setQueueList(pomoQueueItems);
    timerStartHandler(pomoQueueItems[0]);
  }, [timerStartHandler]);

  const timerCompleteHandler = useCallback(() => {
    setQueueList([]);
    removeAllBodyStyles();
    document.title = APP_TITLE;
  }, [removeAllBodyStyles]);

  const isFormShowing = !queueList.length;

  return (
    <div className="pomodoro-timer">
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
