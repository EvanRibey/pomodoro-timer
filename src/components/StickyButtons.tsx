import { useState, useCallback, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { PlayArrow, Pause, PlayDisabled, GitHub } from '@mui/icons-material';
import { LOFI_PLAYER_TRACKS } from '../constants/lofi-tracks';
import { Song } from '../constants/types';
import { createAudioLofiPlayer, getRandomSongIndex } from '../utils/songUtils';
import {
  GITHUB_BUTTON_ARIA_LABEL,
  GITHUB_BUTTON_HREF,
  GITHUB_BUTTON_TOOLTIP,
  LOFI_BUTTON_ARIA_LABEL,
  LOFI_BUTTON_TOOLTIP_FIRST_TIME_PLAY,
  LOFI_BUTTON_TOOLTIP_PAUSE,
  LOFI_BUTTON_TOOLTIP_PLAY,
  LOFI_GIRL_CREDIT,
} from '../constants';
import usePrevious from '../utils/usePrevious';
import './StickyButtons.less';

export default function StickyButtons() {
  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
  const [player, setPlayer] = useState<HTMLAudioElement | null>(null);

  const prevIsPlaying = usePrevious(isPlaying);

  const createLofiPlayer = useCallback((trackName: string | null = null) => {
    const track = LOFI_PLAYER_TRACKS.find(({ name }) => name === trackName) || LOFI_PLAYER_TRACKS[getRandomSongIndex()];
    const newPlayer = createAudioLofiPlayer(track, createLofiPlayer);

    setCurrentTrack(track);
    setPlayer(newPlayer);
  }, []);

  const clickLofiPlayerHandler = useCallback(() => {
    setIsPlaying((prevValue) => !prevValue);
  }, []);

  useEffect(() => {
    if (player === null && isPlaying) {
      createLofiPlayer();
    }

    if (player && isPlaying && !prevIsPlaying) {
      player.play();
    } else if (player && !isPlaying && prevIsPlaying) {
      player.pause();
    }
  }, [
    createLofiPlayer,
    isPlaying,
    player,
    prevIsPlaying,
  ]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => {
        setIsPlaying(true);
      });

      navigator.mediaSession.setActionHandler('pause', () => {
        setIsPlaying(false);
      });
    }
  }, []);

  const renderLofiPlayerIcon = useCallback(() => {
    switch (isPlaying) {
      case true:
        return <Pause />;
      case false:
        return <PlayArrow />;
      case null:
      default:
        return <PlayDisabled />;
    }
  }, [isPlaying]);

  const renderLofiPlayerTooltipTitle = useCallback(() => {
    switch (isPlaying) {
      case true:
        return LOFI_BUTTON_TOOLTIP_PAUSE;
      case false:
        return LOFI_BUTTON_TOOLTIP_PLAY;
      case null:
      default:
        return LOFI_BUTTON_TOOLTIP_FIRST_TIME_PLAY;
    }
  }, [isPlaying]);

  return (
    <div className="sticky-buttons">
      <div className="lofi-player-information">
        {currentTrack && isPlaying && (
          <>
            <p className="paragraph">{currentTrack.artist} - {currentTrack.name}</p>
            <p className="paragraph">{LOFI_GIRL_CREDIT}</p>
          </>
        )}
      </div>
      <div className="buttons">
        <Tooltip title={renderLofiPlayerTooltipTitle()}>
          <IconButton
            aria-label={LOFI_BUTTON_ARIA_LABEL}
            onClick={clickLofiPlayerHandler}
          >
            {renderLofiPlayerIcon()}
          </IconButton>
        </Tooltip>
        <Tooltip title={GITHUB_BUTTON_TOOLTIP}>
          <IconButton
            aria-label={GITHUB_BUTTON_ARIA_LABEL}
            href={GITHUB_BUTTON_HREF}
            target="_blank"
          >
            <GitHub />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
}
