import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from "@expo/vector-icons";
// stacks
import AuthStackScreen from "./AuthStack";
import ProfileStackScreen from './ProfileStack';
import HomeStackScreen from "./HomeStack";
import LibraryStack from './LibraryStack';
import NotificationStack from './NotificationStack';
import NearbyStack from "./NearbyStack";
import NewProductStack from "../screens/NewProduct";

const Tab = createBottomTabNavigator();
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
            <Tab.Navigator>
                <Tab.Screen name="Home" component={MainTabs} options={{ tabBarVisible: false }} />
                <Tab.Screen name="New Product" component={NewProductStack} options={{ tabBarVisible: false }} />
                <Tab.Screen name="Auth" component={AuthStackScreen} options={{ tabBarVisible: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
};

export default Navigator;
