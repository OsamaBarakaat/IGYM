import { createStore, combineReducers } from "redux";
import { userReducer } from "./Reducers/User.reducer";
import { composeWithDevTools } from '@redux-devtools/extension';
import { themeReducer } from "./Reducers/Theme.reducer";


const reducer = combineReducers({ user: userReducer, theme: themeReducer })
const theme = localStorage.getItem("theme")
const lang = localStorage.getItem("language")
const initState = {
    user: {

    },
    theme: theme || "light",
    lang: lang || "en"
}

const store = createStore(reducer, initState, composeWithDevTools())

export default store