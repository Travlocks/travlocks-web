<div align="center">

# Travlocks Web

**UMC 9th Project 🚀**

</div>

<mark> 프로젝트 구조 등 추가적으로 수정할 예정! </mark>

<br/>

<div>
  
  ## ✈️ Travlocks : 여행 일정을 빠르게, 직관적으로, 재미있게!
  
  > **블록을 쌓듯 여행 일정을 만드는 새로운 방식의 웹 서비스 Travlocks**의 프론트엔드 저장소입니다.
</div>

<br/>

<div>

  ## 📌 Travlocks는 이런 서비스예요

  > 작성 예정입니다.
</div>

<br/>

<div>

  ## 🙋🏻‍♀️ Travlocks의 FE Developer를 소개합니다!

  | <a href="https://github.com/jinhyo0"><img src="https://avatars.githubusercontent.com/u/150879545?v=4" width="120px;" alt=""/></a> | <a href="https://github.com/seongmin36"><img src="https://avatars.githubusercontent.com/u/202721995?v=4" width="120px;" alt=""/></a> | <a href="https://github.com/onebone"><img src="https://avatars.githubusercontent.com/u/3233503?v=4" width="120px;" alt=""/></a> | <a href="https://github.com/codmoni"><img src="https://avatars.githubusercontent.com/u/160315926?v=4" width="120px;" alt=""/></a> |
| --- | --- | --- | --- |
| 김진효 | 조성민 | 정윤철 | 황무원 |

</div>

<br/> 

<div>
  
  ## 💻 기술 스택

  | **역할** | **종류** | **선정 이유** |
  | --- | --- | --- |
  | Library | <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> | 컴포넌트 기반 구조로 재사용성과 유지보수성이 높아 개발 효율을 극대화 가능 |
| Programming Language | <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/> | 정적 타입을 제공하여 코드의 안정성과 가독성을 높이고, 개발 중 오류를 사전에 방지할 수 있어 유지보수에 유리 |
| Styling | <img src="https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"> | 유틸리티 클래스 기반의 스타일링으로 반복되는 CSS 코드 작성을 줄이고, 빠르고 일관된 UI 구현 가능 |
| Data Fetching | <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"> | 직관적인 API 사용법과 자동 JSON 변환 기능으로 비동기 통신이 간편 |
| State Management | <img src="https://img.shields.io/badge/TanStackQuery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"> <img src="https://img.shields.io/badge/Zustand-black?style=for-the-badge&logoColor=white"> | 서버 상태는 TanStack Query의 캐싱과 동기화 기능을 통해 효율적으로 관리하고, 전역 상태는 Zustand를 활용해 최소한의 보일러플레이트로 관리 가능 |
| Routing | <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=ReactRouter&logoColor=white"> | SPA에 최적화된 라우팅 기능 제공, 선언적 방식으로 라우트를 쉽게 구성 가능 |
| Formatting | <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-000000?style=for-the-badge&logo=prettier&logoColor=F7B93E"> <img src="https://img.shields.io/badge/stylelint-263238?style=for-the-badge&logo=stylelint&logoColor=white"> | 코드 스타일을 통일하고 잠재적인 오류를 사전에 방지하여 협업 시 효율성을 높임 |
| Package Manager | <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white"> | 빠른 설치 속도와 안정적인 패키지 관리 기능으로 프로젝트 환경 설정에 용이 |
| Deployment | <img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> | Git 연동 기반의 자동 배포, 프론트엔드 프로젝트에 최적화된 환경 제공으로 빠른 개발 및 배포 사이클 지원 |
| Bundler | <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> | 빠른 서버 시작과 모듈 번들링 성능으로 개발 생산성을 향상 |

</div>

<br/>

<div>
  
  ## 🧩 Package Manager
  
  - **pnpm 버전**
    - 10.12.1

  - **pnpm 버전 설치 방법**
  ```
  pnpm set version 버전 # 프로젝트 최상위 폴더 위치에서 명령어 입력
  ```

  - **pnpm 명령어 예시**
  ```
  pnpm install # 전체 설치
  pnpm add 라이브러리 # 라이브러리 설치
  pnpm dev # 실행
  ```
</div>

<br/>

<div>

  ## 🔗 Git Convention
  ### 📌 Git Flow
  
  ```
    develop ← 작업 브랜치
  ```
  
  - `main branch` : 배포 브랜치
  - `develop branch` : 개발 브랜치, feature 브랜치가 merge됨
  - `feature branch` : 페이지/기능 브랜치
  
  <br>
  
  ### ✨ Flow
  - 이슈 생성
  - 이슈 번호에 맞게 `develop 브랜치`에서 새로운 브랜치를 생성
  - 작업을 완료하고 커밋 컨벤션에 맞게 커밋
  - Pull Request 생성
  - 코드 리뷰 후 `develop` 브랜치로 병합
    - 최소 1명 승인 후 develop 브랜치로 squash 머지
  
  <br/>

  ### 🔥 Commit Message Convention

  - **커밋 유형**
    - Init: 프로젝트 세팅
    - Feat: 새로운 기능 추가
    - Fix: 버그 수정
    - Design: UI(CSS) 수정
    - Typing: 오타 수정
    - Docs: 문서 수정
    - Mod: 폴더 구조 이동 및 파일 이름 수정
    - Add: 파일 추가 (ex- 이미지 추가)
    - Del: 파일 삭제
    - Refactor: 코드 리펙토링
    - Chore: 배포, 빌드 등 기타 작업
    - Merge: 브랜치 병합

  - **형식**: `커밋유형: 상세설명 (#이슈번호)`
  - **예시**:
    - Init: 프로젝트 초기 세팅 (#1)
    - Feat: 메인페이지 개발 (#2)

  <br/>

  ### 🌿 Branch Convention
  - **브랜치 종류**
    - `init`: 프로젝트 세팅
    - `feat`: 새로운 기능 추가
    - `fix` : 버그 수정
    - `refactor` : 코드 리펙토링
  
  - **형식**: `브랜치종류/#이슈번호/상세기능`
  - **예시**:
    - init/#1/init
    - fix/#2/splash
</div>

<br/>

<div>

  ## 📂 프로젝트 구조

  ```
📦트래블록스
┣ 📂.github
┃ ┣ 📂ISSUE_TEMPLATE
┃ ┗ 📜pull_request_template.md
┣ 📂public
┃ ┗ 📂fonts
┣ 📂src
┃ ┣ 📂feature
┃ ┃ ┣ 📂block-builder
┃ ┃ ┃ ┣ 📂apis
┃ ┃ ┃ ┣ 📂components
┃ ┃ ┃ ┣ 📂hooks
┃ ┃ ┃ ┣ 📂ui
┃ ┃ ┃ ┗ 📂types
┃ ┣ 📂pages
┃ ┃ ┣ 📜BlockPage.tsx
┃ ┃ ┣ 📜HomePage.tsx
┃ ┃ ┣ 📜LoginPage.tsx
┃ ┃ ┣ 📜MyPage.tsx
┃ ┃ ┣ 📜ResetPasswordPage.tsx
┃ ┃ ┣ 📜SignupPage.tsx
┃ ┃ ┣ 📜TemplatePage.tsx
┃ ┣ 📂shared
┃ ┃ ┣ 📂apis
┃ ┃ ┃ ┗ 📜axios.ts # axios/fetch 인스턴스, interceptor, 공통 fetcher
┃ ┃ ┣ 📂assets
┃ ┃ ┣ 📂components
┃ ┃ ┣ 📂constants
┃ ┃ ┣ 📂data
┃ ┃ ┣ 📂hooks
┃ ┃ ┃ ┣ 📂mutations
┃ ┃ ┃ ┗ 📂queries
┃ ┃ ┣ 📂layouts
┃ ┃ ┣ 📂routes
┃ ┃ ┣ 📂stores
┃ ┃ ┣ 📂types
┃ ┃ ┗ 📂utils
┃ ┣ 📜App.tsx
┃ ┗ 📜main.tsx
┣ 📜.env
┣ 📜.gitignore
┣ 📜.prettierrc
┣ 📜.stylelintrc
┣ 📜eslint.config.js
┣ 📜index.html
┣ 📜package.json
┣ 📜pnpm-lock.yaml
┣ 📜README.md
┣ 📜tsconfig.app.json
┣ 📜tsconfig.json
┣ 📜tsconfig.node.json
┣ 📜vercel.json
┗ 📜vite.config.ts
```

- public
  - fonts - 폰트
- src
    - feature
        - block-builder
            - components
            - ui
            - apis
            - hooks
    - pages - 실제 라우팅되는 페이지 컴포넌트
    - shared
        - apis - 서버와 통신하는 API 함수 모음
        - assets - 사용되는 모든 에셋
        - components - 공용 컴포넌트 및 스타일
        - data - json 데이터
        - hooks - 전역으로 사용되는 훅
            - mutations - React Query의 useMutation 훅 관련 로직
            - queries - React Query의 useQuery / useInfiniteQuery 관련 로직
        - layouts - 페이지의 공통 레이아웃 컴포넌트
        - routes - 도메인 별 라우팅 페이지와 컴포넌트 및 스타일 등
        - stores - Zustand 기반 전역 상태 관리 로직
        - types - TypeScript 타입 정의 모음
        - utils - 전역으로 사용되는 함수
</div>
