import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
    SafeAreaView,
    TouchableWithoutFeedback
} from "react-native";
import { useSelector } from "react-redux";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome} from "@expo/vector-icons";
import { Typography } from "../../components";
import { colors, sizes } from "../../constants";
import axios from "axios";

const icons = {
    mci: MaterialCommunityIcons,
    mc: MaterialIcons,
    fa: FontAwesome,
    
}

const LibraryScreen = (props) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const user = useSelector(state => state.user);
    const tabs = [
        {
            name: "Saved",
            IconType: icons.mci,
            IconName: "bookmark",
            navigateTo: "Saved",
            count: data.saved
        },
        {
            name: "Collections",
            IconType: icons.fa,
            IconName: "list",
            navigateTo: "Collections",
            count: data.saved
        },
        {
            name: "Subscriptions",
            IconType: icons.mci,
            IconName: "account-badge-horizontal",
            navigateTo: "Subscriptions",
            count: data.subscriptions
        },
        {
            name: "Reviews",
            IconType: icons.mc,
            IconName: "rate-review",
            navigateTo: "My Reviews",
            count: data.reviews
        },
        {
            name: "Questions",
            IconType: icons.mci,
            IconName: "comment-question-outline",
            navigateTo: "My Questions",
            count: data.questions
        },
        
    ]

    useEffect(() => {
        if (user.isAuthenticated === false) {
            setLoading(false)
        } else {
            axios.get('user/info')
                .then(res => {
                    console.log(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err)
                    setLoading(false);
                })
        }
        
    }, []);
    return (
        <SafeAreaView style={{flex: 1}}>
            {loading ?
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Typography fontSize={20}>Loading.....</Typography>
                </View> :
                <ScrollView>
                    {tabs.map((Tab, id) => {
                        return (
                            <TouchableWithoutFeedback key={id}>
                                <View style={styles.tab}>
                                    <View style={{ flexDirection: "row"}}>
                                        <Tab.IconType name={Tab.IconName} size={24} color={colors.black} />
                                        <Typography
                                            fontSize={18}
                                            style={{ marginLeft: 15, fontWeight: "400" }}
                                        >
                                            {Tab.name}
                                        </Typography>
                                    </View>
                                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                                        <Typography style={{
                                            fontSize: 16,
                                            backgroundColor: colors.gray2,
                                        }}
                                        >{Tab.count}</Typography>
                                        <FontAwesome
                                            name="angle-right"
                                            size={24}
                                            color={colors.black}
                                            style={{ marginLeft: 15}}
                                        />
                                    </View>
                                </View> 
                            </TouchableWithoutFeedback>
                          
                    )
                })}
                </ScrollView>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    tab: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: sizes.paddingMd * 0.8,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: colors.light2
    }
})

export default LibraryScreen;