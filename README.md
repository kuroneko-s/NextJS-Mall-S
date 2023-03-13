# 정말 작은 Shop

기능 구현에 중점을 둔 프로젝트

기능 구현 목록

1. 로그인 ( 연계는 네이버, 카카오만 )
2. ironsession 사용
3. SWR
4. 페이지 최소한으로( 어차피 디자인하고 그런건 다 똑같음 한 페이지에 품목 보여주고 값을 DB에서 처리하는 방식. 새로 추가됬을 때 즉시 보여주도록 하는 게 중요함 디자인도 simple.css 사용)
5. 구매했을 경우 이를 관리자 탭에서 확인할 수 있는 관리자 페이지 분리

그러면 총 페이지는 4개

- [x] 로그인 페이지
  - 네이버, 카카오 로그인 (DB저장은 안함)
- [x] 메인 & 상품 볼 수 있는 페이지
  - 메인에다가 상품정보만 띄워주면 끝
  - 장바구니에 넣으면 state로 관리되게끔
- [x] 상품 상세 페이지
  - 장바구니에 넣으면 state로 관리되게끔
- [x] 구매 페이지
  - state로 관리하고 있는 값을 이용해서 보여주고 정리하고 그렇게 되게끔
    - 네이버 페이는 가맹점이 아니면 개발용으로도 못하게 해놓은듯
    - 카카오 페이 진행
  - 가끔 쿠키가 남아서 장바구니가 남아있긴 한데 오류인지 뭔지 몰라서 일단 보류
- [ ] 관리자 페이지 (관리자만 걸러내는 작업 필요)
  - kakao는 USER, naver는 ADMIN 계정으로 취급
  - 값을 기반으로 그래프로 그려줘야 하는데 DB 연결을 안하고 있어서 그냥 랜덤값으로 그리는걸로 끝.

---

### 로그인 페이지

연계로 로그인되고 로그인 유지를 연계쪽한테 맡길 예정  
reactForm 써서 빨리 구현하는게 목적  
-> fetch 써서 API쪽한테 그냥 완전히 맡기느라 SWR & ironSession 만 사용함

---

### 메인 & 상품 목록 페이지

그냥 쫙 나열해서 이미지 하나 / 가격 / 장바구니 끝  
이미지 - Image 사용하는 거  
장바구니는 쿠키 저장하는거  
 -> 장바구니를 쿠키로 관리하니깐 변동에 유동적이지가 않아서 state 관리로 변경

---

### 상품 상세 페이지

이미지 하나 그냥 크게 보여주고 가격 / 장바구니 / 구매하기 끝  
설명 필요없어 안적어

---

### 관리자 페이지

상품 구매한 사람 정보 보여주고 무슨 물건이 얼만큼 팔렸는지 그래프로 그려서 보여줌 ( 라이브러리 씀 )  
끝

서버로 돌아야하는데 이거 express 써서 REST API 간단하게 돌아가게만 할거임

ERD 구성

- 유저
- 관리자
- 상품
- 주문내역

유저 상품 = many to zero  
유저 주문내역 = many to one  
주문했을 때 주문내역 추가할 때 상품에 대한 키값을 전부 넘겨준다.  
주문내역 상품 = many to zero

---

라이브러리 링크  
github = https://github.com/kuroneko-s/TS-Small-PJ-S  
simple.css = https://github.com/kevquirk/simple.css/wiki/Getting-Started-With-Simple.css  
ironSession = https://github.com/vvo/iron-session  
SWR = https://swr.vercel.app/docs/getting-started
react-modal = http://reactcommunity.org/react-modal/styles/transitions/
nextJS-middleware = https://nextjs.org/docs/advanced-features/middleware
apexcharts = https://apexcharts.com/

---

기존 것 백업

# 쇼핑몰 및 관리자 관리 페이지 작성

쇼핑몰 NextJS로 만드는 저장소

### 기반 코드 - TS-small-PJ-F = https://github.com/kuroneko-s/TS-Small-PJ-F.git

### 참고 사이트 - Ridibooks = https://ridibooks.com/ebook/recommendation

작성 페이지 목록

## PUBLIC SITE

- [ ] login ( 로그인 )
  - DB, KAKAO, NAVER 3종류 지원
- [ ] register ( 회원가입 )
  - DB, KAKAO, NAVER 3종류 지원
- [ ] main ( 메인 )
  - 리디북스 화면 참조
- [ ] item List ( 상품 리스트 )
  - 리디북스 화면 참조
- [ ] item Dtl ( 상품 상세 )
  - 리디북스 화면 참조
- [ ] 장바구니
  - 리디북스 화면 참조
- [ ] 구매
  - DB, KAKAO PAY 지원
  - 리디북스 화면 참조
- [ ] 구매 성공
  - 리디북스 화면 참조
- [ ] 구매 실패
  - 리디북스 화면 참조

## ADMIN SITE

- [ ] dashboard
  - 그래프랑 판매 항목들 지원

## 기술 스택

DB - mongoDB + prisma ( 업무에선 MariaDB나 MYSQL 같은걸 자주 써서 NOSQL 사용 )
FE - NextJS.React
BE - NextJS
Design - tailwindcss = https://tailwindcss.com/
모바일 화면 지원 여부 - [x] ( 추후 작업 완료 후 판단 )
ERD - ??? 첨부파일 관련 정도 말곤 필요없을거 같은데

react-motion써서 애니메이션 적극 활용
다크모드 적용

---

수정하면 될 것들

- [ ] 로그인 유지할건지 말건지 정할 수 있게 해줌.
