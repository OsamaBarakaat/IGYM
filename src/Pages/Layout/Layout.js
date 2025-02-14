import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet, useLocation } from "react-router-dom";
import MobileSideBar from "../../components/MobileSideBar/MobileSideBar";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Sotre/Action/User.action";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../components/Loader/Loader";
import RequireAuth from "../Auth/ProtectdRoutes/RequireAuth";
import { toast } from "react-toastify";
import { setUnReadNotification } from "../../Sotre/Action/unReadNotification";
import MobileSideBarNoMore from "../../components/MobileSideBar/MobileSideBarNoMore";

const Layout = ({ socket }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const { gymId } = useSelector((state) => state.user);

  const fetchUnreadNotificationsCount = async () => {
    try {
      const { data } = await axiosPrivate.get(
        `/gyms/${gymId}/notifications/count`
      );
      dispatch(setUnReadNotification(data.data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const fetchUser = async () => {
    try {
      const { data } = await axiosPrivate.get("/owners/me/");
      console.log(data.data);
      dispatch(
        setUser({
          allData: data?.data,
          data: data?.data?.userData,
          gymId: data?.data?.gymId,
          plan: data?.data?.plan,
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user.data) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (gymId) {
      fetchUnreadNotificationsCount();

      socket.on("notification", (m) => {
        fetchUnreadNotificationsCount();
        console.log("message", m);
        toast.success(m);
      });

      socket.on("read notification", () => {
        console.log("read notification");

        dispatch(setUnReadNotification(0));
      });
    }
  }, [gymId]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const location = useLocation()
  console.log(location)
  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <>
      <RequireAuth>
        <div className="app-container">
          {windowWidth > 768 && (
            <div className="sideBarOfAppJs">
              <SideBar />
            </div>
          )}
          <div className="main-content">
            <Outlet />
            {windowWidth <= 768 && <MobileSideBar />}
          </div>
        </div>
      </RequireAuth>
    </>
  );
};

export default Layout;
