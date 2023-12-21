import { IconButton } from '@mui/material';
import { PlayArrow, Pause, PlayDisabled } from '@mui/icons-material';
import { useState, useCallback } from 'react';
import { LOFI_PLAYER_TRACKS } from '../constants/lofi-tracks';
import { Song } from '../constants/types';
import './LofiPlayer.less';

export default function LofiPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
  const [player, setPlayer] = useState<HTMLAudioElement | null>(null);

  const createPlayer = useCallback((trackName: string | null = null) => {
    const track = LOFI_PLAYER_TRACKS.find(({ name }) => name === trackName) || null;
    const newPlayer = new Audio(track?.url || LOFI_PLAYER_TRACKS[0].url);
    newPlayer.volume = 0.75;

    newPlayer.addEventListener('ended', () => {
      const currentIndex = LOFI_PLAYER_TRACKS.findIndex(({ name }) => name === trackName);
      let nextIndex = currentIndex + 1;
      if (currentIndex === -1 ) nextIndex = 1;
      if (nextIndex > (LOFI_PLAYER_TRACKS.length - 1)) nextIndex = 0;
      createPlayer(LOFI_PLAYER_TRACKS[nextIndex].name);
    });

    newPlayer.addEventListener('canplaythrough', () => {
      newPlayer.play();
    });

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

  const renderIcon = () => {
    switch (isPlaying) {
      case true:
        return <Pause />
      case false:
        return <PlayArrow />;
      case null:
      default:
        return <PlayDisabled />;
    }
  };

  return (
    <div className="lofi-player">
      <IconButton
        aria-label="play lofi music"
        onClick={clickLofiPlayerHandler}
      >
        {renderIcon()}
      </IconButton>
    </div>
  );
}
