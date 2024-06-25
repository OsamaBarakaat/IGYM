import { SET_THEME } from "../Constant/Theme.constant";

export const themeReducer = (state = "light", action) => {
    switch (action.type) {
        case SET_THEME:
            return action.payload
        default:
            return state
    }
}