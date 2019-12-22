import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Fire from "../Fire";
import {PermissionsAndroid} from 'react-native';
import * as ImagePicker from "expo-image-picker";
const firebase = require("firebase");
require("firebase/firestore");
import RImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/AntDesign';
export default class PostScreen extends React.Component {
    state = {
        text: "",
        image: null
    };

    componentDidMount() {
        this.getPhotoPermission();
    }

    getPhotoPermission = async () => {
		try {
			const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
			{
				title: 'Cool Photo App Camera Permission',
				message:
				'Cool Photo App needs access to your camera ' +
				'so you can take awesome pictures.',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('You can use the camera');
			} else {
			console.log('Camera permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
				try {
			const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			{
				title: 'Cool Photo App Camera Permission',
				message:
				'Cool Photo App needs access to your camera ' +
				'so you can take awesome pictures.',
				buttonNeutral: 'Ask Me Later',
				buttonNegative: 'Cancel',
				buttonPositive: 'OK',
			},
			);
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('You can use the camera');
			} else {
			console.log('Camera permission denied');
			}
		} catch (err) {
			console.warn(err);
		}
    };

    handlePost = () => {
        Fire.shared
            .addPost({ text: this.state.text.trim(), localUri: this.state.image })
            .then(ref => {
                this.setState({ text: "", image: null });
                this.props.navigation.goBack();
            })
            .catch(error => {
                alert(error);
            });
    };

	chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    RImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        this.setState({
          image: response.uri
        });
      }
    });
  }
	
	
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <Icon name="leftcircle" size={24} color="#D8D9DB"></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.handlePost}>
                        <Text style={{ fontWeight: "500" }}>Post</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputContainer}>
                    <Image source={require("../assets/tempAvatar.jpg")} style={styles.avatar}></Image>
                    <TextInput
                        autoFocus={true}
                        multiline={true}
                        numberOfLines={4}
                        style={{ flex: 1 }}
                        placeholder="Want to share something?"
                        onChangeText={text => this.setState({ text })}
                        value={this.state.text}
                    ></TextInput>
                </View>

                <TouchableOpacity style={styles.photo} onPress={this.chooseImage}>
                    <Icon name="camera" size={32} color="#D8D9DB"></Icon>
                </TouchableOpacity>

                <View style={{ marginHorizontal: 32, marginTop: 32, height: 150 }}>
                    <Image source={{ uri: this.state.image }} style={{ width: "100%", height: "100%" }}></Image>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#D8D9DB"
    },
    inputContainer: {
        margin: 32,
        flexDirection: "row"
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        marginRight: 16
    },
    photo: {
        alignItems: "flex-end",
        marginHorizontal: 32
    }
});
