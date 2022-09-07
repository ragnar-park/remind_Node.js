const http = require('http'); // Node js에 http라는 모듈(기능)을 쓸수있게 해주는 객체

const hostname = '127.0.0.1';
const port = 3000;

// http안 node.js안 웹서버 기능을 만드는 역할 (서버 역할)
// 서버를 이용 할 수 있게 해줌 
// req : 클라이언트(접속자)의 정보를 담는 객체
// res : 사용자에게 전달해주고자 하는 정보를 담는 객체
const server = http.createServer((req, res) => {
  res.statusCode = 200; // 상태를 전달할 코드  , 200은 정상적일때 코드 
  res.setHeader('Content-Type', 'text/plain'); // 되돌려줄 결과에 헤더에 해당 , 
  res.end('Hello World'); //end 전달하는 함수 
});

//listen : 사용자가 올때 까지 대기 
// 대기할 포트번호 
// 대기할 호스트네임
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
}); 

// URL 로 http://127.0.0.1:3000/ 요청하면 실행