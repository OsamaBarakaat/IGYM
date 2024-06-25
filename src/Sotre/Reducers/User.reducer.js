import { SET_USER, RESET_USER } from "../Constant/User.constant"


export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return action.payload
        case RESET_USER:
            return action.payload
        default:
            return state
    }
}