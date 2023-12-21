import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { StopCircle } from '@mui/icons-material';
import PomoWorker from '../workers/pomotimer.worker.js?worker';
import { PomoTimerProps, QueueItem } from '../constants/types';
import { minutesToSeconds } from '../utils/timerHelpers';
import formatToTwoNumbers from '../utils/numberHelpers';
import {
  MINUTES_IN_SECOND,
  POMODORO_TIMER_HEIGHT,
  POMO_STATE_DESCRIPTION_BREAK,
  POMO_STATE_DESCRIPTION_BREAK_LONG,
  POMO_STATE_DESCRIPTION_FOCUS,
  POMO_STATE_TITLE_BREAK,
  POMO_STATE_TITLE_BREAK_LONG,
  POMO_STATE_TITLE_FOCUS,
  POMO_TIMER_ARIA_LABEL,
  POMO_TIMER_TOOLTIP_STOP,
  QUEUE_TYPE_BREAK,
  QUEUE_TYPE_BREAK_LONG,
  QUEUE_TYPE_FOCUS,
} from '../constants';
import './PomoTimer.less';
import soundEffect from '../assets/countdown-sound-effect.mp3';

export default function PomoTimer({
  queue,
  onTimerStart,
  onTimerEnd,
}: PomoTimerProps) {
  const [serviceWorker, setServiceWorker] = useState<Worker | null>(null);
  const [currentTimer, setCurrentTimer] = useState<QueueItem>(queue[0]);
  const [remainingQueue, setRemainingQueue] = useState<QueueItem[]>(queue.slice(1));
  const [countdownTime, setCountdownTime] = useState(minutesToSeconds(queue[0].duration));

  const soundEffectAudio = useMemo(() => new Audio(soundEffect), []);

  const setNextItem = useCallback(() => {
    if (remainingQueue.length) {
      const [nextQueueItem, ...rest] = remainingQueue;
      setCurrentTimer(nextQueueItem)
      onTimerStart(nextQueueItem);
      setRemainingQueue([...rest]);
      setCountdownTime(minutesToSeconds(nextQueueItem.duration));
    }
  }, [onTimerStart, remainingQueue]);

  const clickStopButtonHandler = useCallback(() => {
    onTimerEnd();
  }, [onTimerEnd]);

  useEffect(() => {
    const workerInstance = new PomoWorker();
    setServiceWorker(workerInstance);

    return () => {
      workerInstance.terminate();
    };
  }, []);

  useEffect(() => {
    if (serviceWorker) {
      serviceWorker.onmessage = () => {
        setCountdownTime((prevCountdownTimer) => {
          const newTimer = prevCountdownTimer - 1;

          if (newTimer === 3) {
            soundEffectAudio.play();
          }

          if (!newTimer) {
            setNextItem();
          }

          return newTimer;
        });
      };
    }
  }, [soundEffectAudio, setNextItem, serviceWorker]);

  useEffect(() => {
    if (!remainingQueue.length && !countdownTime) {
      onTimerEnd();
    }
  }, [remainingQueue, countdownTime]);

  const { type, duration } = currentTimer;
  const sandHeight = POMODORO_TIMER_HEIGHT * countdownTime / minutesToSeconds(duration);
  const minutes = Math.floor(countdownTime / MINUTES_IN_SECOND);
  const seconds = formatToTwoNumbers(countdownTime - minutes * MINUTES_IN_SECOND);
  let title = '';
  let descriptor = '';

  switch(type) {
    case QUEUE_TYPE_BREAK:
      title = POMO_STATE_TITLE_BREAK;
      descriptor = POMO_STATE_DESCRIPTION_BREAK;
      break;

    case QUEUE_TYPE_BREAK_LONG:
      title = POMO_STATE_TITLE_BREAK_LONG;
      descriptor = POMO_STATE_DESCRIPTION_BREAK_LONG;
      break;

    case QUEUE_TYPE_FOCUS:
    default:
      title = POMO_STATE_TITLE_FOCUS;
      descriptor = POMO_STATE_DESCRIPTION_FOCUS;
      break;
  }

  return (
    <div className="pomo-timer">
      <div className="sand" style={{ height: sandHeight }}></div>
      <h2 className="title">{title}</h2>
      <p className="description">{descriptor}</p>
      <p className="timer">{minutes}:{seconds}</p>
      <Tooltip title={POMO_TIMER_TOOLTIP_STOP}>
        <IconButton
          aria-label={POMO_TIMER_ARIA_LABEL}
          classes={{ root: 'stop-button' }}
          color="primary"
          onClick={clickStopButtonHandler}
        >
          <StopCircle />
        </IconButton>
      </Tooltip>
    </div>
  );
}
