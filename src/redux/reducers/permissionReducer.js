const initialState = {
    cameraRoll: {
        requested: false,
        granted: false
    },
    location: {
        requested: false,
        granted: false
    },
    notification: {
        requested: false,
        granted: false
    },
};

export default (state=initialState, action) => {
    switch (action) {
        default:
            return state
    }
};