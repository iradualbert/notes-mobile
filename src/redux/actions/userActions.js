import { Alert } from "react-native";
import {
    SET_UNAUTHENTICATED,
    SET_USER,
    LOADING_USER,
    SET_CONFIRMED_USER
} from "../types";
import axios from "axios";
import { config } from "../../utils";


// send confirmation code
export const submitCode = (userData, navigation) => (dispatch) => {
    const _submitCodeAsync = async () => {
        try{
            const res = await axios.post("accounts/activate/code", userData, config);
            const data = await res.data;
            dispatch({
                type: SET_CONFIRMED_USER,
                payload: data
            })
            Alert.alert('Success', 'Verified')
            navigation.navigate('Home')
        } catch(err){
            if(err.response){
                return err.response.data
            } else{
                Alert.alert("Network Error")
            }
        }
    };
    return _submitCodeAsync();
};

// resend code 
export const resendCode = (userData) => {
    const _resendCodeAsync = async () => {
        try {
            await axios.post("/accounts/activate/resend");
            Alert.alert('Email Sent', `We resent a verification code at ${userData.email}. Please check your email.`)
        } catch (err) {
            if (err.response) {
                console.log(err.response.data)
            } else {
                Alert.alert('Network Error')
            }
        }
    };
    return _resendCodeAsync();
};


// login user 
export const loginUser = (userData, navigation, next="Home") => (dispatch) => {
    return _logInAsync();
    async function _logInAsync(){
        try{
            const res = await axios.post('auth/login', userData, config);
            const data = await res.data;
            dispatch({
                type: SET_USER,
                payload: data
            })
            if(data.is_active){
                navigation.navigate(next)
            } else{
                navigation.navigate("Verification", {user: data.user})
            }
        }
        catch(err){
            if(err.response){
                const { data: errors } = err.response
                return errors
            } else {
                Alert.alert('Network Error')
            }
        };
    }
    
    
};

// register create account
export const registerUser = (userData, navigation) => dispatch => {
    return _handleRegister();
    async function _handleRegister(){
        try {
            const res = await axios.post("auth/register", userData, config);
            const data = await res.data
            dispatch({
                type: SET_USER,
                payload: data
            })
            navigation.navigate("Verification", { user: userData })
        } catch (err) {
            if (err.response) {
                const { data: errors } = err.response
                return errors
            } else {
                Alert.alert('Network error')
            }
        }
    }
};
// get user
export const getUserData = () => (dispatch) => {
    const _loadUserAsync = async () => {
        try{
            const res = await axios.get("/auth/user")
            const data = await res.data;
            dispatch({
                type: SET_USER,
                payload: data,
            });
        } catch(err){
            if(err.response){
                dispatch({ type: SET_UNAUTHENTICATED })
            } else{
                Alert.alert('Network Error')
            }
        }
        
    };
    return _loadUserAsync()
};

// logout
export const logoutUser = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios.post("/auth/logout");
    dispatch({ type: SET_UNAUTHENTICATED });
    removeAuthorizationHeader();
};