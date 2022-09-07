module.exports = (app, fs) => { 
    app.get('/', (req, res) => {
        console.log('modile1.js 실행')
        res.render('index.ejs', {
            length:10
        })
    })

    app.get('/about', (req, res) => {
        res.render('about.html');
    })

    app.get('/list', (req, res) => {
        // __dirname : 현재 디렉토리
        // 최상단/data폴더/파일이름
        fs.readFile(__dirname + "/../data/member.json", "utf-8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                console.log(data);
                res.writeHead(200, {'content-type':'text/json;charset=utf-8'});
                res.end(data);
            }
        });
    })

    // 변수로 사용할수있다
    app.get('/getMember/:userid', (req, res) => {
        fs.readFile(__dirname + "/../data/member.json", "utf-8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                // JSON.parse()스트링 데이터를 자바스크립스 객체형태 (JSON)형태로 변환해준다
                // JSON 포멧으로 되어 있는 문자열을 JSON 객첼 변환 => JSON.parser(String 문자열)

                // JSON.stringify()
                // JSON 객체를 JSON 포멧의 문자열로 변환
                // JSON.stringify(JSON 객체)
                const member = JSON.parse(data);
                res.json(member[req.params.userid])
                // res.json() json형태로 리스폰스 해준다
            }
        });
    });

    app.post('/joinMember/:userid', (req, res) => {
        // 자바 스크립트는 상수여도 안의 요소가 바뀌는 것은 허용한다. 단 아예 새로운 값이 들어가는 건 불가능 하다.
        const result = {}; 
        const userid = req.params.userid;
        // password가 빠졌다면, name이 빠졌다면 == 데이터가 없다면
        if(!req.body["password"] || !req.body["name"]){
            result["code"] = 100; // 100 : 실패로 임의로 지정
            result["msg"] = "매개변수가 전달되지 않음"; 
            res.json(result);
            return false; // 더 이상 진행되지 않게 막음 
        }
        
        fs.readFile(__dirname + "/../data/member.json", "utf8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                const member = JSON.parse(data);
                if(member[userid]){
                    result["code"] = 101; // 101 : 중복된 아이디 (임의로 지정)
                    result["msg"] = "중복된 아이디";
                    res.json(result);
                    return false;
                }
                console.log(req.body);
                member[userid] = req.body;
                // json파일에 추가해줌 
                // JSON 객체를 JSON 포멧의 문자열로 변환해야한다
                // JSON.stringify(객체, 버퍼사용여부, 띄어쓰기 처리 방법)
                fs.writeFile(__dirname + "/../data/member.json", JSON.stringify(member, null, '\t'),
                'utf8', (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        result["code"] = 200; // 200 : 성공 (임의로 지정)
                        result["msg"] = "회원가입 성공";
                        res.json(result);
                    }
                });


            }
        })
    })

}