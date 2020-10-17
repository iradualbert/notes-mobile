import React from "react";
import { useNavigation } from "@react-navigation/native";
import { 
    View, 
    Text, 
    StyleSheet,
    Image,
    TouchableOpacity
} from "react-native";
import Category from "./Category";
import { colors, sizes } from "../../constants"
/**
 *
 * @param {{style: object, onPress: function}} props
 */
const ChannelCard = ({channel}) => {
    const {
        name,
        photo,
        cat,
        id,
        verified,
        website,
    } = channel
    const navigateChannel = () => navigation.navigate('Channel', { channel });
    
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={navigateChannel}>
                <Image source={{ uri: photo }} style={{ width: "100%", height: 120 }} />
            </TouchableOpacity>
            <View style={{ padding: 5, alignItems: "center" }}>
                <TouchableOpacity onPress={navigateChannel}>
                    <Text style={styles.name}>{name}</Text>
                </TouchableOpacity>
                <Category cat={cat} />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 220,
        backgroundColor: colors.white,
        margin: sizes.paddingXS,
        borderWidth: 1,
        borderColor: colors.gray2
    },
    name: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "400",
        marginBottom: 4
    },
   
})
export default ChannelCard;