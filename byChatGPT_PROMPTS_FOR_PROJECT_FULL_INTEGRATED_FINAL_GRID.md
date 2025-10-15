# 쿠폰 어드민 프롬프트 (기능 + 디자인 완성형 / HTMX 기반 - Bootstrap Grid 명시 버전)

이 문서는 '쿠폰 발송 관리 어드민' 프로젝트를 **기능 + 디자인 통합형 HTMX 하이브리드 방식**으로 구현하기 위한 완성 프롬프트 세트입니다.  
AI 코딩 어시스턴트에게 단계별로 입력하면 **SPA 수준의 UX + MPA 안정성 + 완성된 디자인 시스템 + Bootstrap Grid 구조**가 결합된 웹 어드민 UI가 생성됩니다.

---

## 🧩 1️⃣ 프로젝트 개요

**목표:**  
- MPA 구조의 안정성과 SEO 호환성을 유지하면서 SPA 수준의 부드러운 UX 구현  
- HTMX를 이용해 페이지 일부(`main#content`)만 교체 (partial reload)  
- Bootstrap 5 기반의 12열 Grid System(`row` + `col-md-*`)을 사용하여 반응형 UI 구성  
- 통일된 디자인 시스템 기반의 카드형 어드민 UI 구축  

---

## 🎨 2️⃣ 공통 디자인 시스템 (Design Tokens)

| 항목 | 값 |
|------|------|
| **기본 폰트** | "Inter", "Noto Sans KR", sans-serif |
| **배경색** | `#F9FAFB` |
| **기본 텍스트 색** | `#374151` |
| **보조 텍스트 색** | `#6B7280` |
| **브랜드 기본색 (Primary)** | `#2563EB` |
| **보조색 (Secondary)** | `#4B5563` |
| **위험색 (Danger)** | `#EF4444` |
| **카드 배경색** | `#FFFFFF` |
| **카드 스타일** | `border-radius: 0.75rem; box-shadow: 0 2px 5px rgba(0,0,0,0.08);` |
| **폰트 크기** | base: 16px / heading: 1.25rem / small: 0.875rem |
| **여백 기준 단위** | `1.5rem` (약 24px) |
| **버튼 스타일** | `btn-primary`: 파란색 배경, 흰색 텍스트 / `btn-outline`: 투명 배경, 파란색 테두리 |
| **입력 필드** | focus 시 `border-color: #2563EB`, transition 0.15s |
| **모달 디자인** | 반투명 검정 배경, 카드형 내부 레이아웃 |
| **반응형 기준** | 768px 이하 → 1열 구조(`col-12`) 자동 전환 |

---

## 🧱 3️⃣ 프로젝트 파일 구조

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

---

## ⚙️ 4️⃣ HTMX 설정 및 초기 로드 로직

### 🔸 설정 요약
- 모든 HTML의 `<head>`에 HTMX CDN 추가  
- `<main id="content" data-page="..."></main>` 구조 유지  
- `partials/header.html`의 모든 링크에 다음 속성 부여:
  ```html
  hx-get="sendCoupon.html"
  hx-target="#content"
  hx-select="#content"
  hx-push-url="true"
  ```

### 🔸 `js/main.js` 기본 로직
```js
document.addEventListener('DOMContentLoaded', () => {
  // Header/Footer 최초 1회만 로드
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

// HTMX 페이지 전환 후 초기화
document.body.addEventListener('htmx:afterSwap', () => {
  const page = document.querySelector('main')?.dataset.page;
  if (page === 'sendCoupon') initSendCoupon?.();
  if (page === 'sendQuery') initSendQuery?.();
  if (page === 'sendCs') initSendCs?.();
});
```

---

## 🧭 5️⃣ 페이지별 구성 및 프롬프트

### 📦 (1) 발송등록 페이지 — `sendCoupon.html`

**목표:**  
쿠폰 발송 정보를 등록하고 MMS 미리보기, 수신자 목록을 관리하는 UI/UX 구성.

**레이아웃 구조 (Bootstrap Grid 포함):**  
- 전체를 `row`로 감싸고, **왼쪽은 7칸(`col-md-7`)**, **오른쪽은 5칸(`col-md-5`)** 구성.  
- 768px 이하 화면에서는 자동으로 1열(`col-12`) 전환.  
- 좌측: 발송 기본정보 + 상품정보 + 발송항목 카드  
- 우측: MMS 미리보기 + 수신자 등록(간편/대량) + 발송 버튼  

**UI 디자인 포인트:**  
- 카드형 섹션 구분 (`card` 클래스)  
- 카드 헤더: 진한 텍스트(#111827), 하단선(#E5E7EB)  
- input focus 시 파란색 테두리 강조 (#2563EB)  
- 각 폼 아래에 설명(`text-muted small`) 추가  
- 저장 버튼은 화면 하단 오른쪽 고정, hover 시 밝아짐  

**기능 프롬프트 요약:**  
> "`sendCoupon.html`의 `<main>` 영역에 위 Bootstrap Grid 구조와 UI를 구성하고,  
> Flatpickr로 발송일시 선택 기능을 넣어줘.  
> 상품 검색은 모달로 띄워 선택 시 자동 입력되게 해줘.  
> 탭 전환(`간편등록`/`대량등록`)은 데이터 손실 시 경고창을 띄워줘."

**Output format:** HTML + JS + CSS blocks

---

### 📊 (2) 발송조회 페이지 — `sendQuery.html`

**목표:**  
쿠폰 발송 내역을 검색, 정렬, 상세조회할 수 있는 UI 구성.

**구성 요소:**  
- 상단 카드: 필터 (날짜, 이벤트명, 고객사) + 검색 버튼  
- 하단 카드: 결과 테이블 + 페이징  
- 각 행 클릭 시 상세보기 모달 오픈  

**기능 프롬프트 요약:**  
> "`sendQuery.html`의 `<main>` 영역에 위 UI를 구성하고,  
> 스크롤 시 10개 단위로 추가 로드되는 무한스크롤을 구현해줘.  
> 테이블 헤더 클릭 시 정렬 아이콘이 바뀌고 오름/내림차순이 적용되게 해줘.  
> 모달 내부에서 엑셀 다운로드 버튼을 넣어줘."

**Output format:** HTML + JS + CSS

---

### 🧰 (3) C/S 페이지 — `sendCs.html`

**목표:**  
쿠폰 사용/교환 관련 CS를 관리하는 UI 구성.

**디자인 포인트:**  
- 상태별 컬러 배지 (`사용완료`, `미사용`, `교환요청`, `유효기간만료`)  
- 테이블 중앙정렬 + hover 시 강조 효과  
- 상단 필터 바 + 검색창 포함  

**기능 프롬프트 요약:**  
> "`sendCs.html`의 `<main>`에 위 구조를 적용하고,  
> 상태별 필터링, 검색창 자동완성, 모달 CS처리 기능을 구현해줘.  
> 테이블 행 클릭 시 상세보기와 변경 로그를 보여주는 모달을 띄워줘."

**Output format:** HTML + JS + CSS

---

## ✨ 6️⃣ 전환 및 UX 효과

```css
#content.htmx-swapping {
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.35s ease-in;
}
#content.htmx-settling {
  opacity: 1;
  transform: translateY(0);
  transition: all 0.35s ease-out;
}
.card:hover {
  transform: translateY(-2px);
  transition: all 0.2s ease;
}
```

---

## 💡 7️⃣ AI 프롬프트 작성 가이드

| 목적 | 추가 문장 예시 |
|------|----------------|
| 코드 누락 방지 | `Output format: Complete HTML/JS/CSS code blocks` |
| 디자인 유지 요청 | `Keep design tokens and Bootstrap grid layout consistent.` |
| 반응형 요청 | `Make it responsive below 768px (1-column layout).` |
| 페이지 초기화 로직 | `Trigger init functions via htmx:afterSwap event.` |

---

## ✅ 결론

이 프롬프트 세트는 **HTMX 하이브리드 구조 + Bootstrap 5 Grid 시스템 + 디자인 시스템**이 결합된 완성형 개발 지침입니다.  
AI가 이를 바탕으로 일관된 UI, 자연스러운 전환, 반응형 구조를 모두 유지하면서 실제 어드민 웹을 자동 생성할 수 있습니다.
