import io from 'socket.io-client';

const baseUrl = (process.env.NODE_ENV === 'production')? '' : '//localhost:3002/'
const socketService = createSocketService();
// const socketService = createDummySocketService();

window.socketService = socketService;
export default socketService;

function createSocketService() {
  var socket;
  const socketService = {
    setup() {
      socket = io(baseUrl);
      console.log('socketservice:',socket);

    },
    on(eventName, cb) {
      socket.on(eventName, cb);
      console.log('socketservice:',eventName, 'cb', cb);

    },
    off(eventName, cb) {
      console.log('socketserviceOff:',socket);

      console.log('socketserviceOff:',eventName, 'cb', cb);
      socket.off(eventName, cb);
    },
    emit(eventName, data) {

      console.log('socketservice:',eventName, 'Data', data);
      socket.emit(eventName, data);
    },
    terminate() {
      socket = null;
    }
  }
  return socketService;
}

function createDummySocketService() {
  var listenersMap = {}
  const socketService = {
    setup() {
      listenersMap = {}
      window.listenersMap = listenersMap;
    },
    terminate() {
      listenersMap = {}
    },
    on(eventName, cb) {
      listenersMap[eventName] = [...(listenersMap[eventName]) || [], cb]
    },
    off(eventName, cb) {
      listenersMap[eventName] = listenersMap[eventName].filter(l => l !== cb)
    },
    emit(eventName, data) {
      if (!listenersMap[eventName]) return;
      listenersMap[eventName].forEach(listener => {
        listener(data)
      });
    },
    debugMsg() {
      this.emit('chat addMsg', {from: 'Someone', txt: 'Aha it worked!'})
    },
  }
  return socketService;
}


// Basic Tests
// function cb(x) {console.log(x)}
// socketService.on('baba', cb)
// socketService.emit('baba', 'DATA')
// socketService.off('baba', cb)
