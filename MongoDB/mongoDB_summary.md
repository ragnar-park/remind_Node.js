# MongoDB

### MongoDB의 특징
- NoSQL이기 때문에 관계형 데이터베이스의 테이블 개념이 없음
- 데이터가 모인 하나의 단위를 컬렉션이라고 부름
- 데이터를 정해 놓은 컬럼의 형태로 컬렉션에 넣어야 한다는 제약이 없음
- MongoDB의 데이터베이스는 컬렉션의 집합
- 컬렉션은 여러개의 문서 객체를 가질 수 있음
    예) {"id":1, "userid":"apple", "userpw":"1111" .... }

document -> collection -> database

### document
- RDBMS의 record와 비슷한 개념
- 데이터 구조가 한개 이상의 key-value-pair로 이루어져 있음
- 동적인 스키마를 가지고 있음
- 같은 collection 안에 있는 document끼리 다른 스키마를 가지고 있을 수 있음
    예) {"id":1, "userid":"apple", "userpw":"1111"}
        {"name":"김사과", "gender":"여자"}

### collection
- document의 그룹
- collection 내부에 document들이 위치
- table과 비슷한 개념이지만 RDBMS와 달리 스키마를 따로 가지지 않음

# MongoDB의 문법

### 데이터베이스 확인
```
show dbs;
```

### 데이터베이스 생성
- use 데이터베이스명;
```
use frontend;
```
- 데이터베이스가 없으면 생성, 있으면 선택
- 데이터베이스에 자료가 없을 경우 show dbs에서 나타나지 않음

### 컬렉션 생성
- db.createCollection('컬렉션명');
```
db.createCollection('testCollection');
```

### 컬렉션 확인
```
show collections;
```

### 컬렉션 삭제
```
db.컬렉션명.drop();
db.testCollection.drop();
```

### 연습용 컬렉션 만들기
```
db.createCollection("member");
```

### document 추가
- db.컬렉션명.insert(객체);
```
db.member.insert({'userid':'ronaldo','userpw':'7777'});
db.member.insert({'userid':'messi','name':'메시','gender':'남자'});

db.member.insert({'userid':'haaland','userpw':'9999','name':'홀란드','position':'ST'});
db.member.insert({'userid':'mbappe','userpw':'1010','name':'음바페','position':'LW','score':15});
db.member.insert({'userid':'neymar','userpw':'1234','name':'네이마르','position':'CAM','score':7});
db.member.insert({'userid':'minjae','userpw':'3333','name':'김민재','position':'CB','score':3});
db.member.insert({'userid':'foden','userpw':'4747','name':'포든','position':'LW','score':8});
db.member.insert({'userid':'james','userpw':'2424','name':'제임스','position':'RB','score':12});
db.member.insert({'userid':'degea','userpw':'1111','name':'데헤아','position':'GK','score':0});
```
### document 확인
- db.컬렉션명.find();
```
db.member.find();
```

- db.컬렉션명.find().pretty();
```
db.member.find().pretty();
```

- db.컬렉션명.find(객체).pretty();
```
db.member.find({"userid":"apple"}).pretty();
```
>_id는 각 document의 유일한 키로 쓰이는 값

### document의 비교연산
- $eq : 주어진 값과 일치하는 값을 찾음
- $gt : 주어진 값보다 큰 값을 찾음
- $gte : 주어진 값보다 크거나 같은 값을 찾음
- $lt : 주어진 값보다 작은 값을 찾음
- $lte : 주어진 값보다 작거나 같은 값을 찾음
- $ne : 주어진 값과 일치하지 않는 값을 찾음
- $in : 주어진 배열안에 속하는 값을 찾음
- $nin : 주어진 배열안에 속하지 않는 값을 찾음

### 포인트가 700이상인 멤버를 검색
```
db.member.find({"point":{$gte:700}}).pretty();
```

### document의 논리연산
- $and : 주어진 모든 조건이 true일 때 true인 결과를 찾음
- $or : 주어진 조건 중 하나라도 true일 때 true인 결과를 찾음
- $not : 주어진 조건이 false일 때 true, true일 때 false인 결과를 찾음

#### 아이디가 "minjae" 이고 비밀번호가 "3333"인 멤버를 검색 
```
db.member.find({$and:[{'userid':'minjae'},{'userpw':'3333'}]}).pretty()
```

- 두개 이상의 조건이 있을 경우 배열임으로 [ ] 안에 감싸준다.
- mongoDB는 객체로 값을 찾는다. 
- 객체는 무조건 중괄호 { 으로 시작해야 한다. 조건도 포함하여 { } 으로 감싸준다.


>예제

1. 이름이 "홀란드"인 멤버를 검색
```
db.member.find({'name':'홀란드'}).pretty()
```
2. 스코어가 8보다 작거나 같은 멤버를 검색 
```
db.member.find({'score':{$lte:8}}).pretty()
```
3. 아이디가 "mbappe" 또는 "james"인 멤버를 검색 
```
db.member.find({$or:[{'userid':'mbappe'},{'userid':'james'}]}).pretty()
```
4. 포지션이 LW이고 스코어가 12점이상인 멤버를 검색 
```
db.member.find({$and:[{'position':'LW'},{'score': {$gte:12}}]}).pretty()
```





