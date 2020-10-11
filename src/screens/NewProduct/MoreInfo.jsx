import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SET_ADDITIONAL_INFO } from "../../redux/types";
import { Input, KeyboardScreen } from "../../components"
import { View, StyleSheet } from "react-native";

function AddDescription({ navigation }) {
    const [linkDisplay, setLinkDisplay] = useState('');
    const [price, setPrice] = useState('');
    const [cat, setCat] = useState('');
    const dispatch = useDispatch();

    const goBack = () => {
        const data = { linkDisplay, price, cat}
        dispatch({
            type: SET_ADDITIONAL_INFO,
            payload: data
        })
    }
    return (
        <KeyboardScreen padding={10}>
            <Input
                value={linkDisplay}
                onTextChange={setLinkDisplay}
                label="Link Display"
                helperText="Display text for the Link"
            />
            <Input
                value={cat}
                onTextChange={setCat}
                label="Category"
                placeholder="Foods"
            />
            <View style={styles.row}>
                <Input
                    value={price}
                    style={styles.rowInput}
                    onTextChange={setPrice}
                    label="Price"
                    placeholder="Price"
                    helperText="If applicable."
                />
                <Input
                    value={price}
                    onTextChange={setPrice}
                    style={styles.rowInput}
                    label="Currency"
                    placeholder="Currency"
                />
            </View>
            
        </KeyboardScreen>
    )
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        width: "100%"
    },
    rowInput: {
        width: "45%",
        marginRight: 10
    }
});

export default AddDescription