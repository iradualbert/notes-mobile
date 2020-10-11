import React, { useEffect } from "react";
import { Header } from "@react-navigation/stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const NavigationBar = ({ title, goBack, }) => {
    useEffect(() => {
        console.log(Header)
    }, [])
    return (
        <View style={styles.navBar}>
          <Text>{title}</Text>
        </View>   
    )
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        height: 44
    }
});

export default NavigationBar;