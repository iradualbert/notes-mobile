import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/actions/userActions";
import {
    Button,
    Input,
    KeyboardScreen,
    Typography,
    UButton
} from "../../components";
import { colors } from "../../constants";

const Login = props => {
    const { navigation } = props;
    const [username, setUsername] = useState("iradualbert");
    const [password, setPassword] = useState("albe4040");
    const dispatch = useDispatch()
    const _login = () => {
        const userData = { username, password};
        dispatch(loginUser(userData, navigation))
    };
    return (
        <KeyboardScreen padding={10} style={styles.container} backgroundColor="white">
            <Input
                label="Username"
                onChangeText={text => setUsername(text)}
                autoFocus={true}
                value={username}
            />
            <Input
                label="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <Button
                disabled={!(username && password)}
                onPress={() => _login()}
                bg={colors.primary}
            >
                Login
            </Button>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 10}}>
                <Typography fontSize={16}>Don't have an account?</Typography>
                <UButton onPress={() => navigation.navigate("Signup")}>Sign Up</UButton>
            </View>
        </KeyboardScreen>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    }
});
export default Login;