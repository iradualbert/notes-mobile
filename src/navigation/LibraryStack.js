import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { 
    LibraryScreen
} from "../screens/Library";

const Stack = createStackNavigator();

const LibraryStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Library" component={LibraryScreen} />
        </Stack.Navigator>
    )
};
export default LibraryStack;