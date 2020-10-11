import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions/formActions";
import { UButton } from "../../components";
import { createStackNavigator } from "@react-navigation/stack";
import MainInfo from "./MainInfo";
import MoreInfo from "./MoreInfo";
import { colors } from "../../constants";

const Stack = createStackNavigator();



const CreateProduct = () => {
    const { 
        description, 
        link, 
        linkDisplay, 
        name, 
        price, 
        cat,
        photos,
        currency 
    } = useSelector(state => state.form);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleSubmit = () => {
        const data = { description, link, link_display: linkDisplay, cat, name, price, currency, photo: photos[0] }
        dispatch(createProduct(data, navigation))
    };
    return (
        <Stack.Navigator
            mode="modal"
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.secondary
                }
            }}
        >
            <Stack.Screen
                name="MainInfo"
                options={{
                    headerLeft: () => <UButton onPress={() => navigation.navigate('Home')}>Cancel</UButton>,
                    headerRight: () => <UButton onPress={handleSubmit}>Add</UButton>,
                    headerTitleAlign: "center",
                    headerTitle: "New Product / Service",        
                }}
                component={MainInfo}
            />
            <Stack.Screen
                name="MoreInfo"
                options={{
                    headerTitleAlign: "center",
                    headerTitle: "Additional Information"
                }}
                component={MoreInfo}
            />
        </Stack.Navigator>
    )
};

export default CreateProduct;
