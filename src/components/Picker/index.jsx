import React from "react";
import { 
    View,
    Picker,
    StyleSheet,
    Text 
} from "react-native";
import { sizes } from "../../constants"


const Select  = ({
    options,
    label,
    value,
    onValueChange,
    valueExtractor,
    labelExtractor,
    style
}) => {
    

    return (
        <View style={[{paddingTop: 5},style]}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <Picker
                onValueChange={onValueChange}
                value={value}
                style={styles.picker}>
                <Picker.Item value="" label="None" />
                {options.map(item => (
                    <Picker.Item label={item} value={item} key={item} />
                ))}
            </Picker>
        </View>
    )
};

const styles = StyleSheet.create({
    label: {
        fontSize: sizes.labelSize,
        fontWeight: sizes.labelWeight,
        paddingBottom: sizes.paddingXS
    },
    picker: {
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        borderColor: "white"
    },

});

export default Select;