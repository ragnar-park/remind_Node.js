const express = require('express')
const bodyParse = require('body-parser')
const fs =require('fs');
const ejs = require('ejs'); // 외부 모듈로 설치해야한다. npm i ejs

const app = express();
const port = 3000;
const router = express.Router();


app.use(bodyParse.urlencoded({extended:false}));

router.route('/login').post((req, res) => {
    fs.readFile('./ejs1.ejs', 'utf8', (err, data) =>{
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {'content-type':'text/html'});
            res.end(ejs.render(data)); // html로 변환 
        }
    })
})

app.use('/', router);

app.all('*',(req, res) => { 
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>')
})

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중 ...`);
})