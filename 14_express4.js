const express = require('express');
const app = express()
const port = 3000;

app.use((req, res) => {
    console.log('첫번째 미들웨어 실행');

    // 사용자가 보낸 req 객체에 header 프로퍼티 
    console.dir(req.header);

    // 사용자 req 객체 안에 header객체 안 객체를 추출할수있다.
    // 파라미터를 넣어 추출
    // User-Agent : 사용자의 브라우저와 OS 확인
    // 사용자인지 크롤링인지 구분 가능 헤더가 없이 접속한 정보라면 제외시킬수도 있다.
    const userAgent = req.header('User-Agent')
    console.log(userAgent)

    // http://127.0.0.1:3000/?userid=ragnar
    const userid = req.query.userid;
    console.log(userid)

    res.writeHead(200, {'content-type' : 'text/html;charset=utf-8'})

    // 클라이언트에게 전송할 데이터를 작성
    // 버퍼에 데이터를 쌓아둠 
    // end에서 전송하게됨
    res.write('<h2>익스프레스 서버에서 응답한 메세지입니다.</h2>')
    res.write(`<p>user-agent${userAgent}`);
    res.write(`<p>usesrid : ${userid}`);
    // end에 작성시 만들면서 작성
    res.end();
})

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중...`)
})