# 양아연 포트폴리오

React와 Vite 기반의 반응형 포트폴리오. 카테고리 필터, 프로젝트 상세 모달, 소개와 역량 섹션을 제공합니다.

## 실행

```sh
npm install
npm run dev
```

터미널에 표시된 로컬 주소를 열면 됩니다. 배포용 파일은 `npm run build`로 `dist/`에 생성합니다.

## 수정

- `src/data/portfolioData.js`: 프로젝트 내용과 링크
- `src/pages/Home.jsx`: 소개 문구와 메인 페이지 구성
- `src/components/`: Header, Footer, Logo, SectionHeading, ProjectCard, ProjectCover, ProjectDialog
- `src/static/font/pretendard/`: 제공된 로컬 Pretendard 가변 폰트
- `src/static/scss/main.scss`: 스타일 진입점
- `src/static/scss/abstracts/_tokens.scss`: 공통 색상, radius, spacing, 글꼴, 레이아웃 변수
- `src/static/scss/abstracts/_mixins.scss`: 반응형 공통 믹스인
- `src/static/scss/common/`: 기본 스타일, 레이아웃, 폰트 선언
- `src/static/scss/components/`: 프로젝트 카드·커버, 상세 모달 스타일
- `src/static/scss/pages/_home.scss`: 메인 페이지 스타일

새 SCSS에서 공통 변수를 쓸 때 `@use '../abstracts/tokens' as *;`를 추가합니다. 예: `padding: $space-5; border-radius: $radius-medium; color: $color-text;`.

새 페이지는 `src/pages/`와 `src/static/scss/pages/`에 추가하고, SCSS를 `main.scss`에서 `@use`로 불러옵니다. CSS는 Vite가 빌드 시 생성하므로 별도로 복사하거나 관리할 필요가 없습니다.

제공된 폰트는 분할 파일이므로 실제 문자 범위에 맞춘 `unicode-range`를 사용합니다. 폰트 파일을 교체하거나 추가한 뒤 `npm run fonts`로 선언을 다시 생성하세요. `npm run format`으로 코드 포맷을 정리할 수 있습니다.

썸네일은 프로젝트 내용을 바탕으로 제작한 콘셉트 비주얼입니다. 실제 이미지를 쓰려면 `public/images/portfolio/` 폴더를 만들고 이미지를 넣은 뒤 프로젝트에 `thumbnail: '/images/portfolio/파일명.jpg'`와 `thumbnailAlt`를 추가하세요.

프로젝트를 추가하면 카테고리 필터, 상세 보기, 헤더의 프로젝트 수에 자동 반영됩니다.

디자인 참고: https://remaincareer.com/

## 프로젝트 분류

탭은 `src/data/categories.js`에서 `전체 · 웹 · 앱 · 반응형 · 편집디자인` 순서로 관리합니다. 작업이 없는 카테고리도 표시됩니다.

- 웹: 일반 웹사이트와 웹 UI
- 앱: 앱 UI와 앱 관련 개선 작업
- 반응형: PC·태블릿·모바일 대응을 중심으로 소개하는 웹 작업
- 편집디자인: 인스타 게시물, 쇼핑몰 상세페이지, 로고, 카탈로그 등

각 프로젝트의 `category`에 위 분류 중 하나를 입력합니다. 세부 유형은 선택 필드인 `projectType`으로 표시합니다. 예: `category: "편집디자인", projectType: "카탈로그"`. 세부 유형 목록은 `editorialTypes`에 정리되어 있으며, 다른 문구도 입력할 수 있습니다.

현재 반응형·편집디자인 작업은 미등록 상태입니다. 실제 작업을 추가하면 개수와 필터 결과가 자동 갱신됩니다.

## 헤더

`src/components/Header.jsx`와 `src/static/scss/components/_header.scss`는 remaincareer.com의 공개 헤더 구조와 스타일을 기준으로 구성했습니다. 메뉴명은 원문 그대로 유지합니다(`Instargram` 포함).

- PC: 로고·소셜·로그인 행과 내비게이션 행, 전체 높이 8.125rem
- 모바일: 74.99875rem 이하에서 전환, 가로 스크롤 내비게이션과 전체 화면 메뉴
- 메뉴 데이터: `src/data/header.js`
- 메뉴 링크는 미지정이며 인스타그램은 `https://www.instagram.com/yeony.xx/`, 문의는 `https://open.kakao.com/o/gtZcMMWi`로 연결됩니다. 유튜브 항목은 제거했습니다.
- 로고·아이콘은 `src/static/images/`, `src/static/font/material-symbols/`에서 로컬로 제공합니다.

빌드는 확인했습니다. 현재 환경의 브라우저 연결 실패 및 자동 승인 검토 사용량 제한으로 실제 화면 비교와 DOM 동작 테스트는 미완료입니다.

## 푸터

`src/components/Footer.jsx`와 `src/static/scss/components/_footer.scss`는 레퍼런스의 PC 3단 구성과 모바일 사업자 정보 펼치기 구성을 반영합니다. 74.99875rem 이하에서 모바일 레이아웃을 표시합니다.

원본과의 레이아웃 비교를 위해 연락처·사업자·정책·저작권 문구를 그대로 넣었습니다. 해당 정보는 본인 정보가 아닌 레퍼런스 문구이며, `src/data/footer.js`에서 수정할 수 있습니다. 인스타그램·Threads만 본인 계정에 연결되며 그 외 항목은 링크 없는 텍스트입니다.
