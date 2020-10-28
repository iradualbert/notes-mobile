import React from "react";
import { ScrollView } from "react-native";

const Screen = ({children}) => {
    return (
        <ScrollView style={{ padding: 5}}>
         {children}
        </ScrollView>
    )
}
export default Screen;