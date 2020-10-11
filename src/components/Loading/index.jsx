import React, { useEffect } from "react";
import {
    View,
    Text,
    StatusBar,
    StyleSheet
} from "react-native";

const Loading = () => {
    useEffect(() => {
        StatusBar.setHidden(true);
        return () => {
            StatusBar.setHidden(false);
        }
    }, [])
    return (
        <View styles={styles.container}>
           <Text>Loading.....</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
export default Loading;