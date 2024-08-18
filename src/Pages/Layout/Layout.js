import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import { Outlet } from "react-router-dom";
import MobileSideBar from "../../components/MobileSideBar/MobileSideBar";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Sotre/Action/User.action";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Loader from "../../components/Loader/Loader";
import RequireAuth from "../Auth/ProtectdRoutes/RequireAuth";

const Layout = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(true);
  const fetchUser = async () => {
    try {
      const { data } = await axiosPrivate.get("/owners/me/");
      console.log(data.data);
      dispatch(
        setUser({
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
    }else{
      setLoading(false);
    }
  }, []);
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
          </div>
          {windowWidth <= 768 && <MobileSideBar />}
        </div>
      </RequireAuth>
    </>
  );
};

export default Layout;
