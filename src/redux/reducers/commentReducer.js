import axios from 'axios';

const initialState = {
    comments: [],
    comment: {}
}

const GET_COMMENTS = 'GET_COMMENTS';
const GET_COMMENT = 'GET_COMMENT';
export function getComments(id) {

    const comments = axios.get(`/api/comments/${id}`);

    return {
        type: GET_COMMENTS,
        payload: comments

    }
}

export function getComment(id){
    const comment = axios.get(`/api/comment/${id}`);
    return {
        type: GET_COMMENT,
        payload: comment
    }
}

export default function commentReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_COMMENTS + '_PENDING':
            return state;
        case GET_COMMENTS + '_FULFILLED':
            return { ...state, comments: payload };
        case GET_COMMENTS + '_REJECTED':
            return state;
            case GET_COMMENT + '_PENDING':
            return state;
        case GET_COMMENT + '_FULFILLED':
            return { ...state, comment: payload };
        case GET_COMMENT + '_REJECTED':
            return state;
        default:
            return state;
    }
}