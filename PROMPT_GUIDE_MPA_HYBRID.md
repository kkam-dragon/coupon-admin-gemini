# AI 어시스턴트를 활용한 MPA 하이브리드 웹 개발 가이드 (HTMX)

## 1. 개요

이 문서는 **MPA(Multi-Page Application)** 의 안정적인 구조를 유지하면서도, **HTMX** 라이브러리를 이용해 SPA(Single-Page Application)처럼 부드러운 화면 전환(부분 새로고침)을 구현하는 **"MPA 하이브리드"** 방식의 개발 가이드입니다.

이 방식의 목표는 MPA의 단순성과 SEO 친화성의 장점을 가져가면서, 페이지 이동 시 발생하는 전체 새로고침(깜빡임) 문제를 해결하여 사용자 경험을 극대화하는 것입니다.

---

## 2. 개발 프로세스 및 프롬프트 전략

### Phase 1: 프로젝트 계획 및 요구사항 정의 (Planning)

프로젝트의 목표와 기술 스택을 정의하는 단계입니다. 기존 MPA 방식과 거의 동일하지만, 기술 스택에 `HTMX`를 추가하는 것이 핵심입니다.

#### **💡 초기 프롬프트 예시 (Initial Prompt)**

> **[사용자 프롬프트]**
>
> "'쿠폰 발송 관리 어드민' 웹사이트의 프론트엔드를 **MPA 하이브리드 방식**으로 개발하고 싶어. 페이지 이동 시 깜빡임이 없도록 HTMX 라이브러리를 사용할 거야.
>
> **1. 핵심 페이지:**
>    - `index.html` (로그인), `sendCoupon.html` (발송등록), `sendQuery.html` (발송조회), `sendCs.html` (C/S)
>
> **2. 공통 요구사항:**
>    - 모든 페이지는 공통 헤더와 푸터를 가져야 해.
>    - 페이지 이동은 전체 새로고침 없이, 내용이 바뀌는 부분만 부드럽게 교체되어야 해.
>
> **3. 기술 스택:**
>    - `HTML`, `CSS`, `JavaScript`
>    - `Bootstrap 5`, `Font Awesome`, `Flatpickr`, `xlsx.js`
>    - **`HTMX` (부분 새로고침 라이브러리)**
>
> 이 계획을 바탕으로 기본적인 프로젝트 파일 구조와 초기 코드를 생성해 줘."

---

### Phase 2: 프로젝트 기반 구축 (Scaffolding with HTMX)

MPA 구조를 만들되, HTMX가 동작할 수 있도록 HTML 구조와 링크를 설정하는 가장 중요한 단계입니다.

#### **목표**
- 각 페이지(`sendCoupon.html` 등)에 공통 레이아웃(헤더, 푸터)과 교체될 컨텐츠 영역(`id="content"`)을 정의.
- HTMX 라이브러리를 모든 페이지에 추가.
- 네비게이션 링크에 HTMX 속성을 추가하여 부분 새로고침을 활성화.

#### **💡 기반 구축 프롬프트 예시**

> **[사용자 프롬프트 - HTMX 적용]**
>
> "Phase 1의 계획에 따라 MPA 하이브리드 방식의 기반을 구축해 줘.
>
> **1. 기본 파일 구조:**
>    - `index.html`, `sendCoupon.html`, `sendQuery.html`, `sendCs.html` 파일을 생성해줘.
>    - 각 파일은 `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`를 모두 갖춘 완전한 HTML 문서여야 해.
>    - `css/style.css`와 각 페이지별 `js/sendCoupon.js`, `js/sendQuery.js` 등의 파일을 만들고 연결해줘.
>
> **2. HTMX 설정:**
>    - 모든 HTML 파일의 `<head>`에 HTMX 라이브러리 CDN 스크립트를 추가해줘.
>    - 모든 HTML 파일의 `<body>` 안에, 페이지 내용이 교체될 메인 영역으로 `<main id="content" class="container-fluid mb-5 px-4"></main>`을 만들어줘.
>
> **3. 공통 헤더/푸터 설정:**
>    - `partials/header.html`과 `partials/footer.html`을 만들어줘.
>    - `header.html`의 네비게이션 링크(`<a>`)에 다음 HTMX 속성을 추가해줘:
>      - `hx-get="/sendCoupon.html"`: 클릭 시 해당 URL의 내용을 가져옴
>      - `hx-target="#content"`: 가져온 내용에서 `#content` 부분만 추출함
>      - `hx-select="#content"`: 현재 페이지의 `#content` 영역에 삽입함
>      - `hx-push-url="true"`: 브라우저 주소창의 URL을 변경함
>    - JavaScript를 사용해서, 모든 페이지가 로드될 때 `header.html`과 `footer.html`의 내용을 동적으로 삽입하는 스크립트를 작성해줘."

---

### Phase 3: 페이지별 상세 기능 구현 (Component-by-Component)

각 페이지의 상세 UI와 기능을 구현합니다. HTMX로 내용이 동적으로 로드된 후 JavaScript를 다시 초기화해주는 것이 중요합니다.

#### **목표**
- 각 페이지의 컨텐츠를 `<main id="content">` 내부에 구현.
- HTMX에 의해 컨텐츠가 교체된 후, JavaScript 라이브러리(Flatpickr 등)가 정상 동작하도록 처리.

#### **💡 상세 구현 프롬프트 예시 (sendCoupon.html)**

> **[사용자 프롬프트 - 1/2 : 레이아웃 및 JS 초기화]**
>
> "`sendCoupon.html` 파일의 `<main id="content">` 내부에 발송등록 페이지의 UI를 만들어줘. (UI 내용은 이전과 동일)
>
> 그리고 `js/sendCoupon.js` 파일에 이 페이지의 기능들을 초기화하는 `initSendCoupon()` 함수를 만들어줘. 이 함수 안에는 다음 내용이 포함되어야 해:
> - `flatpickr` 날짜 선택기 초기화 로직
> - 글자 수 카운터 이벤트 리스너 등록
> - 수신자 목록 유효성 검사 이벤트 리스너 등록
> - '저장/발송', '취소' 버튼 이벤트 리스너 등록
>
> 마지막으로, **HTMX가 `#content` 영역을 교체한 후에 `initSendCoupon()` 함수가 자동으로 호출**되도록, 메인 JavaScript 파일에 `htmx:afterSwap` 이벤트 리스너를 추가해줘.
>
> ```javascript
> // 예시: main.js 또는 global.js
> document.body.addEventListener('htmx:afterSwap', function(event) {
>   // 새로 로드된 페이지의 URL을 확인하여 적절한 초기화 함수 호출
>   if (event.detail.pathInfo.requestPath.includes('sendCoupon.html')) {
>     initSendCoupon();
>   } else if (event.detail.pathInfo.requestPath.includes('sendQuery.html')) {
>     initSendQuery();
>   }
> });
> ```"

> **[사용자 프롬프트 - 2/2 : 동적 기능 구현]**
>
> "`initSendCoupon()` 함수 내부에 다음 동적 기능들을 구현해줘.
>
> 1.  **간편등록 유효성 검사:** (이전과 동일)
> 2.  **대량등록 유효성 검사:** (이전과 동일)
> 3.  **상품 검색 모달:** (이전과 동일)
> 4.  **탭 전환 경고:** (이전과 동일)"

---

### Phase 4: 검토 및 개선 (Review & Refactor)

구현된 기능을 사용해보면서 UX를 개선하고 코드를 다듬는 단계입니다.

#### **💡 개선 프롬프트 예시**

> **[사용자 프롬프트 - 전환 효과 추가]**
>
> "HTMX로 페이지를 전환할 때 좀 더 부드러운 효과를 주고 싶어.
>
> 1.  `#content` 영역이 교체될 때, 기존 내용은 페이드아웃(fade out)되고 새 내용은 페이드인(fade in)되도록 CSS transition 효과를 추가해줘.
> 2.  HTMX는 기본적으로 로드되는 컨텐츠에 `htmx-swapping` 클래스를 추가했다가 제거해. 이 클래스를 활용해서 opacity를 조절하는 방식으로 구현해줘."

---

## 3. 결론

MPA 하이브리드 방식은 완전한 SPA의 복잡성 없이도 뛰어난 사용자 경험을 제공하는 매우 실용적인 접근법입니다. HTMX와 같은 라이브러리를 활용하면, 기존의 서버 사이드 렌더링 방식을 거의 그대로 유지하면서 프론트엔드의 반응성을 크게 향상시킬 수 있습니다.

이 가이드가 당신의 다음 프로젝트에 효율적인 개발 방향을 제시하기를 바랍니다.