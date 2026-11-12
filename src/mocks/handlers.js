import { http, HttpResponse } from "msw/http";
import { API_BASE_URL } from "../api/config.js";

const posts = [
  {
    id: 1,
    title: "컴포넌트는 결국 JSX를 반환하는 함수",
    body: "처음엔 컴포넌트가 뭔가 특별한 건 줄 알았는데, 그냥 JSX를 반환하는 함수였다.\n이름은 꼭 대문자로 시작해야 한다. 소문자로 쓰면 React가 HTML 태그로 착각한다.",
  },
  {
    id: 2,
    title: "props는 읽기 전용이다",
    body: "부모가 넘겨준 props를 자식에서 바꾸려다가 한참 헤맸다.\nprops는 읽기만 하고, 바꿔야 하는 값은 state로 관리하거나 부모에게 바꿔 달라고 함수를 넘겨받아야 한다.",
  },
  {
    id: 3,
    title: "useState 값이 바로 안 바뀌는 이유",
    body: "setCount(count + 1) 다음 줄에서 count를 찍으면 이전 값이 나온다.\nstate는 다음 렌더링 때 바뀌기 때문이다. 이전 값을 기준으로 여러 번 바꾸려면 setCount((prev) => prev + 1)처럼 함수를 넘기면 된다.",
  },
  {
    id: 4,
    title: "리스트 렌더링할 때 key는 왜 필요할까",
    body: "map으로 목록을 그리면 콘솔에 key 경고가 뜬다.\nkey는 React가 어떤 항목이 추가되고 삭제됐는지 구분하는 이름표다. 순서가 바뀔 수 있는 목록에서 index를 key로 쓰면 엉뚱한 항목이 갱신될 수 있으니, 데이터의 id를 쓰자.",
  },
  {
    id: 5,
    title: "조건부 렌더링 정리",
    body: "두 갈래면 삼항 연산자, 보여 주거나 숨기기만 하면 &&.\n갈래가 많아지면 삼항을 중첩하지 말고 if문으로 일찍 return하는 게 훨씬 읽기 쉽다.\n&& 앞에 숫자를 두면 0이 화면에 찍히는 것도 주의.",
  },
  {
    id: 6,
    title: "useEffect 의존성 배열 정리",
    body: "배열을 아예 안 쓰면 렌더링될 때마다 실행.\n빈 배열 []이면 처음 화면에 나타날 때 한 번.\n[id]처럼 값을 넣으면 그 값이 바뀔 때마다 실행.\n개발 모드에서 두 번 실행되는 건 StrictMode 때문이니 놀라지 말 것.",
  },
  {
    id: 7,
    title: "useEffect로 데이터 불러오기",
    body: "useEffect 콜백 자체를 async로 만들면 안 된다. 안에서 async 함수를 따로 만들고 호출해야 한다.\n로딩, 에러, 데이터 세 가지 state를 두고 try/catch/finally로 나누면 깔끔하다.",
  },
  {
    id: 8,
    title: "폼 입력값 다루기 (제어 컴포넌트)",
    body: "input의 value를 state와 연결하고 onChange에서 setState를 호출하면 된다.\nvalue만 넣고 onChange를 빼먹으면 입력이 안 된다. 이것 때문에 10분 날렸다.",
  },
  {
    id: 9,
    title: "React Router로 페이지 나누기",
    body: "a 태그 대신 Link를 써야 페이지 전체가 새로고침되지 않는다.\n/posts/:id 같은 주소의 id는 useParams로 꺼낼 수 있다. 꺼낸 값은 문자열이라는 것도 기억하기.",
  },
  {
    id: 10,
    title: "React 공부 시작합니다",
    body: "JavaScript 기초는 끝냈고 오늘부터 React 공식 문서 Learn 섹션을 처음부터 읽어 보려고 한다.\n공부한 내용은 여기에 정리해서 올릴 예정!",
  },
];

const comments = {
  1: [
    { id: 1, body: "대문자 규칙 저도 처음에 몰라서 한참 헤맸어요.", user: { username: "jiwoo" } },
    { id: 2, body: "함수라고 생각하니까 확 이해되네요.", user: { username: "minseo_dev" } },
  ],
  2: [
    { id: 3, body: "부모에게 함수를 넘겨받는 부분이 '상태 끌어올리기'죠?", user: { username: "react_newbie" } },
    { id: 4, body: "맞아요. 공식 문서에 Sharing State Between Components 파트 보시면 돼요.", user: { username: "hyun" } },
  ],
  3: [
    { id: 5, body: "이거 진짜 다들 한 번씩 겪는 것 같아요 ㅋㅋ", user: { username: "sora" } },
    { id: 6, body: "함수형 업데이트는 언제 써야 하는지 헷갈렸는데 정리 감사합니다.", user: { username: "codingcat" } },
    { id: 7, body: "공식 문서의 '스냅샷으로서의 state' 파트도 같이 읽어 보세요.", user: { username: "hyun" } },
  ],
  4: [
    { id: 8, body: "index를 key로 쓰면 안 되는 이유가 이거였군요.", user: { username: "frontend_kim" } },
  ],
  5: [
    { id: 9, body: "0이 찍히는 거 실제로 겪어 봤어요. items.length > 0 && 로 바꿔서 해결했습니다.", user: { username: "yuna" } },
    { id: 10, body: "early return 방식이 훨씬 읽기 편하네요.", user: { username: "jiwoo" } },
  ],
  6: [
    { id: 11, body: "두 번 실행되는 거 버그인 줄 알았어요...", user: { username: "react_newbie" } },
    { id: 12, body: "배포 빌드에서는 한 번만 실행되니까 걱정 안 하셔도 돼요.", user: { username: "minseo_dev" } },
  ],
  7: [
    { id: 13, body: "async를 바로 못 붙이는 이유가 궁금했는데, cleanup 함수 대신 Promise가 반환돼서 그런 거래요.", user: { username: "codingcat" } },
  ],
  8: [
    { id: 14, body: "저도 onChange 빼먹고 키보드 고장 난 줄 알았어요 ㅋㅋ", user: { username: "sora" } },
  ],
  9: [
    { id: 15, body: "useParams 값이 문자열이라 id 비교할 때 Number로 바꿔야 하더라고요.", user: { username: "frontend_kim" } },
  ],
  // 10번 게시글은 댓글이 없는 상태를 보여 주기 위해 비워 둔다.
};

export const handlers = [
  http.get(`${API_BASE_URL}/posts`, () => HttpResponse.json({ posts })),

  http.get(`${API_BASE_URL}/posts/:id`, ({ params }) => {
    const post = posts.find((post) => post.id === Number(params.id));
    if (!post) return new HttpResponse(null, { status: 404 });
    return HttpResponse.json(post);
  }),

  http.get(`${API_BASE_URL}/posts/:id/comments`, ({ params }) =>
    HttpResponse.json({ comments: comments[params.id] ?? [] }),
  ),
];
