const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));

// http://127.0.0.1:3000/mail
router.route('/mail').get((req, res) => {
    fs.readFile('mail.html', 'utf8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data);
        }
    });
});

router.route('/mail').post((req, res) => {
    const userid = req.body.userid;
    const sendemail = req.body.sendemail;
    const touserid = req.body.touserid;
    const toemail = req.body.toemail;
    const title = req.body.title;
    const content = req.body.content;

    const fmtfrom = `${userid}<${sendemail}>`;
    const fmtto = `${touserid}<${toemail}>`;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'nrewq1122@gmail.com',
            pass : '앱 비밀번호'
        },
        host: 'smtp.mail.com',
        port: '465'
    });

    const mailOptions = {
        from: fmtfrom,
        to: fmtto,
        subject: title,
        text: content
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
    });
});

app.use('/', router);

app.all('*', (req, res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
});

app.listen(port, () => {
    console.log(`${port}포트로 서버 실행중 ...`);
});