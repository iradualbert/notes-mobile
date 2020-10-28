import React from 'react';
import { Platform } from "react-native";
import axios from "axios";
import { store, persistor }from "./src/redux/store";
import { Provider } from "react-redux";
import Navigator from "./src/navigation";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./src/components/Loading";

const localUrl = "http://127.0.0.1:8000/api";
const hostedUrl = "https://notepark.herokuapp.com/api";
if(Platform.OS === "web"){
  axios.defaults.baseURL = hostedUrl;
} else {
  axios.defaults.baseURL = hostedUrl
};


const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<Loading />}>
        <Navigator />
      </PersistGate>
    </Provider>
  )
}

export default App;