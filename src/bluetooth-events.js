import { EventEmitter } from 'events';

const emitter = new EventEmitter();

const requestDevice = Bluetooth.prototype.requestDevice;
Bluetooth.prototype.requestDevice = function(...args) {
  return requestDevice
    .apply(this, args)
    .then(device => {
      device.addEventListener('gattserverdisconnected', ev => emitter.emit(ev.type, ev), { once: true });
      return device;
    })
    .catch(err => {
      emitter.emit('error', err);
      throw err;
    });
};

export default emitter;
