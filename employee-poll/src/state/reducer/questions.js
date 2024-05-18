export default function questionsReducer(state = {}, action) {
  switch (action.type) {
    case "GET_QUESTIONS":
      return {
        ...state,
        ...action.data,
      };
    case "ADD_QUESTION":
      return {
        ...state,
        [action.data.id]: action.data,
      }
    case "UPDATE_QUESTIONS":
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
}
