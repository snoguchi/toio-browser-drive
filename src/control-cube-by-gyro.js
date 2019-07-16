const SPEED = 30;
const SENSITIVITY = 8;

const controlCubeByGyro = (cube, controllerElement) => {
  let screen, prevK;

  const start = () => {
    window.addEventListener('deviceorientation', beforeMove, { once: true });
    window.addEventListener('deviceorientation', move);
    cube.on('id:standard-id', finish);
  };

  const stop = () => {
    window.removeEventListener('deviceorientation', move);
    cube.off('id:standard-id', finish);
    cube.stop();
  };

  const beforeMove = orientation => {
    if (Math.abs(orientation.beta) > Math.abs(orientation.gamma)) {
      screen = 'portrait';
    } else if (orientation.gamma < 0) {
      screen = 'landscape1';
    } else {
      screen = 'landscape2';
    }
  };

  const move = orientation => {
    let k;

    switch (screen) {
      case 'portrait':
        k = orientation.gamma;
        break;
      case 'landscape1':
        k = orientation.beta;
        break;
      case 'landscape2':
        k = -orientation.beta;
        break;
    }

    k = parseInt(k / SENSITIVITY);

    if (k !== prevK) {
      cube.move(SPEED + k, SPEED - k, 0);
      prevK = k;
    }
  };

  const finish = () => {
    stop();
    cube.playPresetSound(7);
  };

  controllerElement.addEventListener('touchstart', start);
  controllerElement.addEventListener('touchstart', ev => ev.preventDefault(), { passive: false });
  controllerElement.addEventListener('touchend', stop);
  controllerElement.addEventListener('touchend', ev => ev.preventDefault(), { passive: false });
};

export default controlCubeByGyro;
