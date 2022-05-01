import { combineReducers } from "redux";
import items from "./items";
import cats from "./categorys";
import auth from "./auth";
export default combineReducers({
    items,
    cats,
    auth
});