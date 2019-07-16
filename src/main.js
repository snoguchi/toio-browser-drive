import { NearestScanner } from '@toio/scanner';
import './bluetooth-patch';
import bluetoothEvents from './bluetooth-events';
import controlCubeByGyro from './control-cube-by-gyro';

document.getElementById('connect').addEventListener('click', async () => {
  bluetoothEvents.on('error', err => {
    alert(err.toString());
    if (err.name === 'NotFoundError') {
      location.reload();
    }
  });

  bluetoothEvents.on('gattserverdisconnected', ev => {
    if (ev.target.id === cube.id) {
      location.reload();
    }
  });

  const cube = await new NearestScanner().start();
  document.body.className = 'cube-connecting';
  await cube.connect();
  document.body.className = 'cube-connected';

  controlCubeByGyro(cube, document);
});
