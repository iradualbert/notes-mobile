import React from 'react'
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import CacheImage from "../CacheImage";
import Button from "../Button";
import Typography from "../Typography";
import axios from "axios";

const ChannelInfo = ({
    channel,
    isSubscribed,
}) => {
    const navigation = useNavigation();
    const user = useSelector(state => state.user);
    const [hasSubscribed, SetHasSubscribed] = useState(isSubscribed);
    const [isBtnDisabled, setIsBtnDisabled] = useState(false)
    const handleSubscribe = () => {
        if (user.isAuthenticated) {
            setIsBtnDisabled(true);
            axios
                .post('/subscriptions', { channel_id: channel.id })
                .then(() => SetHasSubscribed(true))
                .cath(err => console.log(err))
        } else {
            navigation.navigate('Login', {next: "BACK"})
        }
    };
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                
                <CacheImage
                    uri={channel.photo}
                    style={styles.image}
                />
                <Typography>{channel.name}</Typography>
                <Typography>{channel.subscribers}</Typography>
            </View>
            <Button style={style.button}>Subscribe</Button>
        </View>
    )
};

export default ChannelInfo;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    image: {
        height: 80,
        width: 80
    },
    button: {

    }
})
