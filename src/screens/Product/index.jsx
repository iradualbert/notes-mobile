import React, { useState, useEffect }from "react";
import {
    View,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from "axios";
import { colors } from "../../constants";
import { Typography, Category, Review, Ratings, UButton } from "../../components";

const { width } = Dimensions.get("window");

const Product = ({ route}) => {
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
    const navigation = useNavigation();

    const _navigateToReviews = () => {
        navigation.navigate("Reviews", { product, reviews: loadedReviews.reviews})
    };

    const _navigateToCreateReview = () => {
        navigation.navigate("Write Review")
    }
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
                    <Typography
                        fontSize={18}
                        fontWeight={"400"}
                        style={{ marginBottom: 10 }}
                    >
                        ${product.price}
                    </Typography>
                    <Typography
                        fontSize={16}
                        numberOfLines={3}
                        style={{ marginBottom: 10 }}
                    >
                        {product.description}
                    </Typography>
                    <View style={[styles.row, styles.justifyBetween, {marginTop: 10}]}>
                        <View style={styles.alignCenter}>
                            <MaterialCommunityIcons name="comment-question-outline" size={24} color="black" />
                            <Typography>Ask</Typography>
                        </View>

                        <View style={styles.alignCenter}>
                            <MaterialIcons onPress={_navigateToCreateReview} name="rate-review" size={24} color={colors.primary} />
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
                    <View>
                        <View style={[styles.row, styles.alignCenter]}>
                            <Typography style={{ marginRight: 8}} fontSize={20}>{product.average_rate}</Typography>
                            <Ratings value={product.average_rate} readOnly />
                        </View>
                        <Typography fontSize={16} style={{ marginTop: 5}}>
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
        if(reviews.length > 0){
            return (
                <View style={{backgroundColor: "white"}}>
                    <View style={{...styles.row, ...styles.justifyBetween, padding: 15}}>
                        <Typography fontSize={20} fontWeight={"600"}>{`Rates & Reviews`}</Typography>
                        <UButton onPress={_navigateToReviews}>See All</UButton>
                    </View>
                    <ScrollView horizontal bounces={false}>
                        {reviews.map(review => (
                            <Review review={review} key={review.id} />
                        ))}
                    </ScrollView>
                </View>
            )
        } else {
            return <></>
        }
        
    };

    const renderQuestions = () => {
        const { questions } = loadedQuestions;
        return (
            <ScrollView horizontal>
                {questions.map(question => (
                    <View style={[styles.content, styles.review]}>
                        <Typography numberOfLines={5} fontSize={16} fontWeight="500">{question.body}</Typography>
                    </View>
                ))}
            </ScrollView>
        )
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
        flex: 1
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
});
export default Product;