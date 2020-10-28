import React, { useState, useEffect } from "react";
import {
    ScrollView,
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    SafeAreaView
} from "react-native";
import { useSelector } from "react-redux";
import {
    Typography
} from "../../components";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { colors, sizes } from "../../constants";

const tabs = [
    {
        name: "Edit Profile",
        icon: "account-edit",
        link: ""
    },
    {
        name: "Channel",
        icon: "account-badge-horizontal-outline",
        link: "",
    },
    {
        name: "Switch Account",
        icon: "account-switch",
        link: "",
    },
    {
        name: "Settings",
        icon: "settings-outline",
        
    },
    {
        name: "Language",
        icon: "",

    },
    {
        name: "Help & Feedback",
        icon: "help-circle-outline",

    },
    {
        name: "Logout",
        icon: "logout",
        link: null,
    }
]

const ProfileScreen = props => {
    const [user, settings] = useSelector(state => [state.user, state.settings])
    const { credentials: { username, fullname, email} } = user
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                bounces={true}
            >
                <View style={{ alignItems: "center", width: "100%", padding: 20, backgroundColor: colors.white }}>
                    <FontAwesome name="user-circle" size={80} color={colors.gray2} />
                    <Typography style={{ fontSize: 24, padding: 10, fontWeight: "500"}}>{fullname}</Typography>
                    <Typography style={{ fontSize: 20, padding: 10, fontWeight: "400"}}>{username}</Typography>
                    <Typography>{email}</Typography>
                </View>
                <View style={{ borderTopColor: colors.light2, borderStyle: "solid", borderTopWidth: 1 }}>
                    {tabs.map((tab, id) => {
                        return (
                            <TouchableWithoutFeedback key={id}>
                                <View style={styles.tab}>
                                    {
                                        tab.name === "Language" ?
                                            <FontAwesome name="language" size={24} /> :
                                            <MaterialCommunityIcons name={tab.icon} size={24} color={colors.black} />
                                    }
                                    <Typography fontSize={18} style={{ marginLeft: 15, fontWeight: "400" }}>{tab.name}</Typography>
                                </View> 
                            </TouchableWithoutFeedback>
                          
                    )
                })}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:  colors.white
    },
    tab: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: sizes.paddingMd * 0.8,
        borderBottomWidth: 1,
        borderStyle: "solid",
        borderColor: colors.light2
    }
})

export default ProfileScreen;