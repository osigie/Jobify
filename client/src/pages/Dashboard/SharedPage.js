import { Link, Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
const SharedPage = () => {
  return (
    <Wrapper>
      <nav>
        <Link to="add-jobs"> Addjobs</Link>
        <Link to="all-jobs"> Alljobs</Link>
        <Link to="profile">Profile</Link>
        <Link to="stats">Stats</Link>
      </nav>
      <Outlet />
    </Wrapper>
  );
};

export default SharedPage;
