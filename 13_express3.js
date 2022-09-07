const express = require('express');
const app = express()
const port = 3000;

// 미들웨어는 서로 다른 애플리케이션이 서로 통신하는 데 사용되는 소프트웨어
app.use((req, res) => {
    console.log('첫번째 미들웨어 실행')
    res.redirect('https://naver.com')
})

app.listen(port, () => {
    console.log(`${port} 포트로 서버 실행중...`)
})