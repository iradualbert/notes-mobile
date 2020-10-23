import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import Typography from "../Typography";
import Ratings from "./Ratings";
import { sizes, colors } from "../../constants";

const parseDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleString()
}

const placeholderImage = "https://st2.depositphotos.com/4111759/12123/v/950/depositphotos_121233262-stock-illustration-male-default-placeholder-avatar-profile.jpg";
const { width } = Dimensions.get("screen");
const Review = ({ review, fullWidth=false }) => {
    const { 
        user, 
        body, 
        rate, 
        created_at
    } = review
    const _width = fullWidth ? null : { width: width - 100}
    return (
        <View style={[styles.container, _width]}>
            <View style={styles.userContainer}>
                <Image source={{ uri: user.photo ? user.photo : placeholderImage }} style={styles.image}/>
                <View style={{marginLeft: 20}}>
                    <Typography padding={5} fontSize={16}>{user.fullname ? user.fullname : user.username}</Typography>
                    <Ratings value={rate} readOnly/>
                    <Typography numberOfLines={5} padding={5}>{parseDate(created_at)}</Typography>
                </View>
            </View>
            <Typography fontSize={16} style={{marginTop: 10}}>{body}</Typography>
        </View>
    ) 
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        padding: 15,
        margin: sizes.paddingSM,
        borderRadius: 20,
    },
    userContainer: {
        flexDirection: "row",
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    body: {
        marginLeft: sizes.paddingSM,
    },

});

export default Review;