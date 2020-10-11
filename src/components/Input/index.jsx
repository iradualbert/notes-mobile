import React from "react";
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    Platform
} from "react-native";
import {
    sizes,
    colors
} from "../../constants"

/**
 *
 * @param {{style: object, helperText: string, onTextChange: function, disabled: boolean, color: string, multiline: boolean, numberOfLines: number, placeholder: string, autoFocus: boolean}} props
 */
function Input({
    helperText,
    error,
    label,
    value,
    style,
    onTextChange,
    multiline,
    numberOfLines,
    ...rest
}){

    const handleErrorHelper = () => {
        if(error){
            return <Text style={styles.error}>{error}</Text>
        } else if(helperText){
            return <Text style={styles.helperText}>{helperText}</Text>
        } 
        return null
    }

    const inputStyle = {
        minHeight: (Platform.OS === "ios" && numberOfLines) ? numberOfLines * 30 :null,
        borderColor: error ? colors.accent : colors.secondary,
    }

    return (
        <View style={[styles.container, style]}>
            {label ? <Text style={styles.text}>{label}</Text> : null}
            <TextInput
                style={[styles.input, inputStyle]}
                onChangeText={onTextChange}
                value={value}
                multiline={multiline}
                numberOfLines={numberOfLines}
                {...rest}
            />
            {handleErrorHelper()}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        marginVertical: sizes.paddingSM
    },
    input: {
        padding: sizes.paddingSM,
        backgroundColor: colors.light,
        borderRadius: 10,
        fontWeight: "400",
        fontSize: 16,
        borderWidth: 1,
        width: "100%"
    },
    text: {
        fontSize: 18,
        fontWeight: "500",
        marginBottom: sizes.paddingXS
    },
    helperText: {
        fontSize: 14,
        fontWeight: "300",
        paddingVertical: 5
    },
    error: {
        fontSize: 14,
        fontWeight: "300",
        paddingVertical: 5,
        color: "tomato"
    }
});

export default Input;