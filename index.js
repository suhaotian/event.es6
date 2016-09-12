export default class Event {
  constructor(){
    this.cbs = {}

    this.subscribe = this.add = this.on
    this.unsubscribe = this.remove = this.off
    this.fire = this.emit
  }

  // Maybe need once ?
  /* once(name,  cb) {} */

  on(name, cb){
    if (this.cbs[name] !== undefined){
      this.cbs[name].push(cb)
    } else {
      this.cbs[name] = [cb]
    }
  }

  off(name, cb){
    if (this.cbs[name] && cb) {
      for (let i = 0; i<this.cbs[name].length; i++) {
        if(this.cbs[name][i] === cb) {
          this.cbs.splice(i, 1)
          return 
        }
      }
    }

    delete this.cbs[name]
  }

  emit(name, payload) {
    if(this.cbs[name]) {
      for (let i = 0; i < this.cbs[name].length;i++) {
        this.cbs[name][i](payload)
      }
    }
  }
}
