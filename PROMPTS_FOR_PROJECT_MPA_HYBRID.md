# 쿠폰 어드민 프론트엔드 개발을 위한 프롬프트 (MPA 하이브리드 방식)

이 문서는 AI 코딩 어시스턴트에게 순서대로 입력하여 '쿠폰 어드민' 프론트엔드를 **MPA 하이브리드 (HTMX 사용)** 방식으로 완성하기 위한 프롬프트 모음입니다.

---

## 1단계: 프로젝트 계획 및 MPA 하이브리드 기반 구축

### Prompt 1-1: 프로젝트 초기 계획

"'쿠폰 발송 관리 어드민' 웹사이트의 프론트엔드를 **MPA 하이브리드 방식**으로 개발하고 싶어. 페이지 이동 시 깜빡임이 없도록 HTMX 라이브러리를 사용할 거야.

**1. 핵심 페이지:** `index.html` (로그인), `sendCoupon.html` (발송등록), `sendQuery.html` (발송조회), `sendCs.html` (C/S)

**2. 기술 스택:** `HTML`, `CSS`, `JavaScript`, `Bootstrap 5`, `Font Awesome`, `Flatpickr`, `xlsx.js`, **`HTMX`**

이 계획을 바탕으로 기본적인 프로젝트 파일 구조와 초기 코드를 생성해 줘."

### Prompt 1-2: MPA 하이브리드 기반 구축

"이전 계획에 따라 MPA 하이브리드 방식의 기반을 구축해 줘.

**1. 기본 파일 구조:**
   - `index.html`, `sendCoupon.html`, `sendQuery.html`, `sendCs.html` 파일을 생성하고, 각 파일은 완전한 HTML 문서 구조를 갖게 해줘.
   - `css/style.css`와 `js/main.js` 파일을 만들고 모든 HTML에 연결해줘.

**2. HTMX 설정:**
   - 모든 HTML 파일의 `<head>`에 HTMX 라이브러리 CDN 스크립트를 추가해줘.
   - 모든 HTML 파일의 `<body>` 안에, 페이지 내용이 교체될 메인 영역으로 `<main id="content" class="container-fluid mb-5 px-4"></main>`을 만들어줘.

**3. 공통 헤더/푸터 설정:**
   - `partials/header.html`과 `partials/footer.html`을 만들어줘. 푸터에는 `&copy; 2024 Your Company Name.` 문구를 넣어줘.
   - `header.html`의 네비게이션 링크(`<a>`)에 `hx-get`, `hx-target="#content"`, `hx-select="#content"`, `hx-push-url="true"` 속성을 추가해서 부분 새로고침이 동작하도록 설정해줘.
   - `js/main.js`에 모든 페이지가 로드될 때 `header.html`과 `footer.html`을 동적으로 삽입하는 코드를 작성해줘."

---

## 2단계: 페이지별 상세 기능 구현

### Prompt 2-1: 발송등록 페이지 - 레이아웃 및 JS 초기화

"`sendCoupon.html` 파일의 `<main id="content">` 내부에 발송등록 페이지의 UI를 만들어줘. (UI 상세: 기본정보, 발송정보, 상품정보, 발송항목, 수신자정보, MMS미리보기, 저장/취소 버튼 등)

그리고 `js/sendCoupon.js` 파일을 만들고, 이 페이지의 기능들(flatpickr, 글자수 카운터, 이벤트 리스너 등)을 초기화하는 `initSendCoupon()` 함수를 작성해줘.

마지막으로, `js/main.js`에 HTMX가 페이지 내용을 교체한 후에(`htmx:afterSwap` 이벤트) 페이지에 맞는 초기화 함수(`initSendCoupon`, `initSendQuery` 등)를 호출하는 로직을 추가해줘."

### Prompt 2-2: 발송등록 페이지 - 동적 기능 추가

"`initSendCoupon()` 함수 내부에 다음 동적 기능들을 구현해줘.

1.  **간편등록:** 휴대폰 번호 유효성 검사 (100건 제한)
2.  **대량등록:** 엑셀 파일 유효성 검사 (20,000건 제한)
3.  **상품 검색:** '검색' 버튼 클릭 시 상품 목록 모달 표시 및 선택 기능
4.  **탭 전환:** '간편등록'/'대량등록' 탭 전환 시 데이터가 있으면 경고창 표시
5.  **저장/발송:** 모든 필수 항목 유효성 검사 후 확인(confirm) 창 표시
6.  **취소:** 내용이 있을 경우 확인 모달 표시 후 페이지 새로고침"

---

## 3단계: 다른 페이지 구현 및 개선

### Prompt 3-1: 발송조회 페이지 - 기능 구현

"`sendQuery.html`의 `<main id="content">` 내부에 발송조회 페이지 UI를 만들고, `js/sendQuery.js`에 `initSendQuery()` 함수를 만들어 아래 기능들을 구현해줘.

1.  **기본 레이아웃:** 조회 조건(발송일, 고객사, 이벤트명)과 결과 테이블 영역
2.  **무한 스크롤:** 스크롤 시 다음 데이터 10개씩 로딩 및 스피너 표시
3.  **입력창 클리어 버튼:** 텍스트 입력 시 'X' 버튼 표시 및 클릭 시 내용 삭제
4.  **테이블 정렬:** 헤더 클릭 시 오름차순/내림차순 정렬 및 아이콘(▲/▼) 표시
5.  **상세보기 모달:** '보기' 버튼 클릭 시 상세 내역 모달 표시, 모달 내 검색 및 엑셀 다운로드 기능 추가"

### Prompt 3-2: 전환 효과 추가

"HTMX로 페이지를 전환할 때 부드러운 페이드인/아웃 효과를 추가하고 싶어.

HTMX가 제공하는 `htmx-swapping` 클래스를 활용해서, `#content` 영역의 `opacity`를 조절하는 CSS 코드를 `css/style.css`에 추가해줘."