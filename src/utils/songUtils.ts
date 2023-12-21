import { Song } from '../constants/types';
import { LOFI_PLAYER_TRACKS } from '../constants/lofi-tracks';

export function createAudioLofiPlayer(track: Song, callback: Function): HTMLAudioElement {
  const newPlayer = new Audio(track.url);
  newPlayer.volume = 0.75;

  newPlayer.addEventListener('ended', () => {
    const currentIndex = LOFI_PLAYER_TRACKS.findIndex(({ name }) => name === track?.name);
    let nextIndex = currentIndex + 1;
    if (currentIndex === -1 ) nextIndex = 1;
    if (nextIndex > (LOFI_PLAYER_TRACKS.length - 1)) nextIndex = 0;
    callback(LOFI_PLAYER_TRACKS[nextIndex].name);
  });

  newPlayer.addEventListener('canplaythrough', () => {
    newPlayer.play();
  });

  return newPlayer;
}

export function getRandomSongIndex(): number {
  return Math.floor(Math.random() * (LOFI_PLAYER_TRACKS.length - 1));
}
