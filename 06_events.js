const events = require('events');

// 이벤트 관련 메소드를 사용할 수 있는 EventEmitter 객체를 생성
const eventEmitter = new events.EventEmitter();

const connectHandler = function connected(){
    console.log('connectHandler connected호출')
    // emit() : 이벤트를 발생 , 자동으로 발생하는 경우도 있지만 억지로 발생(data_received 라는 이벤트)
    eventEmitter.emit('data_received');
}

// on() : 이벤트와 이벤트 핸들러와 연결 
// connection이벤트가 발생하면 connectHandler메소드를 호출
eventEmitter.on('connection', connectHandler);
eventEmitter.on('data_received', () =>{
    console.log('데이터 수신!');
});

eventEmitter.emit('connection');
console.log('프로그램 종료!');