import { combineReducers } from "redux";
import items from "./items";
import cats from "./categorys";
export default combineReducers({
    items,
    cats
});