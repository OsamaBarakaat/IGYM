import { privateAxiosInstance } from "../api/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
    const user = useSelector((state) => state.user);
    const refresh = useRefreshToken();

    useEffect(() => {
        const requestIntercept = privateAxiosInstance.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    console.log("inner config");
                    config.headers["Authorization"] = `Bearer ${user?.token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = privateAxiosInstance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const prevRequest = error?.config;
                console.log("prevRequest", prevRequest?.__retry);
                if (error?.response?.status === 401 && !prevRequest?.__retry) {
                    console.log("prevRequest", prevRequest.__retry);
                    prevRequest.__retry = true;
                    const newAccessToken = await refresh();
                    console.log("new access token", newAccessToken);
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return privateAxiosInstance(prevRequest);
                } else if (error?.response?.status === 447) {
                    window.location.href = "/signin";
                }
                return Promise.reject(error);
            }
        );

        return () => {
            privateAxiosInstance.interceptors.request.eject(requestIntercept);
            privateAxiosInstance.interceptors.response.eject(responseIntercept);
        };
    }, [user.token, refresh]);

    return privateAxiosInstance;
};

export default useAxiosPrivate;