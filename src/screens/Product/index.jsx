import React, { useState, useEffect }from "react";
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Dimensions,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { colors } from "../../constants";
import { Typography, Button, Category } from "../../components";

const { width } = Dimensions.get("window");

const Product = ({navigation, route}) => {
    useEffect(() => {
        _loadProductInfo();
    }, [])
    
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(route.params.product);
    const [loadedReviews, setLoadedReviews] = useState({
        loading: false,
        reviews: [],
        offset: 0,
        moreAvailable: true
    });
    const [loadedQuestions, setLoadedQuestions] = useState({
        loading: true,
        questions: [],
        offset: 0,
        moreAvailable: false
    });
    const [isSaved, setIsSaved ] = useState(false);
    const [currentTab, setCurrentTab] = useState("All");
    const [relatedProducts, setRelatedProducts] = useState({
        loading: false,
        products: [],
        offset: 0,
        moreAvailable: true
    });
    const [channel, setChannel] = useState({});

    const _loadProductInfo = async () => {
        const { id } = route.params.product;
        try{
            const { data } = await axios.get(`/products/${id}/`);
            const { product, reviews, questions, channel } = data;
            setProduct(product);
            setLoadedReviews(prevState => ({
                loading: false,
                reviews: [...prevState.reviews, ...reviews],
                moreAvailable: true,
                offset: reviews.length
            }));
            setLoadedQuestions(prevState => ({
                loading: false,
                questions: [...prevState.questions, ...questions],
                moreAvailable: true,
                offset: questions.length
            }));
            setChannel(channel)
        } catch(err){
            console.log(err)
        }
    };

    const renderProduct = () => {
        return (
            <>
                <Image style={styles.productImage } source={{ uri: product.photo }} />
                
                <View style={styles.content}>
                    
                    <View style={[styles.row, styles.justifyBetween]}>
                        <Typography fontSize={20} style={{ marginBottom: 10 }}>{product.name}</Typography>
                        <Category cat={product.cat} />
                    </View>
                    <Typography fontSize={16} numberOfLines={2}>{product.description}</Typography>
                    <View style={[styles.row, styles.justifyBetween, {marginTop: 10}]}>
                        <View style={styles.alignCenter}>
                            <MaterialCommunityIcons name="comment-question-outline" size={24} color="black" />
                            <Typography>Ask</Typography>
                        </View>

                        <View style={styles.alignCenter}>
                            <MaterialIcons name="rate-review" size={24} color={colors.primary} />
                            <Typography>Submit a Review</Typography>
                        </View>

                        <View stylse={styles.alignCenter}>
                            <MaterialCommunityIcons
                                name={isSaved ? "bookmark" : "bookmark-outline"}
                                size={24}
                                color={colors.primary}
                            />
                            <Typography>Save</Typography>
                        </View>

                        <View style={styles.alignCenter}>
                            <MaterialCommunityIcons name="share" size={24} color={colors.primary} />
                            <Typography>Share</Typography>
                        </View>
                    </View>               
                </View>
                
                
                <View style={[styles.row, styles.justifyBetween, styles.content]}>
                    <View style={styles.alignCenter}>
                        <View style={[styles.row]}>
                            <FontAwesome name="star" color="#FFBA5A" size={12} />
                            <Typography style={{ marginLeft: 4, color: "#FFBA5A" }}>
                                {product.average_rate}
                            </Typography>
                        </View>
                        <Typography style={{ marginLeft: 20, color: "#FFBA5A" }}>
                            {product.total_reviews} Total Ratings
                        </Typography>
                    </View>
                    <View style={styles.alignCenter}>
                        <MaterialCommunityIcons name="comment-question-outline" size={24} color={colors.primary} />
                        <Typography>{5} Questions</Typography>
                    </View>
                    <View style={styles.alignCenter}>
                        <Ionicons name="ios-pricetag" size={24} color={colors.primary} />
                        <Typography>{product.price}</Typography>
                    </View>
                </View>
            </>
        )
    };

    const renderChannnel = () => {
        return
    }

    const renderRelated = () => {

    };

    const renderReviews = () => {
        const { reviews } = loadedReviews;
        return (
            <ScrollView horizontal style={styles.reviewList}>
               {reviews.map(review => (
                   <View style={[styles.content, styles.review]}>
                      <Typography numberOfLines={5} fontSize={16}>{review.body}</Typography>
                   </View>
               ))}
            </ScrollView>
        )
    };

    const renderQuestions = () => {

    };
    return (
        <ScrollView style={styles.container}>
            {renderProduct()}
            {renderChannnel()}
            {renderQuestions()}
            {renderReviews()}
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        backgroundColor: "white",
        padding: 15,
        marginVertical: 5,
    },
    productImage: {
        width: width,
        height: width / 1.8
    },
    row: {
        flexDirection: "row"
    },
    justifyBetween: {
        justifyContent: "space-between"
    },
    alignCenter:{
        alignItems: "center"
    },
    review: {
        width: 250,
        marginHorizontal: 5
    }

});
export default Product;