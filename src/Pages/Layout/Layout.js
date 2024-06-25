import React, { useEffect, useState } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import MobileSideBar from '../../components/MobileSideBar/MobileSideBar';
import { useDispatch } from 'react-redux';
import { setUser } from '../../Sotre/Action/User.action';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Loader from '../../components/Loader/Loader';

const Layout = () => {
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const [loading, setLoading] = useState(true);
    const fetchUser = async () => {
        try {
            const { data } = await axiosPrivate.get("/admins/me");
            console.log(data.data);
            dispatch(setUser(data.data))
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchUser();

    }, [])
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
        return <>
            <Loader />
        </>
    }
    return (
        <>
            <div className='app-container'>
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
        </>
    )
}

export default Layout