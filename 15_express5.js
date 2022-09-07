const express = require('express')
//따로 있는 모듈이지만 express에 적용 시키려고 함
const bodyParse = require('body-parser')

const app = express();
const port = 3000;

// urlencoded() 
// {extends:false}
// 중첩된 객체표현을 허용할지 여부를 체크 
// - body0parser를 사용하면 자동으로 req에 body속성이 추가되고 저장됨
// - 인코딩이 기본적으로 utf-8임
// URL 파싱
// qs
// query-string 
// 파싱에서 두가지 모듈이 있는데 겹쳐서 사용됨 메소드가 겹쳐서 에러가 발생할수 있기 때문에 두 가지 모두 사용하는 모두를 끄고
// query-string를 사용함

app.use(bodyParse.urlencoded({extends:false}))
app.use((req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(`userid : ${userid}, userpw : ${userpw} `)
    console.log('nodemon 실행!')

    res.writeHead(200, {'content-type':'text/html;charset=utf-8'});
    res.write('<h2> 익스프레스 서버에서 응답한 메시지입니다</h2>');
    res.write(`<p>아이디: ${userid}</p>`);
    res.write(`<p>비밀번호:${userpw}</p>`);
    res.end();
})
app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중...`);
})