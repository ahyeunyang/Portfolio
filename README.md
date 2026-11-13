# 양아연 포트폴리오

React와 Vite 기반의 반응형 포트폴리오입니다. 헤더·푸터와 7개 메뉴 페이지를 제공합니다. 홈의 본문은 비워 두었습니다.

## 실행

`npm install` 후 `npm run dev`로 실행합니다. `npm run build`는 배포 파일을 `dist/`에 생성합니다.

## 폴더 구조

```text
src/
  components/
    Header/         # Header.jsx, Header.scss, 헤더 하위 컴포넌트
    Footer/         # Footer.jsx, Footer.scss, 푸터 하위 컴포넌트
    MenuPage/       # 공통 페이지 레이아웃과 스타일
  pages/
    Home/
    UxUiDesign/
    UiPublishing/
    Frontend/
    EditorialDesign/
    About/
    Career/
    Skills/
  styles/
    _variables.scss # 공통 CSS 변수
    _tokens.scss    # Sass 의미별 변수
    _mixins.scss    # 반응형 믹스인
    _reset.scss
    _fonts.scss
    _base.scss
    _layout.scss
    global.scss    # 공통 스타일 진입점
  data/
  hooks/
  static/          # 이미지, 폰트, 다운로드 파일
  App.jsx
  main.jsx
```

각 페이지 폴더에는 같은 이름의 JSX와 SCSS가 있습니다. 예: `pages/About/About.jsx`, `pages/About/About.scss`. 페이지와 컴포넌트는 자신의 SCSS를 직접 import합니다. 별도 스타일이 없는 하위 컴포넌트는 해당 컴포넌트 그룹의 SCSS를 공유합니다.

7개 메뉴 페이지의 공통 여백·제목 스타일은 `components/MenuPage/MenuPage.scss`에서 관리하고, 페이지별 추가 스타일은 각 페이지 SCSS에 작성합니다.

새 SCSS에서 공통 변수가 필요하면 `@use "../../styles/tokens" as *;`, 반응형 믹스인은 `@use "../../styles/mixins" as *;`로 불러옵니다. 공통 스타일만 `styles/global.scss`에서 관리합니다.

## 메뉴와 콘텐츠

- `src/data/header.js`: 메뉴명과 링크, 소셜 링크
- `src/App.jsx`: React Router BrowserRouter 기반 페이지 라우팅
- `src/data/footer.js`: 푸터 정보
- `src/data/downloads.js`: 다운로드 문서


디자인 참고: https://remaincareer.com/
활성 메뉴는 연두색(`#d1fe17`)으로 표시합니다. 푸터의 연락처·프로필 정보는 `src/data/footer.js`에서 수정할 수 있습니다.

## 관리 및 검증

- `npm run fonts`: 로컬 Pretendard 파일을 읽어 `src/styles/_fonts.scss` 재생성
- `npm run format`: 코드 포맷 정리
- `node scripts/check-header.mjs`: PC·모바일 헤더, 드로어, 키보드 조작 검증
- `node scripts/check-pages.mjs`: 7개 페이지 이동, 활성 메뉴, 모바일 메뉴와 홈 복귀 검증
- `npm run build`: 배포 빌드와 스타일·정적 파일 경로 검증

## Vercel 배포

페이지 주소는 `/editorial-design`처럼 경로를 사용합니다. `vercel.json`의 rewrite는 직접 접속·새로고침 시 `index.html`을 제공하여 React Router가 페이지를 표시하도록 합니다. 빌드 명령은 `npm run build`, 출력 폴더는 `dist`입니다.
