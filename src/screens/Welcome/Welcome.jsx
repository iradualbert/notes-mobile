import React, { useState } from "react";
import {
    Dimensions,
    View,
    TouchableWithoutFeedback,
    StyleSheet
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
    Button,
    Typography
} from "../../components";
import { colors, sizes } from "../../constants";

const { width, height } = Dimensions.get('window')

const Welcome = props => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Typography
                style={{ marginBottom: height / 5, fontSize: 40,  fontWeight: "500", textAlign: "center" }}
            >
                Parknote
            </Typography>
            <Button
                onPress={() => navigation.navigate('Signup')}
                bg={colors.primary}
            >
                Create Account
            </Button>
            <Button onPress={() => navigation.navigate('Login')}>Log In</Button>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
                <View style={{ alignItems: "flex-end", marginVertical: 40 }}>
                    <Typography style={styles.skipButton}>Skip</Typography>
                </View>
            </TouchableWithoutFeedback>
            
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        paddingTop: height/ 10,
        padding: sizes.paddingMd,
        flex: 1
    },
    skipButton: {
        fontSize: 20,
        fontWeight: "400",
        textDecorationLine: "underline"
    }
});

export default Welcome;
