# 쿠폰 어드민 프론트엔드 개발 프롬프트 (MPA 하이브리드 방식, HTMX 기반)

이 문서는 AI 코딩 어시스턴트에게 순서대로 입력하여  
**'쿠폰 발송 관리 어드민' 프론트엔드**를 **MPA 하이브리드(HTMX 사용)** 방식으로 완성하기 위한 프롬프트 모음입니다.

---

## 🧩 1단계: 프로젝트 계획 및 MPA 하이브리드 기반 구축

### 🧱 Prompt 1-1: 프로젝트 초기 계획

"'쿠폰 발송 관리 어드민' 웹사이트의 프론트엔드를 **MPA 하이브리드 방식**으로 개발하고 싶어.  
페이지 이동 시 깜빡임이 없도록 **HTMX** 라이브러리를 사용할 거야.

**1. 핵심 페이지:**
- `index.html` (로그인)
- `sendCoupon.html` (발송등록)
- `sendQuery.html` (발송조회)
- `sendCs.html` (C/S)

**2. 기술 스택:**  
`HTML`, `CSS`, `JavaScript`, `Bootstrap 5`, `Font Awesome`, `Flatpickr`, `xlsx.js`, **`HTMX`**

이 계획을 바탕으로 기본적인 프로젝트 파일 구조와 초기 코드를 생성해 줘.

📌 **Output format:**
- Complete folder structure  
- Ready-to-run HTML/CSS/JS starter files
"

---

### ⚙️ Prompt 1-2: MPA 하이브리드 기반 구축

"이전 계획에 따라 MPA 하이브리드 방식의 기반을 구축해 줘.

**1. 기본 파일 구조**
```
/ (root)
├─ index.html
├─ sendCoupon.html
├─ sendQuery.html
├─ sendCs.html
├─ partials/
│   ├─ header.html
│   └─ footer.html
├─ css/
│   └─ style.css
└─ js/
    ├─ main.js
    └─ pages/
        ├─ sendCoupon.js
        ├─ sendQuery.js
        └─ sendCs.js
```

**2. HTMX 설정**
- 모든 HTML 파일의 `<head>`에 HTMX CDN 스크립트를 추가.
- `<body>` 안에 교체될 메인 콘텐츠 영역을 생성:
  ```html
  <main id="content" data-page="sendCoupon" class="container-fluid mb-5 px-4"></main>
  ```
  ※ `data-page` 속성은 페이지 식별용.

**3. 공통 헤더/푸터 설정**
- `partials/header.html`과 `partials/footer.html` 파일을 생성.
  - 푸터에는 `&copy; 2024 Your Company Name.` 문구 포함.
  - `header.html`의 네비게이션 링크(`<a>`)에는 아래 속성 추가:
    ```html
    hx-get="sendCoupon.html"
    hx-target="#content"
    hx-select="#content"
    hx-push-url="true"
    ```
- `js/main.js`에는 header/footer를 동적으로 삽입하되 **중복 로드를 방지**하도록 작성.

📌 **Output format:**
- HTML + JS code blocks (runnable, self-contained)
"

---

## 🚀 2단계: 페이지별 상세 기능 구현

### 🧭 Prompt 2-1: 발송등록 페이지 – 기본 레이아웃 및 초기화

"`sendCoupon.html` 파일의 `<main id="content">` 내부에 발송등록 페이지의 UI를 만들어줘.  
UI 구성은 다음과 같아:
- 기본정보
- 발송정보
- 상품정보
- 발송항목
- 수신자정보
- MMS미리보기
- 저장 / 취소 버튼

그 다음 `js/pages/sendCoupon.js` 파일에 `initSendCoupon()` 함수를 만들어,
- `flatpickr` 초기화
- 글자수 카운터
- 이벤트 리스너 등록  
등의 초기 세팅을 담당하도록 작성해 줘.

마지막으로, `js/main.js`에 **HTMX가 페이지 내용을 교체한 후(`htmx:afterSwap`)**  
페이지별 초기화 함수를 자동 호출하도록 코드를 추가해 줘.

📌 **Output format:**
- HTML (UI)
- JS (`initSendCoupon` + `htmx:afterSwap` handler)
"

---

### ⚡ Prompt 2-2: 발송등록 페이지 – 동적 기능 구현

"`initSendCoupon()` 내부에 다음 기능을 구현해줘.

1. **간편등록:** 휴대폰 번호 유효성 검사 (100건 제한)  
2. **대량등록:** 엑셀 파일 유효성 검사 (20,000건 제한)  
3. **상품 검색:** ‘검색’ 버튼 클릭 시 모달 표시 및 선택 기능  
4. **탭 전환:** 데이터가 있을 경우 경고창 표시  
5. **저장/발송:** 필수 항목 유효성 검사 및 확인(confirm) 창  
6. **취소:** 내용이 있을 경우 확인 모달 표시 후 새로고침

📌 **Output format:**
- JS code (`initSendCoupon()` full function)
- Include comments for each numbered feature
"

---

## 🔍 3단계: 다른 페이지 구현 및 UX 개선

### 📊 Prompt 3-1: 발송조회 페이지 – 기능 구현

"`sendQuery.html`의 `<main id="content">` 내부에 발송조회 페이지 UI를 만들어줘.  
`js/pages/sendQuery.js` 파일에 `initSendQuery()` 함수를 생성하고 다음 기능을 구현해.

1. 기본 레이아웃: 조회 조건(발송일, 고객사, 이벤트명) + 결과 테이블  
2. 무한 스크롤: 10개 단위 추가 로딩 + 스피너 표시  
3. 입력창 클리어 버튼 (X 아이콘)  
4. 테이블 정렬: 헤더 클릭 시 오름/내림차순  
5. 상세보기 모달: 상세 내역 + 검색 + 엑셀 다운로드 기능

📌 **Output format:**
- HTML + JS complete example
"

---

### 🎨 Prompt 3-2: 전환 효과 추가 (HTMX 기반)

"HTMX로 페이지를 전환할 때 부드러운 **페이드인/아웃 전환 효과**를 추가해줘.  
`htmx-swapping`과 `htmx-settling` 클래스를 모두 사용해서 자연스럽게 전환되도록 해.

**CSS (`css/style.css`):**
```css
#content.htmx-swapping {
  opacity: 0;
  transition: opacity 300ms ease;
}
#content.htmx-settling {
  opacity: 1;
  transition: opacity 300ms ease;
}
```

**JS (`js/main.js` 내):**
- `DOMContentLoaded` 시점에 `loaded` 클래스 추가
- `htmx:afterSwap` 시 페이지별 `init` 함수 호출

📌 **Output format:**
- CSS + JS combined code block
"

---

## 🧠 추가 가이드 (모듈 구조 및 주석 관리)

**1. main.js 예시 (header/footer 중복 방지 포함)**  
```js
document.addEventListener('DOMContentLoaded', () => {
  // header/footer 1회만 로드
  if (!document.querySelector('header')) {
    fetch('partials/header.html')
      .then(res => res.text())
      .then(html => document.body.insertAdjacentHTML('afterbegin', html));
  }
  if (!document.querySelector('footer')) {
    fetch('partials/footer.html')
      .then(res => res.text())
      .then(html => document.body.insertAdjacentHTML('beforeend', html));
  }
});

// 페이지별 초기화 핸들러
document.body.addEventListener('htmx:afterSwap', () => {
  const page = document.querySelector('main')?.dataset.page;
  if (page === 'sendCoupon') initSendCoupon?.();
  if (page === 'sendQuery') initSendQuery?.();
  if (page === 'sendCs') initSendCs?.();
});
```

---

✅ **요약**
- SPA처럼 부드러운 전환 UX를 유지하면서 SEO에 강한 **MPA 구조**  
- HTMX 기반 하이브리드 방식으로 깜빡임 없이 부분 갱신  
- 페이지별 JS 분리로 유지보수성 강화  
- Header/Footer 중복 로딩 방지  

---

📦 **최종 실행 가이드**
> “위 프롬프트들을 순서대로 AI 코딩 어시스턴트에게 입력하면,  
> 깜빡임 없는 HTMX 기반 MPA 하이브리드 프론트엔드 프로젝트가 자동으로 완성됩니다.”
