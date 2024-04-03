const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const GET_USER = 'session/viewUser'

const getUser = (user) => ({
  type: GET_USER,
  user
})

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER
});


export const thunkGetCurrentUser = () => async(dispatch) => {
  const res = await fetch(`/api/users/current`)
  console.log('Am i gettting here?')
  console.log("🚀 ~ thunkGetCurrentUser ~ res:", res)

	const data = await res.json();
	console.log("🚀 ~ thunkGetCurrentUser ~ data:", data)
	if (data.errors) {
		return data;
	}
	dispatch(getUser(data));

}


export const thunkAuthenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/");
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}

		dispatch(setUser(data));
	}
};

export const thunkLogin = (credentials) => async dispatch => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  });

  if(response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    console.log("🚀 ~ thunkLogin ~ errorMessages:", errorMessages)
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkSignup = (user) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  if(response.ok) {
    const data = await response.json();
    console.log("🚀 ~ thunkSignup ~ data:", data)
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    console.log("🚀 ~ thunkSignup ~ errorMessages:", errorMessages)
    return errorMessages
  } else {
    return { server: "Something went wrong. Please try again" }
  }
};

export const thunkLogout = () => async (dispatch) => {
  await fetch("/api/auth/logout");
  dispatch(removeUser());
};

const initialState = { user: null };

function sessionReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}

export default sessionReducer;
