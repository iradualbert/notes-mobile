import {
    LOADING_CHANNELS,
    SET_CHANNELS,
    STOP_LOADING_CHANNELS,
    SET_CURRENT_CHANNEL,
    UNSET_CURRENT_CHANNEL
} from "../types";

const initialState = {
    loading: true,
    offset: 0,
    channels: [],
    currentChannel: {},
    moreAvailable: true
}



export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_CHANNELS:
            return {
                ...state,
                loading: true,
            }
        case SET_CHANNELS:
            const {channels, moreAvailable } = action.payload;
            return {
                ...state,
                channels: channels,
                loading: false,
                offset: state.offset + channels.length,
                moreAvailable: moreAvailable
            }
        case STOP_LOADING_CHANNELS:
            return {
                ...state,
                loading: false
            }

        case SET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: action.payload
            }
        
        case UNSET_CURRENT_CHANNEL:
            return {
                ...state,
                currentChannel: {}
            }
    
        default:
            return state
    }
}