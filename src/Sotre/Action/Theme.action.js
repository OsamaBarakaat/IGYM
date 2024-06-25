import { SET_THEME } from "../Constant/Theme.constant";

// This is the action creator for setting the theme

export const setTheme = (value) => {
    return {
        type: SET_THEME,
        payload: value
    }
}