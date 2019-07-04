import './android-ble-patch';
import { NearestScanner } from '@toio/scanner';

document.getElementById('connect').addEventListener('click', async () => {
  const cube = await new NearestScanner().start();
  document.body.className = 'cube-connecting';
  await cube.connect();
  document.body.className = 'cube-connected';

  const start = () => {
    window.addEventListener('deviceorientation', move);
    cube.on('id:standard-id', finish);
  }

  const stop = () => {
    window.removeEventListener('deviceorientation', move);
    cube.off('id:standard-id', finish);
    cube.stop();
  }

  const move = orientation => {
    const beta = parseInt(orientation.beta / 5);
    cube.move(30 + beta, 30 - beta, 0);
  }

  const finish = () => {
    stop();
    cube.playPresetSound(7);
  }

  document.addEventListener('touchstart', ev => {
    start();
    ev.preventDefault();
  }, {passive: false});
  document.addEventListener('touchend', ev => {
    stop();
    ev.preventDefault();
  }, {passive: false});
});
