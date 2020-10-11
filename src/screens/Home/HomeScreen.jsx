import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import {  loadChannels } from "../../redux/actions/channelActions";
import {
    Button,
    Screen,
    ChannelCard
} from "../../components";



const HomeScreen = () => {
    const { channels: {channels} } = useSelector(state => state);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(loadChannels())
    }, []);

    const renderSuggestedChannels = () => {
        return (
            <View>
                <Text>Suggested Channels</Text>
                <ScrollView horizontal>
                    {channels.map(channel => (
                        <ChannelCard key={channel.id} channel={channel} />
                    ))}
                </ScrollView>
            </View>
            
        )
    };

    return (
        <Screen>
          <Button onPress={() => {navigation.navigate('Auth')}}>Go To Auth</Button>
          {renderSuggestedChannels()}
        </Screen>
    )
};

export default HomeScreen;