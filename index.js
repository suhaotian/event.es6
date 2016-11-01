class Event {
  constructor(handleEmit){
    /* handle emit event */
    this.handleEmit = handleEmit || function (){}
    
    this.cbs = {}
    this.subscribe = this.add = this.on
    this.unsubscribe = this.remove = this.off
    this.dispatch = this.fire = this.emit
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
        let cb = this.cbs[name][i]
        cb(payload)
      }
      this.handleEmit(name, payload)
    }
     
  }
}

module.exports = Event
