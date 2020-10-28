import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "../screens";


const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator> 
            <ProfileStack.Screen
                name="Profile"
                component={ProfileScreen} 
            />
        </ProfileStack.Navigator>
    )
}

export default ProfileStackScreen;