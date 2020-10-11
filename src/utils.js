import { Platform } from "react-native";

export const createForm = (photo, body) => {
    const data = new FormData();
    data.append('photo', {
        name: photo.filename,
        uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
    });
    Object.keys(body).forEach(key => {
        data.append(key, body[key])
    })
    return data
}

export const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

