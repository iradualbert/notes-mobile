import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";

const UnderlinedButton = ({
    children,
    onPress,
    style
}) => {
    const handlePress = () => {
        if( onPress !== undefined ){
            onPress()
        }
    };
    return (
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.text}>{children}</Text>
        </TouchableOpacity>
    )
};
const styles = StyleSheet.create({
    button: {

    },
    text: {
        fontSize: 16,
        textTransform: "capitalize",
        padding: 10,
        textDecorationLine: "underline"
    }
});
export default UnderlinedButton;