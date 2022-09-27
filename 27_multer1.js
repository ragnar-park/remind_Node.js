// multer 모듈 
// 파일을 업로드하기 위한 익스프레스 미들웨어 
// destination: 파일을 저장할 디렉토리 설정
// filename : 파일이름 설정

// multer 생성자에 객체로 멀터 설정을 한다.
const express = require('express');
const bodyParse = require('body-parser');

// 특정 폴더를 요청에 의해 직접 파일에 접근할 수 있도록 기능을 제공하는 익스프레스 미들웨어
// 페이지외에 리소스(이미지 등)의 URL을 사용자 임의로 가상에 디렉토리를 생성
const static = require('serve-static'); 
// npm i multer 
const multer = require('multer');
const path = require('path');

// npm i morgan
// 로그를 관리하기 위한 별도의 라이브러리 모듈
const logger = require('morgan'); // 사용자가 접속할때마다 로그를 남겨주는 모듈

const port = 3000;

const app = express();
const router = express.Router();

app.use(bodyParse.urlencoded({extended:false}));
// 설정한 URL과 매칭 시켜 준다. 
// public폴더에 직접 접근할수 있게 한다.
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use(logger('dev')); // 개발자 모드로 로그가 출력

// 멀터 설정
const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename: (req, file, callback) => {  // ronaldo.jpg
        const extension = path.extname(file.originalname); // .jpg
        const basename = path.basename(file.originalname, extension); // ronaldo
        callback(null, basename + "_" + Date.now() + extension) ; // ronaldo_현재시간.jpg

    }
});

const upload = multer({
    storage : storage,
    // 제한을 건다
    limits : {
        files : 1, // 파일의 개수
        fileSize: 1024 * 1024 * 100 // 100mb로 파일 크기 지정
    }
}); 

// 파일을 여러개 받을수 있음으로 array로 처리
router.route('/write').post(upload.array('photo', 1), (req, res) => {
    try{
        const files = req.files; 
        console.dir(req.files[0]);

        let originalname = '';
        let filename = '';
        let mimetype = '';
        let size = 0;

        if(Array.isArray(files)){
            console.log(`클라이언트에서 받아온 파일 개수 : ${files.length}`);
            for(let i=0; i<files.length; i++){
                originalname = files[i].originalname;
                filename = files[i].filename;
                mimetype = files[i].mimetype;
                size = files[i].size;
            }
        }

        const title = req.body.title;

        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>이미지 업로드 성공</h2>');
        res.write('<hr/>');
        res.write(`<p>제목 : ${title}</p>`);
        res.write(`<p>원본파일명 : ${originalname}</p>`);
        res.write(`<p>현재파일명 : ${filename}</p>`);
        res.write(`<p>MimeType : ${mimetype}</p>`);
        res.write(`<p>파일크기 : ${size}</p>`);
        res.write(`<p><img src='/uploads/${filename}' width=200> </p>`);
        res.end();
    }catch(e){
        console.log(e);
    }
});

app.use('/', router);
app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중 ...`)
})