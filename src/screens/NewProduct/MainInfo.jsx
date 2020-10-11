import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { SET_MAIN_INFO } from "../../redux/types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Platform, Image, ScrollView, TouchableOpacity, StyleSheet, Text } from "react-native";
import { FontAwesome } from '@expo/vector-icons'; 
import { Input, KeyboardScreen, Button, Center } from "../../components";
import { colors } from "../../constants";

const NewProduct = () => {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [description, setDescription]= useState('');
    const [photos, setPhotos] = useState([]);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { errors, loading } = useSelector(state => state.form)

    useEffect(() => {
        console.log(photos);
    }, [photos]);
    const goNextStep = () => {
        const data = { name, photos, link, description };
        dispatch({
            type: SET_MAIN_INFO,
            payload: data
        })
        navigation.navigate("MoreInfo")
    }

    const _askPermission = async () => {
        if(Platform.OS !== "web"){
            const { status } = await ImagePicker.getCameraPermissionsAsync();
            return status === "granted"
        } 
        return true
    };
    const _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setPhotos( prevState => setPhotos([...prevState, result.uri ]));
        }
    };
    
    return (
        <KeyboardScreen padding={10} backgroundColor="white">
            <Input
                value={name}
                onTextChange={setName}
                label="Title"
                autoFocus={true}
                error={errors.name}
            />
            <ScrollView horizontal style={styles.scrollContainer}>
                {photos.map((photo, index) => <Image
                    source={{ uri: photo }}
                    key={index}
                    style={[styles.image]}
                />)}
                <TouchableOpacity style={[styles.image, styles.imagePicker]} onPress={_pickImage}>
                    <Center>
                        <FontAwesome name="photo" size={24} color="black" />
                        <Text>Upload</Text>
                    </Center>
                </TouchableOpacity>
            </ScrollView>
            <Text style={{ fontSize: 15, marginBottom: 10}}>Add at least one photo.</Text>
            <Input
                value={description}
                multiline={true}
                numberOfLines={3}
                onTextChange={(text) => setDescription(text)}
                placeholder="Tell users about your product / service."
                label="Description"
                error={errors.description}
            />
            <Input
                value={link}
                onTextChange={setLink}
                label="Link"
                placeholder="https://www.example.com"
                helperText="Full url path."
                error={errors.link}
            />
            <Button onPress={goNextStep}>Next</Button>
        </KeyboardScreen>
    )  
};

const styles = StyleSheet.create({
    scrollContainer: {
        maxHeight: 100,
        width: "100%"
    },
    image: {
        width: 80,
        height: 80,
        marginVertical: 10,
        marginRight: 10,
        borderRadius: 10,
        borderStyle: "dotted"
    },
    imagePicker: {
        backgroundColor: colors.light,
        borderWidth: 1,
    }
    
});
export default NewProduct;