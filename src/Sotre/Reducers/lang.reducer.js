import { SET_LANG } from "../Constant/lang.constant"

export const langReducer = (state = "en", action) => {
    switch (action.type) {
        case SET_LANG:
            return action.payload
        default:
            return state
    }
}