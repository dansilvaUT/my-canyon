import axios from 'axios';

const initialState = {
    comments: []
}

const GET_COMMENT = 'GET_COMMENT';

export function getComments(id) {

    const comments = axios.get(`/api/comments/${id}`);

    return {
        type: GET_COMMENT,
        payload: comments

    }
}

export default function commentReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_COMMENT + '_PENDING':
            return state;
        case GET_COMMENT + '_FULFILLED':
            return { ...state, comments: payload };
        case GET_COMMENT + '_REJECTED':
            return state;
        default:
            return state;
    }
}