import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Settings from "./Pages/Settings/Settings";
import Gyms from "./Pages/Gyms/Gyms";
import NotFound from "./Pages/NotFound/NotFound";
import GymInfo from "./Pages/Gyms/GymInfo/GymInfo";
import { useSelector } from "react-redux";
import Signin from "./Pages/Auth/Signin/Signin";
import Plans from "./Pages/Plans/Plans";
import Layout from "./Pages/Layout/Layout";
import Forgetpass from "./Pages/Auth/ForgetPass/Forgetpass";
import WeSent from "./Pages/Auth/WeSent/WeSent";
import { toast, ToastContainer } from "react-toastify";
import LandedForgetpass from "./Pages/Auth/Landed-Forgetpass/LandedForgetpass";
import SetPass from "./Pages/Auth/LandedFromInvit/SetPass/SetPass";
import SetName from "./Pages/Auth/LandedFromInvit/SetName/SetName";
import NoAuth from "./Pages/Auth/ProtectdRoutes/NoAuth";
import Notifications from "./Pages/Notifications/Notifications";
import PushNotifications from "./Pages/Notifications/PushNotifications/PushNotifications";
import Coaches from "./Pages/Coaches/Coaches";
import Trainees from "./Pages/Trainees/Trainees";
import Subscreption from "./Pages/Subscreption/Subscreption";
import AddNewRole from "./Pages/Roles/AddNewRole/AddNewRole";
import CoachProfile from "./Pages/Coaches/CoachProfile/CoachProfile";
import Classes from "./Pages/Classes/Classes";
import EditWorkingTimes from "./Pages/Settings/EditWorkingTimes/EditWorkingTimes";
import RevenueExpenses from "./Pages/RevenuExpenses/RevenueExpenses";
import EditRole from "./Pages/Roles/EditRoles/EditRole";
import { useEffect } from "react";
import History from "./Pages/Classes/History/History";
import io from "socket.io-client";
import TraineeProfile from "./Pages/Trainees/TraineeProfile/TraineeProfile";
import Invitations from "./Pages/Invitations/Invitations";

const ENDPOINT = "https://api.igymsystem.com/";
// const ENDPOINT = "http://localhost:8000";
// const ENDPOINT = "https://gym-api-d2a5.onrender.com"
let socket = io(ENDPOINT);

function App() {
  const theme = useSelector((state) => {
    return state.theme;
  });

  const { gymId } = useSelector((state) => state.user);


  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang === "ar") {
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
    }
  }, []);


  useEffect(() => {
    if (gymId) {
      socket.emit("setup", gymId);
      socket.on("connected", () => {
        console.log("socket connect");
      });
    }
  }, [gymId]);

  return (
    <Router>
      <div className="App" data-theme={theme}>
        <Routes>
          <Route path="/" element={<Layout socket={socket} />}>
            <Route index element={<Home socket={socket} />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/gyms" element={<Gyms />} />
            <Route path="/gyminfo" element={<GymInfo />} />
            <Route path="/notifications" element={<Notifications socket={socket} />} />
            <Route path="/pushnotifications" element={<PushNotifications />} />
            <Route path="/coaches" element={<Coaches />} />
            <Route path="/trainees" element={<Trainees />} />
            <Route path="/traineeprofile/:traineeId" element={<TraineeProfile />} />
            <Route path="/subscreptions" element={<Subscreption />} />
            <Route path="/addnewrole" element={<AddNewRole />} />
            <Route path="/coachprofile/:coachId" element={<CoachProfile />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/history" element={<History />} />
            <Route path="/addrole" element={<AddNewRole />} />
            <Route path="/editrole/:roleId" element={<EditRole />} />
            <Route path="/editworkingtimes" element={<EditWorkingTimes />} />
            <Route path="/revenueexpenses" element={<RevenueExpenses />} />
            <Route path="/invitations" element={<Invitations />} />
          </Route>
          <Route
            path="/signin"
            element={
              <NoAuth>
                <Signin />
              </NoAuth>
            }
          ></Route>
          <Route path="/forgetpass" element={<Forgetpass />} />
          <Route
            path="/resetpassword/:invitToken"
            element={<LandedForgetpass />}
          />
          <Route path="/setpass/:invitToken" element={<SetPass />} />
          <Route path="/setname" element={<SetName />} />
          <Route path="/wesent" element={<WeSent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
