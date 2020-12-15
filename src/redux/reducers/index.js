import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import playlist from "./playlist.reducer";
const rootReducer = combineReducers({
  auth: authReducer,
  playlist: playlist,
});

export default rootReducer;
