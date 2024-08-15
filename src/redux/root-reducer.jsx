import { combineReducers } from "redux";
import userSlice from "./user/slice";

export default combineReducers({
    user: userSlice
})
