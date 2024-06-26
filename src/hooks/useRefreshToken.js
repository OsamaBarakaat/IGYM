import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { reSetUser, setUser } from "../Sotre/Action/User.action";


const useRefreshToken = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const refresh = async () => {
        try {
            const { data } = await axiosInstance.get("/admins/refresh-token");
            console.log(data);
            dispatch(setUser({token: data.data.accessToken}));
            return data.data.accessToken;
        } catch (error) {
            console.log(error);
            if (error?.response?.status === 401) {
                dispatch(reSetUser());
                navigate("/signin");
            }
        }
    };
    return refresh;
};

export default useRefreshToken;