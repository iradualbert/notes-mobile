import React from "react";
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    View,
    ScrollView,
    StyleSheet
} from "react-native";

function KeyboardContainer({
    style,
    padding,
    margin,
    children,
    backgroundColor,
    ...rest
}) {
    const pd = {padding};
    const mg = {margin};
    const innerStyles = [padding && pd, margin && mg, style, {flex: 1}]
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={[styles.container, {backgroundColor: backgroundColor ? backgroundColor: "white"}]}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View {...rest} style={innerStyles}>
                    {children}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default KeyboardContainer;