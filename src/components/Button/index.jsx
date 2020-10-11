import React from "react";
import {
    View,
    TouchableOpacity,
    Text, 
    StyleSheet
} from "react-native";
import { sizes, colors } from "../../constants";
const styles = StyleSheet.create({
    button: {
        borderRadius: sizes.radius,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        marginTop: 10
        
    },
    text: {
        fontSize: 18,
    }
});

/**
 *
 * @param {{style: object, onPress: function, disabled: boolean, color: string }} props
 */
export default function ({
    children,
    style,
    onPress,
    disabled,
    ...rest
}) {
    const renderChildren = () => typeof children === "string" ?
        <Text {...rest} style={styles.text}>{children}</Text>
        : {children}

    const buttonStyles = [
        styles.button,
        style,
        !style && {backgroundColor: colors.gray2},
        disabled && {backgroundColor: colors.light}
    ]
    const _onPress = disabled ? () => {} : onPress;
    return (
        <View style={buttonStyles}>
            <TouchableOpacity onPress={_onPress}>
                {renderChildren()}
            </TouchableOpacity>
        </View>
    )
};
export { default as UButton } from "./UButton";
