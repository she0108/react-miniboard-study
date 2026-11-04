# Mini Board

React로 페이지를 나누고 서버 데이터를 표시하는 흐름을 익히기 위한 작은 게시판입니다. Vite, React JavaScript, React Router를 사용하고, 스타일은 일반 CSS로 작성합니다.

UI는 [RealWorld](https://github.com/realworld-apps/realworld) 프로젝트의 [Conduit 데모](https://demo.realworld.show/)를 참고했습니다.

## 실행

```sh
npm install
npm run dev
```

터미널에 출력된 Local 주소를 브라우저에서 엽니다. 별도 설정 없이 `https://dummyjson.com`의 데이터를 사용합니다. API 주소를 바꾸려면 `.env.example`을 `.env.local`로 복사해 `VITE_API_BASE_URL`을 수정하고 개발 서버를 재시작합니다.

```sh
npm run lint
npm run build
```

## 기능

- 게시글 10개 조회와 상세 페이지 이동
- 게시글 댓글 조회
- 로딩, 조회 실패, 빈 결과, 없는 게시글 안내

로그인과 글·댓글 작성은 포함하지 않습니다.

## 살펴볼 코드

| 위치 | 내용 |
| --- | --- |
| `src/routes/router.jsx` | URL과 페이지 연결 |
| `src/api/` | API 요청 함수 |
| `src/pages/` | 목록과 상세 페이지, 로딩·오류 처리 |
| `src/components/` | 헤더, 푸터, 게시글 카드, 댓글 |
| `src/index.css` | 앱 전체 스타일 |
