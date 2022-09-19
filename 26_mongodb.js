const express = require('express');
const bodyparser = require('body-parser');
const MongoCliend = require('mongodb').MongoClient;

const app = express();
const router = express.Router();
const port = 3000;

let database; // 몽고디비 연결 객체

app.use(bodyparser.urlencoded({extended:false}));

app.use("/", router);

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

app.listen(port, () => {
    console.log(`${port}포트로 서버 동작중 ... `);
    connectDB();
});