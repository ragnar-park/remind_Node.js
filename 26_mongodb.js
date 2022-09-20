const express = require('express');
const bodyparser = require('body-parser');
const MongoCliend = require('mongodb').MongoClient;

const app = express();
const router = express.Router();
const port = 3000;

let database; // 몽고디비 연결 객체

app.use(bodyparser.urlencoded({extended:false}));

// REST 만들기
// 회원가입
// http://127.0.0.1/member/regist(post)
router.route('/member/regist').post((req, res) =>{
    console.log('/member/regist 호출!');
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name; 
    const gender = req.body.gender;

    console.log(`userid: ${userid}, userpw:${userpw}, name:${name}, gender:${gender}`)

    // database가 만들어졌으면 통과
    if(database){
        joinMember(database, userid, userpw, name, gender, (err, result) => {
        if(err){
            res.writeHead('200', {'content-type':'text/html;charset=utf8'});
            res.write('<h2>회원가입 실패</h2>');
            res.write('<p>오류가 발생했습니다.</p>');
            res.end();
        }else{
            if(result.insertedCount > 0){
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원 가입 성공</h2>');
                res.write('<p>가입이 성공적으로 완료 되었습니다.</p>');
                res.end();
            }else{
                res.writeHead('200', {'content-type':'text/html;charset=utf8'});
                res.write('<h2>회원가입 실패</h2>');
                res.write('<p>회원가입에 실패하였습니다.</p>');
                res.end();
            }
        }
        });
    }else{
        res.writeHead('200', {'content-type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.write('<p>mongodb 데이터베이스에 연갈하지 못했습니다.</p>');
        res.end();
    }
} )



const joinMember = function(database, userid, userpw, name, gender, callback) {
    console.log('joinMember 호출!'); 
    const members = database.collection('member'); // 연결된 데이터베이스에 member 컬렉션 객체를 담는다. 
    //insertMany : mongodb에 배열 형태로 저장
    members.insertMany([{userid : userid, userpw : userpw, name : name, gender : gender}] , (err, result) => {
        if(err){
            console.log(err);
            callback(err, null);
        }else{
            // result.insertedCount : 몇개의 데이터가 들어갔는지 자동으로 저장
            if(result.insertedCount > 0 ){ 
                console.log(`사용자 document ${result.insertedCount}명이 추가 되었습니다.`)
            }else{
                console.log(' 사용자 document 추가되지 않았습니다.');
            }
            callback(null, result);
        }
    }); // 컬렉션에 데이터 객체를 저장한다. 


}

// mongodb 연결 함수
function connectDB(){
    const databaseURL = "mongodb://localhost:27017";
    MongoCliend.connect(databaseURL, (err , db) => {
        if(err){
            console.log(err);
        }else{
            const temp = db.db('frontend');
            database = temp; 
            console.log('mongodb 데이터베이스 연결 성공!');
        }
    }); 
}


app.use("/", router);

app.listen(port, () => {
    console.log(`${port}포트로 서버 동작중 ... `);
    connectDB();
});