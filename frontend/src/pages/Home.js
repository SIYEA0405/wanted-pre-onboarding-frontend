import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <h1>Home 화면 입니다.</h1>
      <ul>
        <li>
          <Link to="/signup">회원가입</Link>
        </li>
        <li>
          <Link to="/signin">로그인</Link>
        </li>
        <li>
          <Link to="/todo">Todo</Link>
        </li>
      </ul>
    </>
  );
}

export default Home;
