import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Icon from 'react-native-vector-icons/AntDesign';
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import MessageScreen from "./screens/MessageScreen";
import PostScreen from "./screens/PostScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";

import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBEysRIkXzLNNVccj4TiVMtioPQ8BZuE-0",
    authDomain: "api-5114501990753869617-416413.firebaseapp.com",
    databaseURL: "https://api-5114501990753869617-416413.firebaseio.com",
    projectId: "api-5114501990753869617-416413",
    storageBucket: "api-5114501990753869617-416413.appspot.com",
    messagingSenderId: "894821865901",
    appId: "1:894821865901:web:ffe4efba7b691c9e9fe924",
    measurementId: "G-1Y5HRP6887"
  };


firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name="home" size={24} color={tintColor} />
            }
        },
        Message: {
            screen: MessageScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name="wechat" size={24} color={tintColor} />
            }
        },
        Post: {
            screen: PostScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name="pluscircle"
                        size={48}
                        color="#E9446A"
                        style={{
                            shadowColor: "#E9446A",
                            shadowOffset: { width: 0, height: 10 },
                            shadowRadius: 10,
                            shadowOpacity: 0.3
                        }}
                    />
                )
            }
        },
        Notification: {
            screen: NotificationScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name="notification" size={24} color={tintColor} />
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => <Icon name="user" size={24} color={tintColor} />
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: "#161F3D",
            inactiveTintColor: "#B8BBC4",
            showLabel: false
        }
    }
);

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppTabNavigator,
            Auth: AuthStack
        },
        {
            initialRouteName: "Loading"
        }
    )
);
