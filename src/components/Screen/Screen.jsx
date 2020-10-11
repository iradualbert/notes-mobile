import React from "react";
import { ScrollView } from "react-native";

const Screen = ({children}) => {
    return (
        <ScrollView>
         {children}
        </ScrollView>
    )
}
export default Screen;