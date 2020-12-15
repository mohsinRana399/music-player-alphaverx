import fire from "../../firebase";

export const signUp = (data) => {
  return async (dispatch) => {
    fire
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        console.log("User Signed in");
        dispatch({ type: "USER_LOGIN_SUCCESS" });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({ type: "USER_LOGIN_FAILURE", payload: errorMessage });
        console.log({ errorCode }, { errorMessage });
      });
  };
};
export const signIn = (data) => {
  return async (dispatch) => {
    fire
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        dispatch({ type: "USER_LOGIN_SUCCESS" });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        dispatch({ type: "USER_LOGIN_FAILURE", payload: errorMessage });
      });
  };
};
export const resetPassword = (email) => {
  return async (dispatch) => {
    var auth = fire.auth();
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        dispatch({ type: "RESET_SUCCESS" });
      })
      .catch(function (error) {
        dispatch({ type: "RESET_FAILURE", payload: error });
      });
  };
};
export const signOut = () => {
  return async (dispatch) => {
    fire
      .auth()
      .signOut()
      .then(function () {
        dispatch({ type: "USER_LOGOUT_SUCCESS" });
      })
      .catch(function (error) {
        dispatch({ type: "USER_LOGOUT_FAILURE" });
      });
  };
};
