import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons } from "@expo/vector-icons";
// stacks
import AuthStackScreen from "./AuthStack";
import ProfileStackScreen from './ProfileStack';
import HomeStackScreen from "./HomeStack";
import LibraryStack from './LibraryStack';
import NotificationStack from './NotificationStack';
import NearbyStack from "./NearbyStack";
import {
    NewProduct
} from "../screens";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'account-circle' : 'account-circle';
                    } else if (route.name === "Nearby") {
                        iconName = "near-me"
                    } else if (route.name === 'Notifications') {
                        iconName = "notifications"
                    } else if (route.name === "Library") {
                        iconName = "bookmark"
                    }

                    // You can return any component that you like here!
                    return <MaterialIcons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showLabel: false
            }}
        >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Nearby" component={NearbyStack} />
            <Tab.Screen name="Library" component={LibraryStack} />
            <Tab.Screen name="Notifications" component={NotificationStack} />
            <Tab.Screen name="Profile" component={ProfileStackScreen} />
        </Tab.Navigator>
    )
}

const Navigator = () => {
    const { isAuthenticated, token } = useSelector(state => state.user);
    useEffect(() => {
        if(isAuthenticated && token){
            axios.defaults.headers.common['Authorization'] = token;
        } else {
            delete axios.defaults.headers.common['Authorization']
        }
        return () => {
            delete axios.defaults.headers.common['Authorization']
        }
    }, [isAuthenticated, token])
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{headerShown: false}}
            >
                <Stack.Screen name="Home" component={MainTabs} />
                <Stack.Screen name="Auth" component={AuthStackScreen} />
                <Stack.Screen name="New Product" component={NewProduct} /> 
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Navigator;
