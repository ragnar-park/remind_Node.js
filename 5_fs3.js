const fs = require('fs');

// 동기식을 예외처리를 해야함
try{
    // 동기식으로 데이터를 읽어옴
    const text = fs.readFileSync('text111.txt','utf-8');
}catch(e){
    console.log('동기식으로 파일 읽기 실패')
}

console.log('프로그램을 종료합니다.')