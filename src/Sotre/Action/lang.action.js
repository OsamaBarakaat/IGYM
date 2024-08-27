import { SET_LANG } from "../Constant/lang.constant";

// This is the action creator for setting the theme

export const setTheme = (value) => {
    return {
        type: SET_LANG,
        payload: value
    }
}