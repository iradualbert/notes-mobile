import React, { useEffect, useState } from "react";
import { Platform, Image as RNImage } from "react-native";
import * as FileSystem from "expo-file-system";

export default function CacheImage({uri, style, ...rest}) {
    const [source, setSource] = useState({
        uri
    });
    if (Platform.OS === "web") {
        return (
            <RNImage {...rest} style={style} source={source} />
        )
    }

    useEffect(() => {
        _getInfo()
    }, []);

    const _getInfo = async () => {
        const path = FileSystem.cacheDirectory + uri;
        const image = await FileSystem.getInfoAsync(path);
        if(image.exists){
            setSource({uri: image.uri})
        } else {
            const newImage = await FileSystem.downloadAsync(uri, uri)
            setSource({uri: newImage.uri})
        }
    };

    return <RNImage {...rest} style={style} source={source} />

    
}

