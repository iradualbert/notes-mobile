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
import ReadMore from "react-native-read-more-text";
import { Typography, Button } from "../../components";
import { colors } from "../../constants";
import axios from "axios";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get("window")

const ChannelScreen = ({ navigation, route }) => {
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
    const {
        name,
        id,
        photo,
        contact,
        cat,
        address,
    } = channel;

    useEffect(() => {
        _loadProducts()
    }, []);

    const _loadProducts = async () => {
        try{
            const { data } = await axios.get('/products/', {
                params: {
                    offset: suggestedProducts.offset
                }
            });
            const { products, more_available } = data;
            setSuggestedProducts( prevState => ({
                products: [...prevState.products, ...products],
                moreAvailable: more_available,
                offset: prevState.offset + products.length
            }))
        } catch(err){
            console.log(err)
        }
    };
    const renderProducts = () => {
        const { products } = suggestedProducts;
        return (
            <View style={[styles.products, styles.row]}>
                {products.map(product => (
                    <View style={styles.card} key={product.id}>
                       <Image style={styles.productPhoto} source={{uri: product.photo}} />
                       <View style={styles.row}>
                            <View>
                                <Typography fontSize={16}>{product.name}</Typography>
                            </View>
                            <TouchableOpacity>
                                <MaterialCommunityIcons name="bookmark-outline" size={24} color={colors.primary} />
                            </TouchableOpacity>
                       </View>
                    </View>
                ))}
            </View>
        )
        
    };
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

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: channel.photo }} style={styles.channelThumbnail} />
            <View style={styles.content}>
                <Typography fontSize={20} style={{marginBottom: 10}}>{channel.name}</Typography>
                <ReadMore
                    numberOfLines={2}
                    renderTruncatedFooter={_renderTruncatedFooter}
                    renderRevealedFooter={_renderRevealedFooter}
                    onReady={_handleTextReady}
                    >
                    <Typography fontSize={15}>{channel.bio}</Typography>
                </ReadMore>
                <Button style={styles.subscribeButton}>Subscribe</Button>
            </View>
            <View style={styles.container}>
               {renderProducts()}
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    channelThumbnail: {
        width: "100%",
        height: 200
    },
    content: {
        padding: 15,
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
    products: {
        flexWrap: "wrap",
    },
    card: {
        width: (width / 2) - 20,
        backgroundColor: "white",
        margin: 10
    },
    productPhoto: {
        height: 100,
        width: "100%"
    }
    
});
export default ChannelScreen;