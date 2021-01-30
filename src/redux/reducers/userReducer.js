const initialState = {
    user: {}
}

const GET_USER = 'GET_USER';
const CLEAR_USER = 'CLEAR_USER';

export function getUser(userObj) {
    return {
        type: GET_USER,
        payload: userObj
    }
}

export function clearUser() {
    return {
        type: CLEAR_USER,
        payload: {}
    }
}

export default function userReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_USER:
            return { ...state, user: payload };
        case CLEAR_USER:
            return { ...state, user: payload };
        default:
            return state;
    }
}