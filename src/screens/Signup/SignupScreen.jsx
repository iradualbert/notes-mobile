import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";
import {
    Button,
    Input,
    Typography,
    UButton,
    KeyboardScreen
} from "../../components";

const Signup = (props) => {

    const { navigation } = props;
    const [email, setEmail] = useState("albert.iradukunda@gmail.com");
    const [fullname, setFullname] = useState("Albert Iradukunda");
    const [username, setUsername] = useState("iradualbert");
    const [password, setPassword] = useState("albe4040");
    const [errors, setErrors] = useState({});
    const [birthday, setBirthday] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const _signUpAsync = async () => {
        setLoading(true);
        const userData = { email, fullname, password, username };
        const derivedErrors = await dispatch(registerUser(userData, navigation));
        setLoading(false)
        if(derivedErrors !== null && derivedErrors !== undefined){
            setErrors(derivedErrors)
        } else{
            setErrors({});
        }
    };
    return (
        <KeyboardScreen style={styles.container} padding={10} backgroundColor="white">
            <Input
                label="Email"
                onChangeText={text => setEmail(text)}
                autoFocus={true}
                value={email}
                error={errors.email}
                helperText={`You'll need to verify this email.`}
            />
            <Input
                label="Full Name"
                onChangeText={text => setFullname(text)}
                error={errors.fullname}
                value={fullname}
            />
            <Input
                label="Username"
                onChangeText={text => setUsername(text)}
                value={username}
                error={errors.username}
            />
            <Input
                label="Password"
                secureTextEntry={true}
                value={password}
                error={errors.password}
                onChangeText={text => setPassword(text)}
            />
            <Button
                disabled={!(username && password && email && fullname && !loading)}
                onPress={_signUpAsync}
            >
                Signup
            </Button>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 10}}>
                <Typography fontSize={16}>Already have an account?</Typography>
                <UButton onPress={() => navigation.navigate("Login")}>Log In</UButton>
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
export default Signup;