import React, { useEffect, useState } from "react";
import {
    View,
    Image,
    StyleSheet,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Typography, Button, Category } from "../../components";
import { colors } from "../../constants";
import axios from "axios";
import { MaterialCommunityIcons, FontAwesome, EvilIcons } from '@expo/vector-icons';

const { width } = Dimensions.get("window")

const ProductCard = ({ product }) => {
    const [isSaved, setIsSaved] = useState(false);
    const navigation = useNavigation();
    const handleSave = () => {
        setIsSaved(prevState => !prevState)
    }
    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate('Product', { product })}>
                <Image style={styles.productPhoto} source={{ uri: product.photo }} />
            </TouchableOpacity>
            <View style={[styles.row, styles.productContent]}>
                <View>
                    <Typography fontSize={16}>{product.name}</Typography>
                    <View style={styles.row}>
                        <Text style={styles.price}>{product.price}</Text>
                        <Category cat={product.cat} />
                    </View>
                    <View style={{ flexDirection: "row", marginVertical: 10, alignItems: "center" }} >
                        <FontAwesome name="star" color="#FFBA5A" size={12} />
                        <Text style={{ marginLeft: 4, color: "#FFBA5A" }}>
                            {product.average_rate}
                        </Text>
                        <Text style={{ marginLeft: 20, color: "#FFBA5A" }}>
                            {product.total_reviews} Reviews
                        </Text>
                    </View>
                </View>
                <TouchableOpacity onPress={handleSave}>
                    <MaterialCommunityIcons
                        name={isSaved ? "bookmark" : "bookmark-outline"}
                        size={24}
                        color={colors.primary}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const ChannelScreen = ({ route }) => {
    const { channel } = route.params;
    const [listing, setListings] = useState([]);
    const [suggestedProducts, setSuggestedProducts] = useState({
        products: [],
        moreAvailable: false,
        offset: 0
    });
    const [loadingSub, setLoadingSub] = useState(true);
    const [user, setUser] = useState({});
    const [subscribers, setSubscribers] = useState(0);
    useEffect(() => {
        _loadProducts()
    }, []);

    const _loadProducts = async () => {
        try {
            const { data } = await axios.get('/products/', {
                params: {
                    offset: suggestedProducts.offset
                }
            });
            const { products, more_available } = data;
            setSuggestedProducts(prevState => ({
                products: [...prevState.products, ...products],
                moreAvailable: more_available,
                offset: prevState.offset + products.length
            }))
        } catch (err) {
            console.log(err)
        }
    };
    const renderProducts = () => {
        const { products } = suggestedProducts;
        return (
            <View style={[styles.products, styles.row]}>
                {products.map(product => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </View>
        )

    };

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: channel.photo }} style={styles.channelThumbnail} />
            <View style={styles.content}>
                <View style={styles.row}>
                    <Typography fontSize={20} style={{ marginBottom: 10 }}>{channel.name}</Typography>
                    <Category cat={channel.cat} />
                </View>
                <Typography fontSize={15} numberOfLines={2}>{channel.bio}</Typography>
                <Button style={styles.subscribeButton}>Subscribe</Button>
            </View>
            <View style={styles.content}>
                <View style={styles.contactInfo}>
                    <EvilIcons name="location" size={16} color={colors.secondary} />
                    <Typography
                        style={styles.contactInfoText}
                    >
                        {"Cedit, Turan Güneş Cd. No:51, 41100 İzmit/Kocaeli"}
                    </Typography>
                </View>
                <View style={styles.contactInfo}>
                    <FontAwesome name="phone" size={16} color={colors.secondary} />
                    <Typography style={styles.contactInfoText} >+90 553 172 32 28</Typography>
                </View>
                <View style={styles.contactInfo}>
                    <MaterialCommunityIcons name="web" size={16} color={colors.secondary} />
                    <Typography style={styles.contactInfoText}>{"https://www.gofundme.com"}</Typography>
                </View>
            </View>
            {renderProducts()}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    channelThumbnail: {
        width: "100%",
        height: 200
    },
    content: {
        margin: 5,
        padding: 10,
        backgroundColor: "white"
    },
    subscribeButton: {
        width: "100%",
        marginVertical: 10,
        backgroundColor: colors.primary,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contactInfo: {
        flexDirection: "row",
        alignItems: "center"
    },
    contactInfoText: { 
        fontSize: 15, 
        color: "#A5A5A5",
        padding: 5, 
        marginLeft: 10 
    }
    ,
    products: {
        flexWrap: "wrap",
    },
    card: {
        width: (width / 2) - 10,
        backgroundColor: "white",
        margin: 5
    },
    productPhoto: {
        height: 100,
        width: "100%"
    },
    productContent: {
        padding: 10
    },
    price: {
        color: colors.secondary,
        paddingHorizontal: 5,
        paddingVertical: 5,
        fontSize: 16
    },


});
export default ChannelScreen;