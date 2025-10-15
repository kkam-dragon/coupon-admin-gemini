# AI 어시스턴트를 활용한 MPA 하이브리드 웹 개발 가이드 (HTMX 최종판)

## 1️⃣ 개요

이 문서는 **MPA(Multi-Page Application)** 구조의 안정성과 **SPA(Single Page Application)** 의 부드러운 사용자 경험을 동시에 구현하기 위해,
**HTMX** 라이브러리를 활용한 **MPA 하이브리드 방식** 개발 절차를 안내합니다.

목표는 기존 MPA의 SEO 장점을 유지하면서, HTMX의 부분 새로고침 기능을 이용해
페이지 전환 시 발생하는 깜빡임(flash) 문제를 제거하고, 자연스러운 UX를 구현하는 것입니다.

---

## 2️⃣ 단계별 개발 절차 및 프롬프트 전략

### 🔹 Phase 1 — 프로젝트 계획 (Planning)

#### 🎯 목적
- 프로젝트의 핵심 기능 정의
- 기술 스택 선정 및 페이지 구조 확정

#### 💡 프롬프트 예시
> "'쿠폰 발송 관리 어드민' 웹사이트의 프론트엔드를 **MPA 하이브리드 방식**으로 개발하고 싶어.  
> 페이지 이동 시 깜빡임이 없도록 **HTMX**를 사용할 거야.  
>
> **1. 핵심 페이지:**  
> - `index.html` (로그인)  
> - `sendCoupon.html` (발송등록)  
> - `sendQuery.html` (발송조회)  
> - `sendCs.html` (C/S)
>
> **2. 기술 스택:**  
> - HTML, CSS, JavaScript  
> - Bootstrap 5, Font Awesome, Flatpickr, xlsx.js  
> - **HTMX (부분 새로고침용)**  
>
> 이 계획을 바탕으로 기본 폴더 구조와 초기 코드를 만들어줘."

---

### 🔹 Phase 2 — HTMX 기반 프로젝트 구축 (Scaffolding)

#### 🎯 목적
- MPA 구조를 유지한 채 HTMX를 통합
- 공통 헤더/푸터를 분리하고, 페이지 부분 교체 구조를 설정

#### 📂 권장 폴더 구조
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

#### 💡 프롬프트 예시
> "위 구조를 기반으로 HTMX를 적용한 MPA 프로젝트를 세팅해줘.  
> - 모든 HTML에 HTMX CDN 추가  
> - `<main id='content' data-page='sendCoupon'>` 영역을 생성  
> - header/footer는 `partials` 폴더로 분리하고, `fetch()`로 동적 로드  
> - 네비게이션 링크에는 다음 속성 추가:
> ```html
> hx-get="sendCoupon.html"
> hx-target="#content"
> hx-select="#content"
> hx-push-url="true"
> ```"

#### ⚙️ main.js 예시 (중복 로드 방지 포함)
```js
document.addEventListener('DOMContentLoaded', () => {
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

document.body.addEventListener('htmx:afterSwap', () => {
  const page = document.querySelector('main')?.dataset.page;
  if (page === 'sendCoupon') initSendCoupon?.();
  if (page === 'sendQuery') initSendQuery?.();
  if (page === 'sendCs') initSendCs?.();
});
```

---

### 🔹 Phase 3 — 페이지별 기능 구현

#### 🎯 목적
- 각 페이지의 주요 UI 및 JS 초기화 로직 구현
- HTMX로 로드된 페이지에서도 기능 정상 작동 보장

#### 💡 프롬프트 예시
> "`sendCoupon.html` 내부에 발송등록 페이지 UI를 구성하고,  
> `js/pages/sendCoupon.js`에 `initSendCoupon()` 함수를 만들어 flatpickr, 유효성 검사, 이벤트 리스너 등을 초기화해줘.
>
> HTMX가 `#content`를 교체한 후(`htmx:afterSwap`), 페이지 식별자(`data-page`)를 기준으로  
> 올바른 초기화 함수가 실행되도록 설정해줘."

#### 예시 코드
```js
function initSendCoupon() {
  const datePicker = flatpickr('#sendDate', { dateFormat: 'Y-m-d' });

  const input = document.querySelector('#receiverList');
  input.addEventListener('input', () => {
    const count = input.value.split('\n').filter(Boolean).length;
    document.querySelector('#countDisplay').textContent = count + '명';
  });
}
```

---

### 🔹 Phase 4 — UX 및 전환 효과 개선

#### 🎯 목적
- HTMX 전환 시 깜빡임 제거 및 부드러운 화면 전환 구현

#### 💡 프롬프트 예시
> "HTMX 전환 시, `htmx-swapping`과 `htmx-settling` 클래스를 활용해  
> `#content`의 opacity를 조절하는 CSS 전환 효과를 추가해줘."

#### CSS 예시
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

---

## 3️⃣ 추가 가이드라인

### 📘 SEO & HTMX 주의사항
| 항목 | 설명 |
|------|------|
| **SEO 인덱싱** | HTMX는 HTML 응답을 유지하므로 MPA의 SEO 이점 유지 가능 |
| **URL 동기화** | `hx-push-url="true"` 설정 필수 |
| **중복 요청 방지** | `<main>` 내부만 교체되도록 `hx-target`과 `hx-select`를 정확히 지정 |

### 🧩 성능 팁
- 공통 리소스(header/footer)는 최초 한 번만 로드 후 재활용  
- 필요 시 `htmx:beforeSwap` 이벤트에서 preloader 애니메이션 추가 가능

### 🧠 AI 프롬프트 작성 팁
- 명확한 출력 형식 요구: `"Output format: Complete HTML/JS/CSS code blocks"`  
- 불필요한 설명 대신 “실행 가능한 코드 중심”으로 요청  
- 각 단계별 결과를 AI에게 순차적으로 입력하여 오류 최소화

---

## ✅ 결론

HTMX 기반 MPA 하이브리드 구조는  
**SEO + 안정성 + 부드러운 전환 UX**를 모두 달성할 수 있는 현실적이고 강력한 접근 방식입니다.

특히 Bootstrap과 결합하면 최소한의 코드로도 관리가 용이하며,  
AI 코딩 어시스턴트와 함께라면 비개발자도 체계적인 프론트엔드 구축이 가능합니다.
