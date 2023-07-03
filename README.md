# 쇼핑 사이트

## 참고 사이트 - 리디북스 (https://ridibooks.com/ebook/recommendation)

---

### 기능 소개

1. 메인 화면에서 상품 확인 기능
2. 특정 상품에 대한 상세 정보 확인 기능
3. 장바구니 기능
4. 구매 (카카오 페이) 기능
5. 해당 상품과 관련된 정보 확인 기능
6. 로그인 기능 (네이버, 카카오 로그인)

---

### 폴더 관리

- atoms : 최소 기능을 담당하는 하나 크기의 컴포넌트.
- molecules : atoms의 집합, 혹은 특정 기능을 담당하는 컴포넌트.
- templates : 동작 흐름이 같은 컴포넌트들의 집합으로 구성. pages에서 사용되기 직전의 컴포넌트.
- pages : nextJS에서 page를 담당하는 폴더. 해당 폴더는 atoms 혹은 molecules의 집합으로 구성.

---

### 시스템 전역

- [ ] 다크모드 (보류)
- [ ] 인터렉티브 디자인 적용 필요 (현재 FHD 기준 고정값 사용) (보류)

---

### 메인 화면

- [x] 메인 화면
  - [x] 회원가입 페이지 이동
  - [x] 로그인 페이지 이동
  - [x] 로그아웃
  - [x] 검색
  - [x] 알림 페이지 이동
  - [x] 카트 페이지 이동
  - [x] 구매이력 페이지 이동
  - [x] 개인정보 페이지 이동
  - [x] 카테고리 페이지 이동
  - [x] 이벤트 이미지 슬라이드
  - [x] 이벤트 화면 이동
  - [x] 이벤트 상세 화면 이동
  - [x] 도서 리스트 슬라이드 (SIX) (FHD 기준)
  - [x] 도서 리스트 슬라이드 (NINE) (FHD 기준)
  - [x] 고객센터 페이지 (미운영)
  - [x] 공지사항 페이지 (미운영)
  - [x] 이용약관 페이지
  - [x] 개인정보 처리방침 페이지 (이용약관 페이지와 같이 사용)
  - [x] 청소년보호정책 페이지 (이용약관 페이지와 같이 사용)
  - [x] 정보 링크 페이지 (깃허브)

---

### 회원가입

- [x] 이메일 회원가입
  - 로그인 화면에서 동일 이메일 기준으로 API 로그인과 동기화 가능

---

### 로그인

- [x] 이메일 로그인
- [x] 카카오 로그인
- [x] 네이버 로그인

---

### 도서 상세보기

- [x] 신간 상품 순위 제공
- [x] 장바구니 기능 제공
- [ ] 이벤트 바로가기 제공 (보류)
- [x] 바로 구매 기능 제공
- [ ] 리뷰 기능 제공 (보류)

---

### 상품 제공자 화면 (출판사, 시리즈)

- [x] 글
- [x] 그림
- [x] 역자
- [ ] 출판사 (보류)
- [ ] 시리즈 (보류)
- [ ] 카테고리 (보류)

- [x] 상품 제공자 상세 정보
- [x] 해당 제공자의 서적 리스트

---

### 장바구니

- [x] 상품 제공
- [x] 상품 삭제
- [x] 구매 기능 제공 (카카오 페이 API)
  - [x] 구매 성공 화면
  - [x] 구매 실패 **화면**
  - [x] 구매 취소 화면

---

### 알림

- [ ] 알림 정보 (보류)
  - soketIO 사용

---

### 구매 내역

- [ ] 구매 내역 정보 (보류)

---

### 프로필

- [ ] 프로필 화면 (보류)

---

### 관리자 화면

- [x] 기능 구현
  - [x] 대시보드
    - [x] 그래프 (일, 주, 월, 연)
    - [ ] 추가 (보류)
    - [ ] 수정 (보류)
    - [ ] 삭제 (보류)
    - [ ] 조회 (보류)

---

### 기술 스택

DB - planetscale(mySql) + ORM(prisma)  
FE - NextJS (React) (TS), tailwindcss  
BE - NextJS (node) (TS)

---

### 테스트 툴

JEST 적용 후 해당 프로젝트 종료 처리.

보류 중인 내용들은 다른 저장소에서 각 기능 연습용으로 구현하고 옮겨 넣던지 할 예정.
