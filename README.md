# 프리온보딩 백엔드 과정 6번째 과제: 디어코퍼레이션

[디어코퍼레이션](https://web.deering.co)에서 제공해주신 API 설계 과제입니다. 헤로쿠를 이용해 배포했으며, 주소는 [https://pocky-deer-subject.herokuapp.com](https://pocky-deer-subject.herokuapp.com)입니다.

## 과제에 대한 안내

1. 필수 요구 사항

- 사용자의 이용에 관한 정보를 알려주면 현재의 요금 정책에 따라 요금을 계산해주는 API 를 제작합니다.
- 사용자의 요금을 계산하기 위해 다양한 상황을 고려합니다.
  - 지역별로 다양한 요금제를 적용하고 있습니다. 예를 들어 건대에서 이용하는 유저는 기본요금 790원에 분당요금 150원, 여수에서 이용하는 유저는 기본요금 300원에 분당요금 70원으로 적용됩니다.
  - 할인 조건도 있습니다. 사용자가 파킹존에서 반납하는 경우 요금의 30%를 할인해주며, 사용자가 마지막 이용으로부터 30분 이내에 다시 이용하면 기본요금을 면제해줍니다.
  - 벌금 조건도 있습니다. 사용자가 지역 바깥에 반납한 경우 얼마나 멀리 떨어져있는지 거리에 비례하는 벌금을 부과하며, 반납 금지로 지정된 구역에 반납하면 6,000원의 벌금을 요금에 추과로 부과합니다.
  - 예외도 있는데, 킥보드가 고장나서 정상적인 이용을 못하는 경우의 유저들을 배려하여 1분 이내의 이용에는 요금을 청구하지 않고 있습니다.
- 기능을 유지한 채로 새로운 할인이나 벌금 조건이 쉽게 추가될 수 있게 코드를 개선합니다.

2. 개발 요구사항

- 요금제가 사용자 입장에서 합리적이고 이해가 쉬운 요금제라면 좋을 것 같아요.
- 앞으로도 할인과 벌금 조건은 새로운 조건이 굉장히 많이 추가되거나 변경될 것 같아요.
- 가장 최근의 할인/벌금 조건의 변경은 '특정 킥보드는 파킹존에 반납하면 무조건 무료' 였습니다.

---

## 데이터베이스 ERD

![데이터베이스 ERD](https://user-images.githubusercontent.com/57168321/142719190-3f0dda31-26b1-4aef-8cd1-49750ed7ae34.PNG)

---

## 초기 데이터

- 최대한 실제와 비슷한 환경을 만들기 위해서 실제 지역의 좌표를 구해 데이터를 구성하였습니다.
- 금지 구역은 공원, 학교, 아파트와 같은 곳을 지정하였으며, 파킹 존은 지하철역, 버스정류장 근처로 지정하였습니다.

### 지역

|                                                     개포동                                                      |                                                     논현동                                                      |                                                     대치동                                                      |                                                     도곡동                                                      |                                                     삼성동                                                      |
| :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| ![image](https://user-images.githubusercontent.com/42320464/142741535-6540a6e6-52dc-4ad2-9df0-8743c6e53308.png) | ![image](https://user-images.githubusercontent.com/42320464/142741641-4fa897b6-a8ae-429d-bfec-88176571aeb3.png) | ![image](https://user-images.githubusercontent.com/42320464/142741671-4dd66d28-94ff-47c2-8e7f-4ac8984bd071.png) | ![image](https://user-images.githubusercontent.com/42320464/142741733-14f40665-30dd-4e07-95bd-0d93b4b5c670.png) | ![image](https://user-images.githubusercontent.com/42320464/142741756-7d210ae8-fdac-464d-99df-0e0e1058a82c.png) |

|                                                     세곡동                                                      |                                                     수서동                                                      |                                                     신사동                                                      |                                                    압구정동                                                     |                                                     역삼동                                                      |
| :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| ![image](https://user-images.githubusercontent.com/42320464/142741792-ddf53b90-0a3a-4c11-a0f0-bf0863598a80.png) | ![image](https://user-images.githubusercontent.com/42320464/142741807-d99b41fb-4233-4117-8526-8651d2d2872b.png) | ![image](https://user-images.githubusercontent.com/42320464/142741827-6defbd3d-83b2-4e13-8d87-23474ef7526b.png) | ![image](https://user-images.githubusercontent.com/42320464/142741844-1297d005-7329-4f67-9564-20bc711a3b67.png) | ![image](https://user-images.githubusercontent.com/42320464/142741855-c4457fc3-18bc-4ccd-b3f1-28e778be7156.png) |

### 금지구역

|                                                      예시1                                                      |                                                      예시2                                                      |
| :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| ![image](https://user-images.githubusercontent.com/42320464/142741935-500d1785-a4bd-489e-b155-aa927bd8704b.png) | ![image](https://user-images.githubusercontent.com/42320464/142741975-6ce9bc4f-9356-48f9-891e-a541bb66db04.png) |

### 파킹존

|                                                      예시1                                                      |                                                      예시2                                                      |
| :-------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------: |
| ![image](https://user-images.githubusercontent.com/42320464/142742041-61b455ad-eb4e-4d79-b958-e7240ea05cab.png) | ![image](https://user-images.githubusercontent.com/42320464/142742045-5b003f7c-05c4-4926-9ecc-5c2b5edca97e.png) |

---

## 개발 환경

- 언어: TypeScript
- 데이터베이스: AWS RDS for MySQL
- 사용 도구: NestJs, typeorm, passport, passport-jwt, bcrypt, class-validator, class-transformer, date-fns, date-fns-tz

---

## API 문서

포스트맨으로 작성한 [API 문서](https://documenter.getpostman.com/view/18317278/UVJhEFaW)에서 상세한 내용을 확인하실 수 있습니다.

---

## 실행 방법

**로컬에서는 준비한 데이터를 활용할 수 없기 때문에 로컬 환경에서 실행은 권장하지 않습니다.**

1. `git clone` 으로 프로젝트를 가져온 후, `npm install` 으로 필요한 패키지를 설치합니다.
2. 루트 디렉토리에 .env 파일을 생성하고, 임의의 문자열 값을 가진 `JWT_SECRET`을 작성합니다. 그리고 AWS RDS for MySQL 을 위한 `DB_HOST`, `DB_PASS`, `DB_USER`, `DB`, `DB_PORT`를 작성합니다.
3. 개발 환경일 때는`npm run start:dev`으로, 배포 환경일 때는 `npm run build`으로 빌드한 후 `npm run start:prod`을 입력하시면 로컬에서 테스트하실 수 있습니다.
4. POST `localhost:3000/users`에서 `user_id`, `password`를 입력해 유저를 생성합니다.
5. POST `localhost:3000/users/signin`에 `user_id`, `password`을 입력하신 후 결과값으로 accessToken을 발급받습니다.
6. 대여나 반납 등 권한이 필요한 API의 주소를 입력한 후, Headers 의 Authorization에 accessToken을 붙여넣어 권한을 얻은 후 API를 호출합니다.

---

## 수행한 작업

### 킥보드 대여 및 반납

#### 킥보드 대여하기

[history.service.ts](https://github.com/chinsanchung/preonboarding-deer/blob/main/src/history/history.service.ts)의 메소드입니다.

```typescript
async function createRentalHistory(
  createHistroyDto: CreateHistroyDto,
  user: User
): Promise<{ message: string; history_id: number; use_start_at: Date }> {
  const deer = await this.deerService.findOneById(createHistroyDto.deer_name);
  const history = this.historyRepository.create({
    user,
    deer,
  });
  try {
    const { history_id, use_start_at } = await this.historyRepository.save(
      history
    );
    return { message: '대여가 완료 되었습니다.', history_id, use_start_at };
  } catch (error) {
    throw new InternalServerErrorException();
  }
}
```

- 킥보드의 정보와 로그인을 한 유저로 이용 내역을 생성해 킥보드를 대여합니다.

#### 킥보드 반납하기

[history.repository.ts](https://github.com/chinsanchung/preonboarding-deer/blob/main/src/history/history.repository.ts)의 메소드입니다.

##### 1. 도입부

```typescript
async function findOneHistory(id: number, user: User): Promise<History> {
  try {
    const history = await this.findOneOrFail({ history_id: id, user });
    return history;
  } catch (err) {
    throw new NotFoundException('유효한 요청이 아닙니다.');
  }
}

async function updateReturnHistory(
  id: number,
  updateHistroyDto: UpdateHistroyDto,
  user: User
): Promise<{ history: History; sendData?: any }> {
  let sendData: any = {};
  let price = 0;
  const { latitude, longitude } = updateHistroyDto;

  const use_end_at = utcToZonedTime(new Date(), 'Asia/Seoul');

  const history = await this.findOneHistory(id, user);

  if (history.use_end_at) {
    throw new BadRequestException('이미 반납된 요청입니다.');
  }
  history.use_end_at = use_end_at;
  // ...
}
```

- 이용 내역의 존재 여부를 `findOneHistory` 메소드를 이용해 검증합니다.
  - `findOneOrFail` 메소드로 존재하지 않으면 에러를 응답으로 보냅니다.
- `new Date()`, [date-fns-tz](https://www.npmjs.com/package/date-fns-tz)의 `utcToZonedTime`으로 반납 시간 `use_end_at`을 구합니다.
  - date-fns-tz 를 사용하는 이유: 미국 서버를 이용하는 헤로쿠로 배포했을 때, `new Date()`는 UTC+0 시간대를 적용합니다. 따라서 한국 시간대인 데이터베이스의 대여 시간과 비교를 위해서 이 라이브러리를 사용했습니다.
- 이용 내역에서 `use_end_at` 컬럼의 값이 존재하는지 확인합니다. 존재할 경우 이미 반납한 요청입니다.

##### 2. 이용 시간을 확인하여 요금 계산하기

```typescript
const { base_price, min_price } = history.deer.area;
const useMin = this.getTimeDiff(history.use_start_at, use_end_at);

//사용시간 1분 이상일때
if (useMin >= 1) {
  price = base_price + min_price * useMin;
} else {
  history.price = price;
  return { history };
}

//환승 30분 이내일때
if (this.checkTransfer(user, history)) {
  price = min_price * useMin;
}

history.price = price;
```

- `getTimeDiff` 메소드로 몇 분을 이용했는지를 확인합니다. [date-fns](https://date-fns.org/)에서 지원하는 `differenceInMinutes`으로 반납 시간과 대여 시간을 빼서 총 이용 시간을 구합니다.

  ```typescript
  function getTimeDiff(start_at: Date, end_at: Date) {
    return differenceInMinutes(end_at, start_at);
  }
  ```

- 이전에 킥보드를 이용하고 30분 이내에 다시 이용해 반납했는지 확인하여, 그럴 경우 기본 요금을 적용하지 않습니다.

  ```typescript
  async function checkTransfer(user: User, history: History) {
    const previousHistory = await this.findOne({
      where: {
        user,
        use_end_at: Not(IsNull()),
      },
      order: {
        history_id: 'DESC',
      },
    });

    if (!previousHistory) {
      return false;
    }

    return (
      this.getTimeDiff(history.use_start_at, previousHistory.use_end_at) <= 30
    );
  }
  ```

- 지역을 등록할 떄 설정한 기본 가격, 1분당 가격 그리고 총 이용시간으로 요금을 계산합니다.

##### 3. 올바른 구역에 주차했는지를 확인하기

```typescript
const historyQuery = await this.createQueryBuilder('history')
  .where('history_id = :id', { id })
  .leftJoin('history.deer', 'deer')
  .leftJoin('deer.area', 'area')
  .leftJoin('area.parkingzones', 'parkingzone')
  .leftJoin('area.forbidden_areas', 'forbidden_area')
  .addSelect(
    'SUM(ST_Contains(area.area_boundary, ST_GeomFromText(:p)))',
    'isInArea'
  )
  .addSelect(
    'SUM(ST_DISTANCE(ST_GEOMFROMTEXT(ST_ASTEXT(parkingzone.parkingzone_center_coord), 4326), ST_GEOMFROMTEXT(:p, 4326)) < parkingzone.parkingzone_radius)',
    'isInParkingzone'
  )
  .addSelect(
    'SUM(ST_Contains(forbidden_area.forbidden_area_boundary, ST_GeomFromText(:p)))',
    'isInForbiddenArea'
  )
  .groupBy('history_id')
  .setParameters({
    p: `POINT (${latitude} ${longitude})`,
  })
  .execute();

const { isInArea, isInParkingzone, isInForbiddenArea } = historyQuery[0];
sendData = {
  ...history,
  useMin,
  isInArea: Number(isInArea),
  isInParkingzone: Number(isInParkingzone),
  isInForbiddenArea: Number(isInForbiddenArea),
};
return { history, sendData };
```

- `leftJoin`을 이용해 이용 내역으로부터 킥보드, 지역, 주차 구역, 금지 구역의 정보를 한꺼번에 불러옵니다. 그 결과 지역 내의 주차 구역, 금지 구역의 개수만큼 데이터가 늘어납니다.
- MySQL 에서 지원하는 Spatial Relation Functions 으로 요청한 위도, 경도(킥보드의 주차 위치)와 특정 위치(지역, 주차 구역, 금지 구역)을 비교합니다. 특정 위치 안에 킥보드가 있으면 1(true), 아니면 0(false)을 리턴합니다. 그리고 `SUM`, `groupBy`를 이용해 그 결과를 합칩니다.
  - [ST_Contains](https://dev.mysql.com/doc/refman/5.6/en/spatial-relation-functions-object-shapes.html#function_st-contains): `ST_Contains(g1, g2)`은 g1 이 g2 에 포함하면 1을 아니면 0을 리턴합니다.
  - [ST_GeomFromText](https://dev.mysql.com/doc/refman/8.0/en/gis-wkt-functions.html#function_st-geomfromtext): WKT representation 과 SRID(spatial reference system identifier) 를 이용해 기하학 값을 구성합니다.
    - [Well-Known Text 포맷](https://dev.mysql.com/doc/refman/8.0/en/gis-data-formats.html#gis-wkt-format): WKT representation 기하학 값은 기하학 데이터를 아스키 폼으로 교환하기 위해 고안된 것입니다.
    - [Spatial Reference system IDentifier](https://docs.microsoft.com/ko-kr/sql/relational-databases/spatial/spatial-reference-identifiers-srids?view=sql-server-ver15): 비교할 대상 g1, g2 의 SRID 를 같은 값으로 해야 함수의 기능을 수행할 수 있습니다. `4326`은 일반적으로 사용하는 SRID 로, 지구 표면의 경도 및 위도 좌표를 사용하여 공간 데이터를 나타내며, 이는 GPS(Global Positioning System)에도 사용됩니다. [출처: cockroachlabs](https://www.cockroachlabs.com/docs/stable/srid-4326.html)
  - [ST_DISTANCE](https://dev.mysql.com/doc/refman/5.6/en/spatial-relation-functions-object-shapes.html#function_st-distance): `ST_Distance(g1, g2)`은 g, g2 사이의 거리를 리턴합니다. 이 거리와 금지 구역의 반지름을 비교하여 거리가 더 짧으면 금지 구역 내에 주차한 것으로 간주합니다.
- isInArea 값이 1 이상이면 지역에 주차한 것이고, isInParkingzone 또는 isInForbiddenArea 값이 1이면 킥보드가 주차/금지 구역에 주차한 것입니다.

##### 4. 등록한 이벤트로 요금 할인 또는 벌금 적용하기

[history.service.ts](https://github.com/chinsanchung/preonboarding-deer/blob/main/src/history/history.service.ts)로 다시 돌아옵니다.

```typescript
async function updateReturnHistory(
  id: number,
  updateHistroyDto: UpdateHistroyDto,
  user: User
) {
  const { history, sendData } =
    await this.historyRepository.updateReturnHistory(
      id,
      updateHistroyDto,
      user
    );
  if (sendData) {
    history.price = await this.eventSevice.calculatePrice(sendData);
  }
  return await this.historyRepository.saveHistory(history);
}
```

- history 레포지토리의 `updateReturnHistory` 메소드로 얻은 결과를 [event.service.ts](https://github.com/chinsanchung/preonboarding-deer/blob/main/src/event/event.service.ts)의 `calculatePrice` 메소드로 전달해 요금을 다시 계산합니다.

```typescript
async function eventConditionList(): Promise<Event[]> {
  return await this.eventRepository.find({
    where: {
      is_use: 1,
    },
    order: { plus_minus: 'DESC' },
  });
}
async function calculatePrice(data: any): Promise<number> {
  const eventList = await this.eventConditionList();
  let price = data.price;
  for (const el of eventList) {
    const ifConditon = `data.${el.condition}`;
    if (eval(ifConditon)) {
      if (el.plus_minus == '할인') {
        price = price * (1 - el.applied_number);
      } else {
        price = price + el.applied_number;
      }
    }
  }
  return price;
}
```

- `eventConditionList`로 현재 진행중인 이벤트(`is_use: 1`)를 할인, 벌금 순으로 조회하여 가져옵니다.
- 가져온 이벤트들을 for 반복문을 돌려 이용 내역에 저장했던 요금에 적용합니다.
- 마지막으로 history 레포지토리의 `saveHistory` 로 이용 내역을 갱신합니다.

  ```typescript
  async function saveHistory(history: History): Promise<History> {
    try {
      return await this.save(history);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
  ```

### 이용 내역의 목록 조회하기

```typescript
// history.controller.ts
const limit = queryHistoryDto.limit ? Number(queryHistoryDto.limit) : 10;
const offset = queryHistoryDto.page
  ? (Number(queryHistoryDto.page) - 1) * limit
  : 0;
return this.historyService.getHistoryList(user, limit, offset);
```

컨트롤러는 URI 쿼리로부터 pagination 에 필요한 값을 받고, 그것을 가공하여 `getHistoryList` 메소드로 전달합니다.

```typescript
// history.service.ts
async function getHistoryList(
  limit: number,
  offset: number
): Promise<{ history: History[]; count: number }> {
  const [history, count] = await this.historyRepository.findAndCount({
    where: { user },
    take: limit,
    skip: offset,
  });
  return { count, history };
}
```

`findAndCount` 메소드로 전체 이용 내역의 개수, 이용 내역 목록을 가져옵니다.

### 이벤트 조건 검증하기

[event.service.ts](https://github.com/chinsanchung/preonboarding-deer/blob/main/src/event/event.service.ts)에 작성한 메소드입니다.

이벤트 조건은 `isInParkingzone > 0`(주차 구역에 정차한 이벤트)같이 문자열으로 저장하기로 했는데, 조건을 양식에 맞게 정확히 작성을 해야 이벤트를 활용할 때 오류가 발생하지 않습니다.

오류가 발생하지 않도록, 조건의 검증을 정규표현식으로 수행하기로 했습니다.

```typescript
function checkConditionValidate(condition: string): boolean {
  /**
   * 1. 처음은 무조건 영어(변수명)으로 시작합니다. 이벤트 대상은 "가격", "지역 아이디", "이용 시간", "지역에 주차", "주차장에 주차", "금지구역 주차"으로 고정합니다.
   * 그 다음 반드시 띄어쓰기를 합니다.(\s)
   * 2. 연산자는 >=, >, <=, <, ==, != 만 가능합니다.
   * 그 다음 반드시 띄어쓰기를 합니다.(\s)
   * 3. 마지막은 반드시 숫자로 끝맺습니다.
   */
  const regex =
    /^(price|deer.area.area_id|useMin|isInArea|isInParkingzone|isInForbiddenArea)\s(>=|>|<=|<|==|!=)\s[0-9]+$/;
  if (condition.match(regex)) {
    return true;
  }
  return false;
}
```

- `^`: 문장의 처음을 뜻합니다.
- `(문자|문자)`: 특정 문자 값들을 나열하는데, 이 값들이 존재해야 true 를 리턴합니다.
- `\s`: 띄어쓰기 공백입니다.
- `[0-9]`: 숫자 값을 의미합니다.
- `+`: 앞의 표현식이 1회 이상 반복하는 것입니다. 위의 경우 1개든 2개든 숫자 값이면 true 를 리턴합니다.
- `$`: 문장의 마지막을 뜻합니다.

---

## 코드 리펙토링

두 항목 모두 [history.repository.ts](https://github.com/chinsanchung/preonboarding-deer/blob/main/src/history/history.repository.ts)에서 리펙토링했습니다.

### 반납 시간을 계산하는 과정

```typescript
// 이전 코드
function getTimeDiff(start_at, end_at) {
  const use_start_at = moment(start_at).tz('Asia/Seoul');
  const use_end_at = moment(end_at).tz('Asia/Seoul');

  return use_end_at.diff(use_start_at, 'minutes');
}
async function updateReturnHistory() {
  // ...
  const use_end_at = new Date();
  // ...
}
```

```typescript
// 수정한 코드
function getTimeDiff(start_at: Date, end_at: Date) {
  return differenceInMinutes(end_at, start_at);
}
async function updateReturnHistory() {
  // ...
  const use_end_at = utcToZonedTime(new Date(), 'Asia/Seoul');
  // ...
}
```

- 시간 계산을 [moment-timezone](https://momentjs.com/timezone) 대신 [date-fns](https://date-fns.org)으로 변경했습니다. 빌드했을 때의 용량을 줄이고, 계산 속도를 높이기 위해서입니다.
- 미국 서버를 이용하는 헤로쿠로 배포했을 때, `new Date()`는 UTC+0 시간대를 적용합니다. 따라서 한국 시간대인 데이터베이스의 대여 시간과 비교를 위해서 [date-fns-tz](https://www.npmjs.com/package/date-fns-tz) 라이브러리로 반납 시간 `use_end_at`을 구했습니다.

### findOneHistory 메소드

```typescript
// 이전 코드
const history = await this.findOne({
  history_id: id,
  user,
});
if (!history) {
  throw new NotFoundException('유효한 요청이 아닙니다.');
}
return history;
```

```typescript
// 수정한 코드
try {
  const history = await this.findOneOrFail({ history_id: id, user });
  return history;
} catch (err) {
  throw new NotFoundException('유효한 요청이 아닙니다.');
}
```

- 존재하지 않으면 에러를 띄우는 `findOneOrFail` 메소드로, 이용 내역이 존재하는지 확인하는 조건문을 제거해 코드의 양을 줄였습니다.

---

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
