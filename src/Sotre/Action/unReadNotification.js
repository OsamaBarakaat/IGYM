import { SET_UNREAD_NOTFICATION } from "../Constant/unReadNotfication";

export const setUnReadNotification = (value) => {
  return {
    type: SET_UNREAD_NOTFICATION,
    payload: value,
  };
};
