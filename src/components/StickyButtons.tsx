import { IconButton, Tooltip } from '@mui/material';
import { PlayArrow, Pause, PlayDisabled } from '@mui/icons-material';
import { useState, useCallback } from 'react';
import { LOFI_PLAYER_TRACKS } from '../constants/lofi-tracks';
import { Song } from '../constants/types';
import { createAudioLofiPlayer, getRandomSongIndex } from '../utils/songUtils';
import {
  LOFI_BUTTON_ARIA_LABEL,
  LOFI_BUTTON_TOOLTIP_FIRST_TIME_PLAY,
  LOFI_BUTTON_TOOLTIP_PAUSE,
  LOFI_BUTTON_TOOLTIP_PLAY,
  LOFI_GIRL_CREDIT,
} from '../constants';
import './StickyButtons.less';

export default function StickyButtons() {
  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
  const [player, setPlayer] = useState<HTMLAudioElement | null>(null);

  const createLofiPlayer = useCallback((trackName: string | null = null) => {
    const track = LOFI_PLAYER_TRACKS.find(({ name }) => name === trackName) || LOFI_PLAYER_TRACKS[getRandomSongIndex()];
    const newPlayer = createAudioLofiPlayer(track, createLofiPlayer);

    setCurrentTrack(track);
    setPlayer(newPlayer);
  }, []);

  const clickLofiPlayerHandler = useCallback(() => {
    setIsPlaying((prevValue) => {
      if (!prevValue && player === null) {
        createLofiPlayer();
      } else if(!prevValue) {
        player?.play();
      } else {
        player?.pause();
      }
      return !prevValue;
    });
  }, [createLofiPlayer, player]);

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
    <>
      <div className="sticky-buttons">
        <Tooltip title={renderLofiPlayerTooltipTitle()}>
          <IconButton
            aria-label={LOFI_BUTTON_ARIA_LABEL}
            onClick={clickLofiPlayerHandler}
          >
            {renderLofiPlayerIcon()}
          </IconButton>
        </Tooltip>
      </div>
      {currentTrack && isPlaying && (
        <div className="lofi-player-information">
          <p className="paragraph">{currentTrack.artist} - {currentTrack.name}</p>
          <p className="paragraph">{LOFI_GIRL_CREDIT}</p>
        </div>
      )}
    </>
  );
}
