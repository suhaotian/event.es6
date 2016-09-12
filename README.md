# event.es6
A simple event lib for fire/emit and on/off (or subscribe/unsubscribe whatever you like 😁)

## usage
```js
import Event from './index'
const event = new Event()

event.on('say', function(what) {  // or event.subscribe('say', function(what){...})
  console.log(what)
})
event.emit('say', 'nothing')  // or event.fire('say', 'nothing')

// remove event
event.off('say') // or event.unsubscribe('say')
```
