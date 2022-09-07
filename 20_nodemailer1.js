// npm i nodemailer
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user: 'nrewq1122@gmail.com',
        pass : '앱 비밀번호'
        // 구글 정책 변경으로 구글 앱 비밀번호를 생성후 사용해야함 
    },
    host : 'smtp.mail.com',
    prot: '465'
});

const mailOption = {
    from : '박민수<nrewq1122@gmail.com>',
    to : '박민수<mystparkkorea@gmail.com>',
    subject: 'node.js로 보내는 메일',
    html: "<h2>안녕하세요. node.js로 보내는 메일입니다.<h2><p style='font-size: 15px; color: deeppink;'>css도 적용됩니다</p>"
};

transporter.sendMail(mailOption, (err, info) => {
    if(err){
        console.log(err);
    }else{
        console.log(info)
    }
});