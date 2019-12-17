export default class Event {
  protected handleEmit: (name: string, cb: () => void, other?: any[]) => void;
  protected cbs: any;
  protected add: (name: string, cb: () => void) => void;
  protected subscribe: (name: string, cb: () => void) => void;
  protected unsubscribe: (name: string, cb: () => void) => void;
  protected remove: (name: string, cb: () => void) => void;
  protected dispatch: (name: string, payload: any, other?: any[]) => void;
  protected fire: (name: string, payload: any, other?: any[]) => void;

  constructor(
    handleEmit: (name: string, cb: () => void, other?: any[]) => void
  ) {
    /* handle emit event */
    this.handleEmit = handleEmit || function() {};

    this.cbs = {};
    this.subscribe = this.add = this.on;
    this.unsubscribe = this.remove = this.off;
    this.dispatch = this.fire = this.emit;
  }

  // Maybe need once ?
  /* once(name,  cb) {} */

  on(name: string | number, cb: () => void) {
    if (this.cbs[name] !== undefined) {
      this.cbs[name].push(cb);
    } else {
      this.cbs[name] = [cb];
    }
  }

  off(name: string, cb: () => void) {
    if (this.cbs[name] && cb) {
      for (let i = 0; i < this.cbs[name].length; i++) {
        if (this.cbs[name][i] === cb) {
          this.cbs[name].splice(i, 1);
          return;
        }
      }
    }

    delete this.cbs[name];
  }

  emit(name: string, payload: any, ...other: any[]) {
    if (this.cbs[name]) {
      for (let i = 0; i < this.cbs[name].length; i++) {
        let cb = this.cbs[name][i];
        cb(payload, ...other);
      }
      this.handleEmit(name, payload, ...other);
    }
  }
}
