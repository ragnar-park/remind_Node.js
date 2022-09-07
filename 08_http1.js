const http = require('http')

// 서버 생성 
// 리퀘스트 리스너, 리스폰스 객체
// 사용자 입력 객체 , 서버가 사용자에게 전달하는 객체
http.createServer((req, res) => {
    // 스테이터스 코드 전달 200 -> 정상적인 상태
    res.writeHead(200, {'content-type':'text-type'}); // 응답 header를 구성
    res.end("<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><title>http 모듈 테스트</title></head><body><h2>http 모듈 테스트</h2><p>처음으로 실행하는 Node.js http 서버</p></body></html>"); // 응답 body를 작성 
    // html을 구성 하는 것 
    // 추후에는 html을 문자열이 아닌 파일을 넣는다
}).listen(3000, () => {
    console.log('3000번 포트로 서버 실행중....')
})
