import { useState, useCallback, useEffect } from 'react';
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import { PlayArrow, Pause, PlayDisabled, GitHub, MoreVert } from '@mui/icons-material';
import { LOFI_PLAYER_TRACKS } from '@/common/constants/lofi-tracks';
import { Song } from '@/common/types';
import { createAudioLofiPlayer, getRandomSongIndex, usePrevious } from '@/common/utils';
import { useAppDispatch } from '@/app/hooks';
import { completeTodos, deleteCompleteTodos } from '@/features/todolist/todolistSlice';
import {
  GITHUB_BUTTON_ARIA_LABEL,
  GITHUB_BUTTON_HREF,
  GITHUB_BUTTON_TOOLTIP,
  LOFI_BUTTON_ARIA_LABEL,
  LOFI_BUTTON_TOOLTIP_FIRST_TIME_PLAY,
  LOFI_BUTTON_TOOLTIP_PAUSE,
  LOFI_BUTTON_TOOLTIP_PLAY,
  LOFI_GIRL_CREDIT,
} from '@/common/constants';
import './StickyButtons.less';

export function StickyButtons() {
  const dispatch = useAppDispatch();

  const [isPlaying, setIsPlaying] = useState<boolean | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Song | null>(null);
  const [player, setPlayer] = useState<HTMLAudioElement | null>(null);
  const [optionsAnchorEl, setOptionsAnchorEl] = useState<null | HTMLElement>(null);

  const prevIsPlaying = usePrevious(isPlaying);
  const isOptionsOpen = Boolean(optionsAnchorEl);

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

  const clickMoreOptions = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOptionsAnchorEl(event.currentTarget);
  }, []);

  const closeMoreOptions = useCallback(() => {
    setOptionsAnchorEl(null);
  }, []);

  const clickDeleteCheckedTodos = useCallback(() => {
    dispatch(deleteCompleteTodos());
    setOptionsAnchorEl(null);
  }, [dispatch]);

  const clickCompleteTodos = useCallback(() => {
    dispatch(completeTodos());
    setOptionsAnchorEl(null);
  }, [dispatch]);

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
        <IconButton
          aria-label="more options"
          onClick={clickMoreOptions}
        >
          <MoreVert />
        </IconButton>
        <Menu
          open={isOptionsOpen}
          anchorEl={optionsAnchorEl}
          onClose={closeMoreOptions}
        >
          <MenuItem onClick={clickDeleteCheckedTodos}>Delete completed items</MenuItem>
          <MenuItem onClick={clickCompleteTodos}>Mark all items complete</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
