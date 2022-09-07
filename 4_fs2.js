const fs = require('fs');
const data = 'Hello Node.js !!';

fs.writeFile('text3.txt',data,'utf-8', (err) => {
    if(err){
    console.log(err)
    }else{
        console.log('비동기식으로 파일저장')
    }
})

// 동기식은 콜백으로 에러를 잡을 수 없다
fs.writeFileSync('text2.txt', data, 'utf-8');
console.log('동기식으로 파일 저장')