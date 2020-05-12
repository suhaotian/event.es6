type Callback = (name: string, cb: (payload?: any) => void) => void;
type Dispatch = (name: string, payload: any, other?: any[]) => void;

class Event {
  onEmit: (name: string, cb: (payload?: any) => void, other?: any[]) => void;
  cbs: any;
  add: Callback;
  subscribe: Callback;
  unsubscribe: Callback;
  remove: Callback;
  dispatch: Dispatch;
  fire: Dispatch;

  constructor(
    onEmit?: (name: string, cb: (payload?: any) => void, other?: any[]) => void
  ) {
    /* handle emit event */
    if (onEmit) {
      this.onEmit = onEmit;
    }

    this.cbs = Object.create(null);
    this.subscribe = this.add = this.on;
    this.unsubscribe = this.remove = this.off;
    this.dispatch = this.fire = this.emit;
  }

  once(name: string, cb: (payload?: any) => void) {
    const fn = (...rest: any) => {
      cb(...rest);
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
    if (!cb) {
      delete this.cbs[name];
      return;
    }
    if (this.cbs[name]) {
      for (let i = 0; i < this.cbs[name].length; i++) {
        if (this.cbs[name][i] === cb) {
          this.cbs[name].splice(i, 1);
        }
      }
    }
  }

  emit(name: string, payload?: any, ...other: any[]) {
    if (this.cbs[name]) {
      for (let i = 0; i < this.cbs[name].length; i++) {
        this.cbs[name][i](payload, ...other);
      }
      if (this.onEmit) this.onEmit(name, payload, ...other);
    }
  }
}

export { Event };
