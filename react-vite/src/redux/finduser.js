const GET_SHARING_USER = "user/findUser"

const getSharedUser = (findUser) => ({
    type: GET_SHARING_USER,
    findUser
})

export const thunkGetSharedUser = (email) => async (dispatch) => {
    console.log("🚀 ~ thunkGetSharedUser ~ email:", email)
    const res = await fetch("/api/users/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email})
    });

    const data = await res.json();
    console.log("🚀 ~ thunkGetSharedUser ~ data:", data)
    if(data.errors){
        return data.errors;
    }
    return dispatch(getSharedUser(data))
}

export default function findUserReducer(state={}, action){
    let newState;
    switch(action.type){
        case GET_SHARING_USER:
            newState = {...state, [action.findUser.id]: action.findUser };
        default:
            return state;
    }
}
