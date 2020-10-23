import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { colors } from "../../constants";


const Ratings = ({
    readOnly = false,
    value = 0,
    onChange,
    size=20,
    spacing=0,
    color=colors.orange
}) => {
    const [localValue, setLocalValue] = useState(value);
    const Star = ({ id }) => {
        let starStyle = { margin : spacing / 2};
        let name;
        const ss = parseFloat(id.toString() + ".3");
        const sl = parseFloat(id.toString() + ".7");

        if (localValue >= ss && localValue <= sl) {
            name = "md-star-half"
        } else if (localValue >= id) {
            name = "ios-star"
        } else {
            name = "ios-star-outline"
        }

        const _handlePress = () => {
            if (readOnly) return
            if (typeof onChange === "function") {
                onChange(id);
            }
            setLocalValue(id)
        }

        return (
            <Ionicons
                style={starStyle}
                onPress={_handlePress}
                name={name}
                size={size}
                color={color}
            />)
    }
    return (
        <View style={styles.stars}>
            {Array(5).fill(0).map((_, index) =>
                <Star id={index + 1} key={index} />
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    stars: {
        flexDirection: "row"
    }
})

export default Ratings;