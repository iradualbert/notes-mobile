import React from "react";
import { View, StyleSheet } from "react-native";

export default ({ children, style, flex}) => {
    const styles = StyleSheet.create({
        center: {
            justifyContent: "center",
            alignItems: "center",
            flex: flex !== undefined ? flex : 1
        }
    })
    return (
        <View style={[styles.center, style]}>
            {children}
        </View>
    )
};



