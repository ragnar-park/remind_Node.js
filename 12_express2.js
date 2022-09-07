const express = require('express');
const app = express();
const port = 3000;

// 위 상수를 읽어들여 무조건 실행된다. 
// use는 미들웨어를 등록한다.
app.use((req, res) => {
    res.writeHead('200', {'content-type':'text/html;charset=utf-8'});
    res.end('<h2>익스프레스 서버에서 응답한 메세지입니다.</h2>')  
})

// 요청이 올때까지 대기 
app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중 ... `)
})