# copilot-instructions for glowseoul (static site)

이 리포지토리는 단일 페이지 정적 웹 사이트입니다. AI 코딩 에이전트에게 즉시 생산적으로 작업할 수 있도록 프로젝트의 구조, 관행, 주의사항과 실행/디버깅 방법을 요약합니다.

## 프로젝트 개요
- **목적:** 마케팅/브랜딩용 정적 사이트 (HTML/CSS/JS, 이미지/폰트/비디오 포함)
- **주요 파일/디렉터리:**
  - `index.html` — 페이지 진입점(주요 마크업과 Tailwind/FontAwesome CDN 포함)
  - `css/style.css` — 컴파일된 결과(또는 수동 작성된 CSS)
  - `scss/style.scss` — 소스 SCSS(프로젝트 스타일의 출발점)
  - `script/script.js` — 간단한 전역 JS (현재는 작은 로그 출력)
  - `images/`, `fonts/`, `videos/` — 정적 자산

## 아키텍처 및 설계 의도
- 빌드 툴(webpack, parcel 등) 및 패키지 매니저 설정이 없음 — 단순 정적 호스팅을 예상합니다.
- SCSS가 존재하므로 SCSS → CSS 컴파일이 개발자의 책임입니다(자동화 스크립트는 없음).
- Tailwind는 CDN(`https://unpkg.com/@tailwindcss/browser@4`) 방식으로 포함되어 있어 HTML에 Tailwind 유틸리티를 바로 사용합니다.

## 실행 / 개발 워크플로우 (권장)
- 빠른 로컬 확인: 루트에서 간단한 HTTP 서버 실행 후 브라우저 열기
  - Python (권장, PowerShell):
    ```powershell
    cd <프로젝트 루트>
    python -m http.server 8000
    # 브라우저에서 http://localhost:8000 열기
    ```
  - 또는 Node: `npx serve .` (환경에 따라 설치 필요)
- SCSS 편집 시 컴파일(권장):
  - 설치된 경우 `sass` CLI 사용 (PowerShell 예):
    ```powershell
    npx sass --watch scss:css
    # 또는 로컬에 sass가 있다면: sass --watch scss:css
    ```

## 프로젝트 규칙 / 패턴 (발견된 사항)
- HTML은 직접 수정/확장하는 방식 — 컴포넌트화된 템플릿 엔진 없음.
- SCSS 구조: `scss/style.scss` 안에 네스팅으로 탑바 등 컴포넌트 스타일을 관리함. CSS에서 `.top-bar`, `.top-bar__inner`, `.top-bar__menu-1` 등의 BEM 유사 네이밍 패턴을 사용합니다.
- 이미지 파일명에 공백이 존재(`images/long logo.png`) — 파일명에 공백이 있으면 링크/URL 인코딩 문제를 일으킵니다. 에이전트는 가능한 경우 파일명을 하이픈/언더스코어로 변경 제안.

## 통합 지점 및 외부 의존성
- Tailwind: CDN `https://unpkg.com/@tailwindcss/browser@4`.
- 폰트: JSDelivr의 noonfonts 사용(글꼴은 SCSS/CSS에서 @font-face로 로드).
- Font Awesome 링크는 현재 잘못 기재되어 있어 수정이 필요합니다(아래 참조).

## 즉시 유의해야 할 코드베이스 문제(구체적 예시)
- `index.html`의 HTML 문법 오류(수정 필요):
  - 잘못된 시작: `<html lang="ko` — 닫는 따옴표와 `>` 누락. 올바르게는 `<html lang="ko">`.
  - 서브메뉴 마크업이 깨져 있음: `<ul class="sub-menu"` 와 `<li class="sub-menu-list"` 에 `>`가 누락되어 DOM이 붕괴함.
  - Font Awesome 링크가 프로토콜 없이 기입되어 있고 파일명 오타: `href="cdnjs.cloudflare.com/.../all.mis.css"` → `https://cdnjs.cloudflare.com/.../all.min.css` 로 수정 필요.
- 이미지 파일명에 공백(`long logo.png`)이 있음 — 브라우저에서 경로 이슈를 초래할 수 있음. 파일명 변경 또는 `src`에 인코딩 적용 필요.

## 에이전트 행동 지침 (구체적이고 실용적으로)
1. 변경 제안 전 항상 `index.html`을 HTML validator(또는 브라우저 콘솔)로 확인해 문법 오류를 잡으세요. 작은 마크업 오류가 전체 스타일/스크립트 동작을 방해합니다.
2. 외부 리소스(폰트, CDN 링크)는 절대 URL(https://...)로 작성되어야 합니다. 미확인 절대 경로는 수정 후보로 제시하세요.
3. SCSS는 `scss/style.scss`가 소스입니다. CSS 수정 제안 시 SCSS 쪽에 변경을 권장하고, 빌드 명령(예: `npx sass --watch scss:css`)을 함께 제시하세요.
4. 정적 자산 이름에 공백이 있으면 사용자에게 파일명 변경(예: `long-logo.png`) 또는 안전한 URL 인코딩 적용을 권장하세요.
5. 변경사항을 만들면: 간단한 로컬 서버로 동작을 확인하고(브라우저 콘솔 오류 포함) 변경 요약과 테스트 방법을 PR/메시지에 적어 제출하세요.

## PR/커밋 규칙 제안(간단)
- 커밋 제목: `fix(html): ...` 또는 `feat(style): ...` 형식 사용.
- 변경 설명에 “어떤 파일을 수정했는지”, “왜 수정했는지”, “로컬 확인 방법(서버·URL)”을 간단히 적으세요.

---
작성한 내용이 이 저장소의 현재 상태(정적 페이지, SCSS 소스, CDN 사용)에 적합하다고 판단됩니다. 추가로 자동 빌드 설정(예: `package.json` + `npm scripts`)을 원하시면 구성안을 만들어 드리겠습니다.

피드백 요청: 이 파일에서 더 다루길 원하는 항목(예: 이미지 최적화 규칙, 접근성(ARIA) 체크리스트, CI 배포 지침)을 알려주세요.
