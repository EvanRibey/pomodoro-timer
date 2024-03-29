import { useCallback, useEffect, useMemo, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { StopCircle } from '@mui/icons-material';
import PomoWorker from '@/workers/pomotimer.worker.js?worker';
import { PomoTimerProps, QueueItem } from '@/common/types';
import { minutesToSeconds, formatToTwoNumbers } from '@/common/utils';
import {
  APP_TITLE_BREAK,
  APP_TITLE_BREAK_LONG,
  APP_TITLE_FOCUS,
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
} from '@/common/constants';
import { countdownSoundEffect, winSoundEffect } from '@/assets';
import './PomoTimer.less';

export function PomoTimer({
  queue,
  onTimerStart,
  onTimerEnd,
}: PomoTimerProps) {
  const [serviceWorker, setServiceWorker] = useState<Worker | null>(null);
  const [currentTimer, setCurrentTimer] = useState<QueueItem>(queue[0]);
  const [remainingQueue, setRemainingQueue] = useState<QueueItem[]>(queue.slice(1));
  const [countdownTime, setCountdownTime] = useState(minutesToSeconds(queue[0].duration));

  const { type: countdownType, duration: countdownDuration } = currentTimer;
  const minutes = Math.floor(countdownTime / MINUTES_IN_SECOND);
  const seconds = formatToTwoNumbers(countdownTime - minutes * MINUTES_IN_SECOND);

  const countdownEffectAudio = useMemo(() => new Audio(countdownSoundEffect), []);
  const winEffectAudio = useMemo(() => new Audio(winSoundEffect), []);

  const clickStopButtonHandler = useCallback(() => {
    countdownEffectAudio.pause();
    onTimerEnd();
  }, [countdownEffectAudio, onTimerEnd]);

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
        setCountdownTime((prevCountdownTimer) => prevCountdownTimer - 1);
      };
    }
  }, [serviceWorker]);

  useEffect(() => {
    if (!remainingQueue.length && !countdownTime) {
      onTimerEnd();
    } else if (remainingQueue.length && !countdownTime) {
      const [nextQueueItem, ...rest] = remainingQueue;

      setCurrentTimer(nextQueueItem)
      setRemainingQueue([...rest]);
      setCountdownTime(minutesToSeconds(nextQueueItem.duration));

      onTimerStart(nextQueueItem);
    } else if (countdownTime === 3 && countdownType === QUEUE_TYPE_FOCUS) {
      winEffectAudio.play();
    } else if (countdownTime === 3 && (countdownType === QUEUE_TYPE_BREAK || countdownType === QUEUE_TYPE_BREAK_LONG)) {
      countdownEffectAudio.play();
    } else {
      let appTitle = '';

      switch(countdownType) {
        case QUEUE_TYPE_BREAK:
          appTitle = APP_TITLE_BREAK;
          break;

        case QUEUE_TYPE_BREAK_LONG:
          appTitle = APP_TITLE_BREAK_LONG;
          break;

        case QUEUE_TYPE_FOCUS:
        default:
          appTitle = APP_TITLE_FOCUS;
          break;
      }

      document.title = `${minutes}:${seconds} - ${appTitle}`;
    }
  }, [
    countdownEffectAudio,
    countdownTime,
    countdownType,
    minutes,
    onTimerEnd,
    onTimerStart,
    remainingQueue,
    seconds,
    winSoundEffect,
  ]);

  const sandHeight = POMODORO_TIMER_HEIGHT * countdownTime / minutesToSeconds(countdownDuration);
  let title = '';
  let descriptor = '';

  switch(countdownType) {
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
