import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView
} from "react-native";
import { Review } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-community/picker";
import axios from "axios";

const tabs = ["Recent", "Old", "5 Star", "4 Star", "3 Star", "2 Star", "1 Star"]

const ProductReviews = ({route}) => {
    const navigation = useNavigation();
    const user = useSelector( state => state.user );
    const [product, setProduct] = useState({});
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [moreAvailable, setMoreAvailable] = useState(false);
    const [offset, setOffset] = useState(0);
    const [currentTab, setCurrentTab] = useState(0);
    useEffect(() => {
        const {product: _Product, reviews: _Reviews } = route.params;
        setProduct(_Product);
        setReviews(_Reviews)
    }, []);

    const handleTabChange = value => {
        setCurrentTab(value)
    };

    const _loadReviews =  async () => {
        const { id } = product;
        setLoading(true);
        try{
            const { data: { more_available, reviews: loadedReviews } } = await axios.get("/reviews", {
                params: {
                    product_id: id,
                    offset: offset
                }
            });
            setLoading(false);
            setReviews(prevState => [...prevState, ...loadedReviews]);
            setMoreAvailable(more_available);
            setOffset( prevState => prevState + loadedReviews.length)
        } catch(err){
            console.log(err)
            setLoading(false)
        };

    };
    return (
        <SafeAreaView style={styles.container}>
            <Picker
                selectedValue={currentTab}
                onValueChange={handleTabChange}
            >
                {tabs.map((tab, index) => (
                    <Picker.Item value={index} label={tab} key={index} />
                ))}
            </Picker>
           <ScrollView style={{ padding: 0}}>
                {reviews.map(review => <Review key={review.id} review={review} fullWidth/>)}
           </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center"
    }
});

export default ProductReviews;