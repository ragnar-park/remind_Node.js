// 파일을 다루는 fs 모듈 가져옴
const fs = require('fs'); 

// 비동기 식으로 파일 읽기
// 파일이름, 인코딩 방식, 콜백 함수 
// err : 에러가 발생했을때 에러 객체를 담음
// data : 정상적으로 읽었을때 내용을 다음
fs.readFile('text1.txt','utf-8', (err, data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`비동기식으로 읽음 : ${data}`)
    }
})

// 동기식으로 파일을 읽기
const text = fs.readFileSync('text1.txt','utf-8');
console.log(`동기식으로 읽음 : ${text}`)
