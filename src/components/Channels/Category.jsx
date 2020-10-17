import React from "react";
import { Text, StyleSheet } from "react-native";
import { colors } from "../../constants";


const Category = ({cat}) => {
    return (
        <Text style={styles.cat}>{cat}</Text>
    )
};

const styles = StyleSheet.create({
    cat: {
        backgroundColor: colors.light,
        textAlign: "center",
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 10
    }
});
export default Category;
