import { IconButton, Tooltip } from '@mui/material';
import { PlayArrow, Pause, PlayDisabled } from '@mui/icons-material';
import { useState, useCallback } from 'react';
import { LOFI_PLAYER_TRACKS } from '../constants/lofi-tracks';
import { Song } from '../constants/types';
import createAudioLofiPlayer from '../utils/createAudioLofiPlayer';
import './StickyButtons.less';

export default function StickyButtons() {
  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
  const [player, setPlayer] = useState<HTMLAudioElement | null>(null);

  const createPlayer = useCallback((trackName: string | null = null) => {
    const track = LOFI_PLAYER_TRACKS.find(({ name }) => name === trackName) || LOFI_PLAYER_TRACKS[0];
    const newPlayer = createAudioLofiPlayer(track, createPlayer);

    setCurrentTrack(track);
    setPlayer(newPlayer);
  }, []);

  const clickLofiPlayerHandler = useCallback(() => {
    setIsPlaying((prevValue) => {
      if (!prevValue && player === null) {
        createPlayer();
      } else if(!prevValue) {
        player?.play();
      } else {
        player?.pause();
      }
      return !prevValue;
    });
  }, [createPlayer, player]);

  const renderIcon = useCallback(() => {
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

  const renderTooltipTitle = useCallback(() => {
    switch (isPlaying) {
      case true:
        return 'Pause Music';
      case false:
        return 'Play Music';
      case null:
      default:
        return 'Play Lofi Girl Music';
    }
  }, [isPlaying]);

  return (
    <>
      <div className="sticky-buttons">
        <Tooltip title={renderTooltipTitle()}>
          <IconButton
            aria-label="play lofi music"
            onClick={clickLofiPlayerHandler}
          >
            {renderIcon()}
          </IconButton>
        </Tooltip>
      </div>
      {currentTrack && isPlaying && (
        <div className="lofi-player-information">
          <p className="paragraph">{currentTrack.name} - {currentTrack.artist}</p>
          <p className="paragraph">Provided by Lofi Girl</p>
        </div>
      )}
    </>
  );
}
