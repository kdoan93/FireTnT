import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

// POJO action creator: Sets user in session slice of state to action creator's input params
const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

// POJO action creator: Removes user
const removeUser = () => {
    return {
      type: REMOVE_USER,
    };
};

// login thunk action for 'POST /api/session'
export const login = (user) => async (dispatch) => {
    const { credential, password } = user;
    // don't forget to use csrfFetch()
    const response = await csrfFetch("/api/session", {
        method: "POST",
        body: JSON.stringify({
            credential,
            password,
        }),
  });
  // sets a variable that parses the JSON body of the response
  const data = await response.json();
  // dispatch the POJO action creator 'setUser()' with data.user in param
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

// Holds the current session user's info (session slice of state)
const sessionReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
      case SET_USER:
        newState = Object.assign({}, state);
        newState.user = action.payload;
        return newState;
      case REMOVE_USER:
        newState = Object.assign({}, state);
        newState.user = null;
        return newState;
      default:
        return state;
    }
  };

  export default sessionReducer;
