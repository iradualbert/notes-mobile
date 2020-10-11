import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity, Text } from "react-native";
import {
    Home,
    Product,
    Channel
} from "../screens";
import { UButton } from "../components";


const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
    const navigation = useNavigation();
    
    return (
        <HomeStack.Navigator
            mode="modal"
            screenOptions={{
                gestureEnabled: true,
                headerBackTitleVisible: false
            }}
            
        >

            <HomeStack.Screen
                name="Home"
                component={Home}
                options={{
                    headerRight: () => (
                        <UButton onPress={() => navigation.navigate('New Product')}>
                           Create
                        </UButton>
                    )
                }}
            />
            <HomeStack.Screen
                name="Channel"
                component={Channel}
                options={{ 
                    headerBackImage: "",
                    headerBackTitle: null,
                    // headerShown: false
                    }} 
            />
            <HomeStack.Screen
                name="Product"
                component={Product} 
                />
        </HomeStack.Navigator>
    )
}




export default HomeStackScreen;



