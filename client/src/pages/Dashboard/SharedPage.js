import { Link, Outlet } from "react-router-dom";
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, SmallSideBar, BigSideBar } from "../../components/index";
import { useAppContext } from "../../context/AppContext";
const SharedPage = () => {
  const { showSideBar } = useAppContext();
  return (
    <Wrapper>
      <main className="dashboard">
        {/* {showSideBar && <SmallSideBar />} */}
        <SmallSideBar/>
        <BigSideBar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedPage;
