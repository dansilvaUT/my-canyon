import axios from 'axios';

const initialState = {
    canyons: [],
    canyon: {}
}

const GET_CANYONS = 'GET_CANYONS';
const GET_CANYON = 'GET_CANYON';

export function getCanyons() {
    const canyons = axios.get('/api/canyons');
    return {
        type: GET_CANYONS,
        payload: canyons
    }
}

export function getCanyon(id) {
    const canyon = axios.get(`/api/canyon/${id}`);
    return {
        type: GET_CANYON,
        payload: canyon
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
        case GET_CANYON + '_PENDING':
            return state;
        case GET_CANYON + '_FULFILLED':
            return { ...state, canyon: payload };
        case GET_CANYON + '_REJECTED':
            return state;
        default:
            return state;
    }
}