const express = require('express');
//npm i cookie-parser
const cookieParser = require('cookie-parser'); 

const app = express();
const port = 3000;

app.use(cookieParser()); // 일반 쿠키 

app.get('/setCookie', (req, res) => {
    console.log('setCookie 호출')
    // member가 키값 
    res.cookie('member', {
        id : 'ronaldo',
        name : '호날두',
        number : '7'
    },{
        maxAge : 1000 * 60 * 3  // 만료시간을 밀리초 단위로 설정
    });
    res.redirect('/showCookie'); // /showCookie으로 d이동, 보냄
});

app.get('/showCookie', (req, res) => {
    console.log('shnowCookie 호출');
    res.send(req.cookies); // 사용자가 담은 쿠키를 서버로 읽어 사용자(화면)에게 다시 전달 
    req.end(); // 화면에 뿌려짐
});

app.listen(port, () => {
    console.log(`${port}포트로 실행중...`)
});