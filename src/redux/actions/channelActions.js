import {  
    LOADING_CHANNELS,
    SET_CHANNELS,
    STOP_LOADING_CHANNELS,
    SET_CURRENT_CHANNEL
} from  "../types";
import axios from "axios";

export const loadChannels = () => (dispatch) => {
    dispatch({type: LOADING_CHANNELS})
    axios
      .get('/channels/')
      .then( res => {
          const { channels, more_available} = res.data;
          dispatch({
              type: SET_CHANNELS,
              payload: {
                  channels: channels,
                  moreAvailable:  more_available,
              }
          })
      })
      .catch( err => {
          dispatch({ type: STOP_LOADING_CHANNELS})
      });
}

export const loadCurrentChannel = (channelId) => (dispatch) => {
    dispatch({type: LOADING_CHANNELS});
    axios
      .get(`/channels/${channelId}/`)
      .then(res => {
          dispatch({
              type: SET_CURRENT_CHANNEL,
              payload: res.data,
            });
      })
      .catch(err => {
          console.log(err)
          dispatch({type: STOP_LOADING_CHANNELS})
      })
}
