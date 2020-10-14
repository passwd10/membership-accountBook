# javascript-w5-accountbook

J083 박인서

## FE 요구사항

- [x] Observer Pattern 적용
- [x] 라우팅 이용하여 SPA로 동작
- [x] 상태(state)관리
- [x] 거래내용 입력
- [x] 거래내용 출력
- [x] 월별 거래내역 출력
- [x] CSS 적용
- [] 수입/지출 필터링
- [] 거래내역 수정
- [] 거래내역 삭제
- [] 달력
- [] 데이터 시각화 (통계화면)
- [] 캐시를 적용해서 최적화(메모이제이션)
- [] 테스트 코드 구현

## 구현 화면

![Screenshot from 2020-10-15 00-10-02](https://user-images.githubusercontent.com/52442237/96008728-d22e9800-0e7a-11eb-9b41-c22abaeb8758.png)

## DB

![Screenshot from 2020-10-05 13-42-35](https://user-images.githubusercontent.com/52442237/95042862-1ea90380-0716-11eb-9194-39d89f06054e.png)

## APIs

### /signIn

- POST (로그인)

### /signUp

- POST (회원가입)

### /transactions

- POST (거래내역 추가하기)

- PUT (거래내역 수정하기)

- DELETE (거래내역 삭제하기)

### /transactions/breakdown?yearMonth=yearMonth&type=all

- GET (해당 월의 거래내역 가져오기)

### /transactions/breakdown?yearMonth=yearMonth&type=income

- GET (해당 월의 수입 거래내역 가져오기)

### /transactions/breakdown?yearMonth=yearMonth&type=expenditure

- GET (해당 월의 지출 거래내역 가져오기)
