import axios from 'axios';

const initialState = {
    canyons: []
}

const GET_CANYONS = 'GET_CANYONS';

export function getCanyons() {
    const canyons = axios.get('/api/canyons');
    return {
        type: GET_CANYONS,
        payload: canyons
    }
}

export default function canyonReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CANYONS + '_PENDING':
            return state;
        case GET_CANYONS + '_FULFILLED':
            return { ...state, canyons: payload };
        case GET_CANYONS + '_REJECTED':
            return state;
        default:
            return state;
    }
}