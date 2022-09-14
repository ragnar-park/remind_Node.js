const express = require('express');
// npm i express-session
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// 미들웨어 등록
app.use(bodyParser.urlencoded({extended: false}));
app.use(expressSession({
    secret : '!@$@@%@!@', // 쿠키를 임의로 변조하는 것을 방지하기 위한 값, 이 값을 통해서 세션을 암호화하여 저장
    resave : false, // 세션을 언제나 저장힐지 지정하는 값, 이 값을 false로 하는 것을 권장
    saveUninitialized : true // 세션이 저장되기 전에 saveUninitialized 상태로 미리 만들어서 저장
}));

app.get('/login', (req, res) => {
    fs.readFile(__dirname+'/html/login.html', 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data);
        }
    });
});

app.post('/login', (req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(`userid=${userid}, userpw=${userpw}`);

    // 임시로 지정한 id, pw 
    if(userid == 'admin' && userpw == '1234'){
        // req 객체로 session을 만듬, member 변수 선언
        req.session.member = {
            id : userid,
            userpw : userpw,
            isauth : true // 인증여부
        };
        res.redirect('/main'); // 일치할 경우 /main으로 이동
    }else{
        res.redirect('/login'); // 일치하지 않을 경우 /login를 다시 호출
    }
});

app.get('/main', (req, res) => {
    console.log(req.session.member)
    // 세션안 멤버 객체 여부를 확인
    if(req.session.member){
        fs.readFile(__dirname+'/html/main.html', 'utf8', (err, data) => {
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(data);
        });
    }else{
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy( () => {
        console.log('세션이 삭제되었습니다.');
    });
    res.redirect('/login');
});

app.listen(port, () => {
    console.log(`${port}포트로 실행중...`)
});