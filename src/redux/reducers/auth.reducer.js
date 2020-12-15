const initState = {
  authenticated: false,
  userData: null,
  resetRequest: false,
  error: "Something went wrong!",
};

export default (state = initState, action) => {
  // console.log("action => ", action);
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      return (state = {
        ...state,
        authenticated: true,
      });
    case "USER_LOGIN_FAILURE":
      return (state = {
        ...state,
        authenticated: false,
        error: action.payload,
      });
    case "RESET_SUCCESS":
      return (state = {
        ...state,
        resetRequest: true,
      });
    case "RESET_FAILURE":
      return (state = {
        ...state,
        resetRequest: false,
        error: action.payload,
      });
    case "USER_LOGOUT_SUCCESS":
      return (state = {
        ...state,
        authenticated: false,
      });
    case "USER_LOGOUT_FAILURE":
      return (state = {
        ...state,
        error: action.payload,
      });
    default:
      return state;
  }
};
