const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');


const app = express();
const port = 3000;

// 미들웨어 등록
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('!@#@%%^@2#')) // 암호화된 쿠키, 전달한 문자열을 섞어서 암호화한다. 

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

// 데이터를 받아서 처리한다. post보내기 때문에 body로 받아야한다. -> bodyparser 사용
app.post('/login', (req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    console.log(`userid=${userid}, userpw=${userpw}`);

    // 임시로 지정한 id, pw 
    if(userid == 'admin' && userpw == '1234'){
        const expiresDay = new Date(Date.now() + (1000 * 60 * 60 * 24)); // 현재 날짜를 가져온다 , 24시간 후 날짜 객체 저장
        res.cookie('userid', userid, { expires : expiresDay, signed : true}) // expires : 만료날짜, signed : cookieParser에 설정한 암호화를 사용
        res.redirect('/main'); // 일치할 경우 /main으로 이동
    }else{
        res.redirect('/login'); // 일치하지 않을 경우 /login를 다시 호출
    }
});

app.get('/main', (req, res) => {
    const cookieUserid = req.signedCookies.userid; // 암호화된 userid
    console.log(cookieUserid)
    // 쿠키 여부를 확인
    if(cookieUserid){
        fs.readFile(__dirname+'/html/main.html', 'utf8', (err, data) => {
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(data);
        });
    }else{
        res.redirect('/login');
    }
});

app.get('/logout', (req, res) => {
    res.clearCookie('userid'); // 쿠키를 지운다.
    res.redirect('/login');
});

app.listen(port, () => {
    console.log(`${port}포트로 실행중...`)
});