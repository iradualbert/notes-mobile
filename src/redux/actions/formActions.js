import { Alert } from "react-native";
import axios from "axios";
import { 
    SET_CREATE_PRODUCT_ERRORS, 
    RESET_FORM,
    SET_LOADING_CREATE_PRODUCT
} from "../types";


const config = {
    headers: {
        "Content-Type": "application/json",
    },
};

export const createProduct = (data, navigation) => ( dispatch ) => {
    dispatch({ type: SET_LOADING_CREATE_PRODUCT })
    _createProduct();
    async function _createProduct (){
        try{
            await axios.post("/products/", data, config)
            navigation.navigate('Home');
            Alert.alert('', 'Posted Successfully')
            dispatch({ type: RESET_FORM })
        } catch(err){
            if(err.response){
                const errors = err.response.data;
                dispatch({
                    type: SET_CREATE_PRODUCT_ERRORS,
                    payload: errors
                });
                navigation.navigate('MainInfo');
            } else {
                Alert.alert('Network Error')
            }
        }
    }
}