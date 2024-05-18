export default function usersReducer(state = {}, action) {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        ...action.data,
      };
      case "UPDATE_USERS":
        return {
          ...state,
          ...action.data,
        };
    default:
      return state;
  }
}
