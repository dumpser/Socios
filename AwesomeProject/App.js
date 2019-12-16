import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { creatStackNavigator, createStackNavigator } from "react-navigation-stack";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";

import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyCmYw77BGzQ8Lt_QNH7p3MsiBALCglLEvc",
    authDomain: "socialapp-252ff.firebaseapp.com",
    databaseURL: "https://socialapp-252ff.firebaseio.com",
    projectId: "socialapp-252ff",
    storageBucket: "",
    messagingSenderId: "119382533132",
    appId: "1:119382533132:web:a5c81edbc3aba3488f3a29"
};

firebase.initializeApp(firebaseConfig);

const AppStack = createStackNavigator({
    Home: HomeScreen
});

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppStack,
            Auth: AuthStack
        },
        {
            initialRouteName: "Loading"
        }
    )
);
