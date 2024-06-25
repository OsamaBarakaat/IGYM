import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useDispatch } from "react-redux";
import { reSetUser } from "../Sotre/Action/User.action";


const useRefreshToken = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const refresh = async () => {
        try {
            const { data } = await axiosInstance.get("/admins/refresh-token", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                }
            });
            console.log(data);
            // CookieServices.set("accessToken", data.data.accessToken);
            // CookieServices.set("jwt", data.data.refreshToken);
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("jwt", data.data.refreshToken);
            return data.data.accessToken;
        } catch (error) {
            console.log(error);
            if (error?.response?.status === 401) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("jwt");
                dispatch(reSetUser());
                navigate("/signin");
            }

        }
    };
    return refresh;
};

export default useRefreshToken;