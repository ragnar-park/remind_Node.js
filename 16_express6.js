const express = require('express')
const bodyParse = require('body-parser')
const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParse.urlencoded({extended:false}));

router.route('/member/login').post((req, res) => {
    console.log('/member/login 호출!');
})

router.route('/member/regist').post((req, res) => {
    console.log('/member/regist 호출!');
})

router.route('/member/about').get((req, res) => {
    console.log('/member/about 호출 !');
})

// 모든 페이지
app.all('*',(req, res) => {
    // 404에러 코드 발생시 
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>')
})

// '/'으로 시작하는 경로 처리
app.use('/', router);

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중 ...`);
})