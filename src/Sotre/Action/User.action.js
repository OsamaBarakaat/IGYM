import { SET_USER, RESET_USER } from "../Constant/User.constant"

// This is the action creator for setting the user
export const setUser = (value) => {
    return {
        type: SET_USER,
        payload: value
    }
}

export const reSetUser = () => {
    return {
        type: RESET_USER,
        payload: {}
    }
}