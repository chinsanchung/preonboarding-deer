# Deer-subject

원티드x위코드 백엔드 프리온보딩 6번째 과제입니다.

## 제출 기업 정보

- 기업명 : 디어코퍼레이션
- 주요 서비스 사이트: [디어코퍼레이션](https://web.deering.co/)

## 과제 : 디어코퍼레이션 요금 계산 API

### [과제 안내]

디어는 사용자의 요금을 계산하기 위해 다양한 상황을 고려합니다.

- 우선 지역별로 다양한 요금제를 적용하고 있습니다. 예를 들어 건대에서 이용하는 유저는 기본요금 790원에 분당요금 150원, 여수에서 이용하는 유저는 기본요금 300원에 분당요금 70원으로 적용됩니다.
- 할인 조건도 있습니다. 사용자가 파킹존에서 반납하는 경우 요금의 30%를 할인해주며, 사용자가 마지막 이용으로부터 30분 이내에 다시 이용하면 기본요금을 면제해줍니다.
- 벌금 조건도 있습니다. 사용자가 지역 바깥에 반납한 경우 얼마나 멀리 떨어져있는지 거리에 비례하는 벌금을 부과하며, 반납 금지로 지정된 구역에 반납하면 6,000원의 벌금을 요금에 추과로 부과합니다.
- 예외도 있는데, 킥보드가 고장나서 정상적인 이용을 못하는 경우의 유저들을 배려하여 1분 이내의 이용에는 요금을 청구하지 않고 있습니다.

최근에 다양한 할인과 벌금을 사용하여 지자체와 협력하는 경우가 점점 많아지고 있어 요금제에 새로운 할인/벌금 조건을 추가하는 일을 쉽게 만드려고 합니다. 어떻게 하면 앞으로 발생할 수 있는 다양한 할인과 벌금 조건을 기존의 요금제에 쉽게 추가할 수 있는 소프트웨어를 만들 수 있을까요?

우선은 사용자의 이용에 관한 정보를 알려주면 현재의 요금 정책에 따라 요금을 계산해주는 API를 만들어주세요. 그 다음은, 기능을 유지한 채로 새로운 할인이나 벌금 조건이 쉽게 추가될 수 있게 코드를 개선하여 최종 코드를 만들어주세요.

### [개발 요구사항]

**주요 고려 사항은 다음과 같습니다.**

- 요금제가 사용자 입장에서 합리적이고 이해가 쉬운 요금제라면 좋을 것 같아요.
- 앞으로도 할인과 벌금 조건은 새로운 조건이 굉장히 많이 추가되거나 변경될 것 같아요.
- 가장 최근의 할인/벌금 조건의 변경은 '특정 킥보드는 파킹존에 반납하면 무조건 무료' 였습니다.

**이용에는 다음과 같은 정보들이 있습니다.**

---

```
use_deer_name (사용자가 이용한 킥보드의 이름)
use_end_lat, use_end_lng (사용자가 이용을 종료할 때 위도 경도)
use_start_at, use_end_at (사용자가 이용을 시작하고 종료한 시간)
```

**데이터베이스에는 킥보드에 대해 다음과 같은 정보들이 있습니다.**

---

```
deer_name (킥보드의 이름으로 고유한 값)
deer_area_id (킥보드가 현재 위치한 지역의 아이디)
```

**데이터베이스에는 지역에 대해 다음과 같은 정보들이 있습니다.**

---

```
area_id (지역 아이디로 고유한 값)
area_bounday (지역을 표시하는 MySQL spatial data로 POLYGON)
area_center (지역의 중심점)
area_coords (지역의 경계를 표시하는 위도, 경도로 이루어진 점의 리스트)
```

**데이터베이스에는 파킹존에 대해 다음과 같은 정보들이 있습니다.**

---

```
parkingzone_id (파킹존 아이디로 고유한 값)
parkingzone_center_lat, parkingzone_center_lng (파킹존 중심 위도, 경도)
parkingzone_radius (파킹존의 반지름)
```

**데이터베이스에는 반납금지구역에 대해 다음과 같은 정보들이 있습니다.**

---

```
forbidden_area_id (반납금지구역 아이디로 고유한 값)
forbidden_area_boundary (반납금지구역을 표시하는 MySQL spatial data로 POLYGON)
forbidden_area_coords (반납금지구역의 경계를 표시하는 위도, 경도로 이루어진 점의 리스트)
```

## 조원

| 이름         | 외부링크                                                                                                                                        | 담당 기능                                                        |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 이현준(조장) | [깃허브](https://github.com/lhj0621)/[블로그](https://supiz.tistory.com/)                                                                       | 총괄, 킥보드 대여, 반납, 이용내역 목록조회, 상세조회, 배포       |
| 김태련       | [깃허브](https://github.com/nojamcode)/[블로그](https://velog.io/@code-link)                                                                    | 회원가입, 로그인, 인증, 이벤트 생성, 이벤트 조회                 |
| 신영학       | [깃허브](https://github.com/yhshin0)/[블로그](https://nbkw.tistory.com/)                                                                        | 회원가입, 로그인, 인증, 유저 테스트                              |
| 임유라       | [깃허브](https://github.com/BangleCoding)/[블로그](https://banglecoding.github.io/)                                                             | 회원가입, 로그인, 인증, 이벤트 DB설계, 초기데이터 구성           |
| 이기범       | [깃허브](https://github.com/gibson-lee93)/[블로그](https://mysterious-laborer-518.notion.site/Gibson-s-Notion-2dd7f598fba64f1c9806cded5b4b83a0) | 킥보드 대여, 반납, 이용내역 목록조회, 상세조회, 이벤트 수정      |
| 정진산       | [깃허브](https://github.com/chinsanchung)/[블로그](https://chinsanchung.github.io/)                                                             | 킥보드 대여, 반납, 이용내역 목록조회, 상세조회, 이벤트 조건 검증 |

---

## 개발 환경

- 언어: TypeScript
- 프레임워크: NestJs
- 데이터베이스: AWS-MySql
- 라이브러리: typeorm, passport, passport-jwt, bcrypt, class-validator, class-transformer, moment

---

## ERD

![디어코퍼레이션 ERD](https://user-images.githubusercontent.com/57168321/142719190-3f0dda31-26b1-4aef-8cd1-49750ed7ae34.PNG)

---
## 초기 데이터

최대한 실제와 비슷한 환경을 만들기 위해서 실제 지역의 좌표를 구해 지역 POLYGON 데이터를 구성하였습니다.


| 개포동 | 논현동 | 대치동 | 도곡동 | 삼성동 |
| :----: | :----: | :----: | :----: | :----: |
| ![image](https://user-images.githubusercontent.com/42320464/142741535-6540a6e6-52dc-4ad2-9df0-8743c6e53308.png)       |![image](https://user-images.githubusercontent.com/42320464/142741641-4fa897b6-a8ae-429d-bfec-88176571aeb3.png)       | ![image](https://user-images.githubusercontent.com/42320464/142741671-4dd66d28-94ff-47c2-8e7f-4ac8984bd071.png)       | ![image](https://user-images.githubusercontent.com/42320464/142741733-14f40665-30dd-4e07-95bd-0d93b4b5c670.png)     | ![image](https://user-images.githubusercontent.com/42320464/142741756-7d210ae8-fdac-464d-99df-0e0e1058a82c.png)       |

| 세곡동 | 수서동 | 신사동 | 압구정동 | 역삼동 |
| :----: | :----: | :----: | :------: | :----: |
| ![image](https://user-images.githubusercontent.com/42320464/142741792-ddf53b90-0a3a-4c11-a0f0-bf0863598a80.png)       |  ![image](https://user-images.githubusercontent.com/42320464/142741807-d99b41fb-4233-4117-8526-8651d2d2872b.png)      |  ![image](https://user-images.githubusercontent.com/42320464/142741827-6defbd3d-83b2-4e13-8d87-23474ef7526b.png)      | ![image](https://user-images.githubusercontent.com/42320464/142741844-1297d005-7329-4f67-9564-20bc711a3b67.png)         | ![image](https://user-images.githubusercontent.com/42320464/142741855-c4457fc3-18bc-4ccd-b3f1-28e778be7156.png)       |



---
## 구현 기능

### 회원가입

- bcrypt의 단방향 암호화로 입력받은 비밀번호를 암호화하여 저장했습니다.
- class-validator으로 입력 값의 유효성을 검사해 회원가입에서 발생가능한 오류를 줄였습니다.
- 유저 아이디 중복 체크를 통해 동일한 아이디로 가입을 하지 않도록 했습니다.

### 로그인, 로그인 인증

- passport 으로 로그인 과정에서 보안을 유지합니다.
- 로그인 성공 시 유저 인증을 위한 JWT(Json Web Token)이 발급됩니다.

### 이벤트

- 이벤트 대상에 적용할 조건을 condition 이라는 컬럼에 저장하고, 이후 요금을 계산할 때 활용합니다. condition 의 형식은 useMin > 10 과 같은 형식으로만 등록하도록 검증하는 과정을 거칩니다.
- 이벤트 사용여부를 업데이트 합니다.
- 이벤트 전체 조회를 할 수 있습니다.
- 반납시 조건에 맞게 적용가능한 이벤트를 찾아 기본요금에 할인 또는 벌금을 적용하여 최종요금을 계산합니다.
- 기능을 유지한 채로 새로운 할인이나 벌금 조건이 쉽게 추가될 수 있게 이벤트 추가 기능을 설계했습니다.
- 이벤트를 보다 쉽게 적용하기 위해, 이벤트 대상과 조건을 엄격하게 정의했습니다. 예를 들자면 "이용 시간이 10분 이상", "금지 구역에 주차", "특정 지역에서 이용한 경우" 처럼 양식을 지정하여 오류를 방지하고, 이벤트 작성의 편의성을 높였습니다.

### 이용내역

- 사용자가 킥보드를 대여하거나 반납했던 내역을 저장합니다.

#### 이용내역 - 대여

- 사용자가 킥보드를 대여하면 대여시작 시각을 이용내역에 저장합니다.

#### 이용내역 - 반납

- 사용자가 킥보드를 반납하면 대여한 킥보드의 정보를 조회하여, 해당 장소의 위도와 경도를 이용해 지정한 지역 또는 파킹존에 반납했는지, 아니면 금지 구역에 반납했는지를 확인합니다
- 사용 시간에 따라 요금을 부과하며, 주차한 장소 등 등록한 이벤트를 통해 할인 또는 벌금을 적용합니다.

---

## API 문서

<!-- TODO -->

API 테스트를 위한 방법을 [POSTMAN document](https://documenter.getpostman.com/view/15323948/UVJWqKhp)에서 확인하실 수 있습니다.

## 배포

<!-- TODO -->

Heroku를 이용해 배포를 진행했으며, 사이트의 주소는 [https://pocky-deer-subject.herokuapp.com/](https://pocky-deer-subject.herokuapp.com/) 입니다.

## 설치 및 실행 방법

### 공통

**로컬에서는 준비한 데이터를 활용할 수 없기 때문에 로컬 환경에서 실행은 권장하지 않습니다.**

1. 최상위 폴더에 `.env` 파일에 `JWT_SECRET`에 임의의 문자열을 작성해 저장합니다.
1. `npm install`으로 패키지를 설치합니다.
1. 테스트
   - 개발일 경우: `npm run start`으로 `localhost:3000`에서 테스트하실 수 있습니다.
   - 배포일 경우: `npm run build`으로 애플리케이션을 빌드합니다. 그리고 `npm run start:prod`으로 실행합니다.
1. POST `localhost:3000/user`에서 `user_id`, `password`를 입력해 유저를 생성합니다.
1. POST `localhost:3000/user/signin`에 `user_id`, `password`을 입력하신 후 결과값으로 accessToken을 발급받습니다.
1. 대여나 반납 등 권한이 필요한 API의 주소를 입력한 후, Headers 의 Authorization에 accessToken을 붙여넣어 권한을 얻은 후 API를 호출합니다.


## 폴더 구조
```
+---src
|   |   app.controller.spec.ts
|   |   app.controller.ts
|   |   app.module.ts
|   |   app.service.ts
|   |   main.ts
|   |
|   +---auth
|   |   |   auth.module.ts
|   |   |   auth.service.ts
|   |   |   get-user.decorator.ts
|   |   |
|   |   +---auth-guard
|   |   |       jwt-auth.guard.ts
|   |   |
|   |   \---strategies
|   |           jwt.strategy.ts
|   |
|   +---deer
|   |       deer.module.ts
|   |       deer.service.ts
|   |
|   +---entities
|   |       area.entity.ts
|   |       deer.entity.ts
|   |       event.entity.ts
|   |       forbidden_area.entity.ts
|   |       history.entity.ts
|   |       parkingzone.entity.ts
|   |       user.entity.ts
|   |
|   +---event
|   |   |   event.controller.ts
|   |   |   event.module.ts
|   |   |   event.repository.ts
|   |   |   event.service.ts
|   |   |
|   |   \---dto
|   |           create-event.dto.ts
|   |           update-event.dto.ts
|   |
|   +---history
|   |   |   history.controller.ts
|   |   |   history.module.ts
|   |   |   history.repository.ts
|   |   |   history.service.ts
|   |   |
|   |   \---dto
|   |           create-history.dto.ts
|   |           query-history.dto.ts
|   |           update-history.dto.ts
|   |
|   \---user
|       |   user.controller.ts
|       |   user.module.ts
|       |   user.service.spec.ts
|       |   user.service.ts
|       |
|       \---dto
|               create-user.dto.ts
|               sign-in.dto.ts
|   .eslintrc.js
|   .gitignore
|   .prettierrc
|   nest-cli.json
|   package-lock.json
|   package.json
|   Procfile
|   README.md
|   tsconfig.build.json
|   tsconfig.json
```
