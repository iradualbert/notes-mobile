import React from "react";
import { Text } from "react-native";
import ReadMore from "react-native-read-more-text";
import { colors } from "../../constants";

const Typography = ({
    padding,
    center,
    margin,
    style,
    children,
    fontSize,
    numberOfLines,
    fontWeight,
    ...rest
}) => {
    const pd = {padding}
    const mg = {margin}
    const ftSize = { fontSize }
    const ftWeight = { fontWeight }
    const textStyle = [padding && pd, margin && mg,  fontSize && ftSize, fontWeight && ftWeight, style ]

    const _renderTruncatedFooter = (handlePress) => {
        return (
            <Text style={{ color: colors.secondary, marginTop: 5 }} onPress={handlePress}>
                Read more
            </Text>
        );
    }

    const _renderRevealedFooter = (handlePress) => {
        return (
            <Text style={{ color: colors.secondary, marginTop: 5 }} onPress={handlePress}>
                Show less
            </Text>
        );
    }

    const _handleTextReady = () => {
        // ...
    }

    if(numberOfLines){
        return (
            <ReadMore
                numberOfLines={numberOfLines}
                renderTruncatedFooter={_renderTruncatedFooter}
                renderRevealedFooter={_renderRevealedFooter}
                onReady={_handleTextReady}
            >
                <Text style={textStyle} {...rest}>{children}</Text>
            </ReadMore>)
    }
    return (
        <Text style={textStyle} {...rest}>{children}</Text>
    )
}
export default Typography;