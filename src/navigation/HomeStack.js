import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
    Home,
    Product,
    Channel,
    ProductReviews,
    WriteReview
} from "../screens";
import { UButton } from "../components";


const HomeStack = createStackNavigator()

const HomeStackScreen = () => {
    const navigation = useNavigation();
    
    return (
        <HomeStack.Navigator
            
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
            <HomeStack.Screen
                name="Reviews"
                component={ProductReviews} 
            />
            <HomeStack.Screen
                name="Write Review"
                component={WriteReview} 
            />
        </HomeStack.Navigator>
    )
}




export default HomeStackScreen;



