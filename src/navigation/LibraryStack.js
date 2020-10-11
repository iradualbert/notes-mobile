import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function Library() {
    return (
        <View style={styles.container}>
            <Text>Libray coming soon</Text>
            <Text>Saved</Text>
            <Text>Questions</Text>
            <Text>Reviews</Text>
            <Text>Answers</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})