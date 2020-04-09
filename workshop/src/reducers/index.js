import { combineReducers } from "redux";

import auth from "./auth-reducer";
import artists from "./artists-recuder";

export default combineReducers({ auth, artists });
