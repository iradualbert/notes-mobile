import {
    createStore,
    combineReducers,
    applyMiddleware, 
    compose
} from "redux";
import {
    persistStore,
    persistReducer
} from "redux-persist"
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-community/async-storage";
import {
    channelReducer,
    productReducer,
    userReducer,
    uiReducer,
    permissionReducer,
    formReducer
} from "./reducers";


const initialState = {};
const middleware = [thunk]

const rootReducers = combineReducers({
    user: userReducer,
    channels: channelReducer,
    ui: uiReducer,
    products: productReducer,
    permissions: permissionReducer,
    form: formReducer
});
const persitConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ['user', 'permissions']
};

const persistReducers = persistReducer(persitConfig, rootReducers)
const composeEnhancers =
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
const enhancer = composeEnhancers(applyMiddleware(...middleware));
export const store = createStore(persistReducers, initialState, enhancer);
export const persistor = persistStore(store);