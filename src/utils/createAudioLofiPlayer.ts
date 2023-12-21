import { Song } from '../constants/types';
import { LOFI_PLAYER_TRACKS } from '../constants/lofi-tracks';

export default function createAudioLofiPlayer(track: Song | null, callback: Function): HTMLAudioElement {
  const newPlayer = new Audio(track?.url || LOFI_PLAYER_TRACKS[0].url);
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
