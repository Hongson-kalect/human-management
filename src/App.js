import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import Checkuser from "./pages/CheckUser/CheckUser";
import { Daycheck } from "./pages/Daycheck";
import { Home } from "./pages/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Checkuser />}></Route>
          <Route path="daycheck" element={<Daycheck />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="*" element={<Home />}></Route>
          {/* <Route path="daycheck" element={<Daycheck />}></Route>
          <Route path="home" element={<Home />}></Route> */}
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
