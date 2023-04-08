import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <h1>NotFound!!</h1>
      <Link to="..">Home으로 돌아가기</Link>;
    </>
  );
}

export default NotFound;
