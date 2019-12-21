type Callback = (name: string, cb: (payload?: any) => void) => void;
type Dispatch = (name: string, payload: any, other?: any[]) => void;

class Event {
  handleEmit: (
    name: string,
    cb: (payload?: any) => void,
    other?: any[]
  ) => void;
  cbs: any;
  add: Callback;
  subscribe: Callback;
  unsubscribe: Callback;
  remove: Callback;
  dispatch: Dispatch;
  fire: Dispatch;
  constructor(
    handleEmit?: (
      name: string,
      cb: (payload?: any) => void,
      other?: any[]
    ) => void
  ) {
    /* handle emit event */
    this.handleEmit = handleEmit || function() {};

    this.cbs = {};
    this.subscribe = this.add = this.on;
    this.unsubscribe = this.remove = this.off;
    this.dispatch = this.fire = this.emit;
  }

  once(name: string, cb: (payload?: any) => void) {
    const fn = () => {
      cb(...arguments);
      this.off(name, fn);
    };
    this.on(name, fn);
  }

  on(name: string, cb: (payload?: any) => void) {
    if (this.cbs[name] !== undefined) {
      this.cbs[name].push(cb);
    } else {
      this.cbs[name] = [cb];
    }
  }

  off(name: string, cb?: (payload?: any) => void) {
    if (this.cbs.hasOwnProperty(name) && cb) {
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
    if (this.cbs.hasOwnProperty(name)) {
      for (let i = 0; i < this.cbs[name].length; i++) {
        let cb = this.cbs[name][i];
        cb(payload, ...other);
      }
      this.handleEmit(name, payload, ...other);
    }
  }
}

export { Event };
