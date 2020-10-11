import React from "react";
import { StyleSheet, Text } from "react-native";

const Typography = ({
    padding,
    center,
    margin,
    style,
    children,
    fontSize,
    fontWeight,
    ...rest
}) => {
    const pd = {padding}
    const mg = {margin}
    const ftSize = { fontSize }
    const ftWeight = { fontWeight }
    const textStyle = [padding && pd, margin && mg,  fontSize && ftSize, fontWeight && ftWeight, style ]
    return (
        <Text style={textStyle} {...rest}>{children}</Text>
    )
}
export default Typography;