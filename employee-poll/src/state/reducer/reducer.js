import {combineReducers} from "redux";
import usersReducer from "./users"
import authenticatedReducer from "./authenticated"
import questionsReducer from "./questions";

export const reducer = combineReducers({
  isLogged: authenticatedReducer,
  users: usersReducer,
  questions: questionsReducer,
})
