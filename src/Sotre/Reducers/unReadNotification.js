import { SET_UNREAD_NOTFICATION } from "../Constant/unReadNotfication"


export const unReadNotificationReducer = (state = 0, action) => {
    switch (action.type) {
        case SET_UNREAD_NOTFICATION:
            return action.payload
        default:
            return state
    }
}