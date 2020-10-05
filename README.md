# javascript-w5-accountbook

J083 박인서

## 진행사항

- [x] DB 설계
- [x] API 설계
- [x] express 환경 구축
- [x] docker mysql 생성
- [x] 클라이언트, 서버 통신

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

### /transactions/breakdown?month=month&category=all

- GET (해당 월의 거래내역 가져오기)

### /transactions/breakdown?month=month&category=income

- GET (해당 월의 수입 거래내역 가져오기)

### /transactions/breakdown?month=month&category=expenditure

- GET (해당 월의 지출 거래내역 가져오기)
