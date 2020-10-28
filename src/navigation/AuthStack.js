import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Login,
    Signup,
    Verification,
    Welcome
} from "../screens";
const AuthStack = createStackNavigator();

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator
        >  
           <AuthStack.Screen name="Welcome" options={{ headerShown: false }}  component={Welcome} />
           <AuthStack.Screen name="Login" component={Login}/>
           <AuthStack.Screen name="Signup" component={Signup} />
           <AuthStack.Screen name="Verification" component={Verification} />
        </AuthStack.Navigator>
    )
};

export default AuthStackScreen;