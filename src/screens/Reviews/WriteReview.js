import React, { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Input, Ratings, KeyboardScreen } from "../../components";

const WriteReview = () => {
   const [rate, setRate] = useState(0);
   const [text, setText] = useState("");

   return (
      <KeyboardScreen padding={15} style={styles.container}>
         <View style={{ alignItems: "center" }}>
            <Ratings
               value={rate}
               onChange={setRate}
               size={24}
               spacing={10}
            />
         </View>
         <Input
            onTextChange={setText}
            value={text}
            numberOfLines={8}
            multiline
            label="Review"
            placeholder="Write your full review here."
         />
      </KeyboardScreen>
   )
};

const styles = StyleSheet.create({
   container: {
   }
})

export default WriteReview;