import Player from '@vimeo/player';
import throttle from 'lodash/throttle';

const player = new Player('vimeo-player');

const saveTimeToLocalStorage = (currentTime) => {
  localStorage.setItem('videoplayer-current-time', currentTime);
};

const loadTimeFromLocalStorage = async () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  if (savedTime) {
    await player.setCurrentTime(parseFloat(savedTime));
  }
};

player.on('timeupdate', throttle((data) => {
  saveTimeToLocalStorage(data.seconds);
}, 1000));

player.ready().then(() => {
  loadTimeFromLocalStorage();
});

