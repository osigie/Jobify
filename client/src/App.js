import { Landing, Register, Error } from "./pages/index";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import {
  AddJobs,
  AllJobs,
  SharedPage,
  Stats,
  Profile,
} from "./pages/Dashboard/index";
function App() {
  return (
    <BrowserRouter>
      {/* <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/register">Register</Link>
      <Link to="/landing">Landing</Link>
    </nav> */}

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <SharedPage />
            </ProtectedRoutes>
          }
        >
          <Route path="add-jobs" element={<AddJobs />}></Route>
          <Route path="all-jobs" element={<AllJobs />}></Route>
          <Route  index element={<Stats />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
