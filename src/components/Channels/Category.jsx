import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../constants";
import Typography from "../Typography";


const Category = ({cat}) => {
    return (
        <Typography style={styles.cat}>{cat}</Typography>
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
