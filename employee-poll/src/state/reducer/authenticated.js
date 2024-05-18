export default function authenticatedReducer(state = null, action) {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return null;
    default:
      return state;
  }
}
