import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Profile } from "../screens";


const ProfileStack = createStackNavigator();
const options = { headerShown: false }
const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator> 
            <ProfileStack.Screen
                name="Account"
                component={Profile} 
            />
        </ProfileStack.Navigator>
    )
}

export default ProfileStackScreen;