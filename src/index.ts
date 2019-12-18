class Event {
  protected handleEmit: (
    name: string,
    cb: (payload?: any) => void,
    other?: any[]
  ) => void;
  protected cbs: any;
  public add: (name: string, cb: (payload?: any) => void) => void;
  public subscribe: (name: string, cb: (payload?: any) => void) => void;
  public unsubscribe: (name: string, cb: (payload?: any) => void) => void;
  public remove: (name: string, cb: (payload?: any) => void) => void;
  public dispatch: (name: string, payload: any, other?: any[]) => void;
  public fire: (name: string, payload: any, other?: any[]) => void;

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

  // Maybe need once ?
  /* once(name,  cb) {} */

  on(name: string | number, cb: (payload?: any) => void) {
    if (this.cbs[name] !== undefined) {
      this.cbs[name].push(cb);
    } else {
      this.cbs[name] = [cb];
    }
  }

  off(name: string, cb: (payload?: any) => void) {
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


export default Event;