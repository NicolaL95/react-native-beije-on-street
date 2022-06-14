const EventEmitter = require('events')

const ee = new EventEmitter()

const eventOn = (eventName, eventFunction) => {
    ee.on(eventName, eventFunction)
}

const eventEmit = (eventName, obj) => {
    ee.emit(eventName, obj)
}
export { eventOn, eventEmit }