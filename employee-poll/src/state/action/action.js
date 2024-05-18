
export const getUsersData = (data) => {
  return {
      type: "GET_USERS",
      data
  }
}

export const getQuestionsData = (data) => {
  return {
      type: "GET_QUESTIONS",
      data
  }
}

export const userLogin = (user) => {
  return {
      type: "LOGIN",
      user
  }
}

export const userLogout = () => {
  return {
      type: "LOGOUT"
  }
}

export const addQuestion = (data) => {
  return {
      type: "ADD_QUESTION",
      data
  }
}


export const updateQuestions = (data) => {
  return {
      type: "UPDATE_QUESTIONS",
      data
  }
}

export const updateUsers = (data) => {
  return {
      type: "UPDATE_USERS",
      data
  }
}