import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import {
  KeyboardScreen,
  Input,
  Button
} from "../../components";
import { submitCode } from "../../redux/actions/userActions";

const Verification = props => {
  const {
    navigation,
    route
  } = props;
  const dispatch = useDispatch();
  const { user } = route.params;
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});

  const _submitCodeAsync = async () => {
    const derivedErrors =  await dispatch(submitCode({code}, navigation));
    console.log(derivedErrors)
    if(derivedErrors !== undefined){
      setErrors(derivedErrors)
    } else{
      setErrors({})
    }
  };

  return (
    <KeyboardScreen padding={10} style={styles.container} backgroundColor="white">
      <Text>Enter the verification code that was sent to {user.email}</Text>
      <Input
        label={"Verification Code"}
        value={code}
        error={errors.code}
        autoFocus={true}
        keyboardType={"numeric"}
        onTextChange={setCode}
        helperText="Enter the verification code that was sent to your email"
      />
      <Button onPress={_submitCodeAsync}>Submit</Button>
    </KeyboardScreen>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})
export default Verification;