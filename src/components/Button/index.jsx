import React from "react";
import {
    View,
    Text, 
    StyleSheet,
    TouchableWithoutFeedback
} from "react-native";
import { sizes, colors } from "../../constants";

/**
 *
 * @param {{style: object, onPress: function, disabled: boolean, bg: string }} props
 */

function Button({
    children,
    style,
    onPress,
    underlined = false,
    disabled = false,
    bg,
    ...props
}){
    const renderChildren = () => {
        if (typeof children === "string") {
            return <Text style={styles.text}>{children}</Text>
        } else {
            return children
        }
    };
    const buttonStyles = [
        styles.button,
        { backgroundColor: (!bg || disabled) ? colors.light2 : bg},
    ];
    const handlePress = () => {
        if (disabled) return;
        if (typeof onPress === "function") {
            onPress()
        }
    }
    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View
                style={buttonStyles}
                {...props}
            >
                {renderChildren()}
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        marginVertical: sizes.paddingMd / 3,
        borderRadius: sizes.paddingSM
    },
    text: {
        fontSize: 20,
        fontWeight: "500"
    }
})


export default Button;
export { default as UButton } from "./UButton";
