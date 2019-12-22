import firebase from "firebase";

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
  
class Fire {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

	
	
    addPost = async ({ text, localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri);

        return new Promise((res, rej) => {
            this.firestore
                .collection("posts")
                .add({
                    text,
                    uid: this.uid,
                    timestamp: this.timestamp,
					author: this.displayName, 
                    image: remoteUri
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                });
        });
    };
	
	readUserData = () => {
		this.firestore.collection("posts").get().then(function(querySnapshot){
			let postss = querySnapshot.docs.map(doc => doc.data())
			return postss}).catch(function(error) {
      console.log('Error getting documents: ', error)
    })
	}
	
	
	async getMarkers() {
	const markers = [];
	await firebase.firestore().collection('posts').get()
		.then(querySnapshot => {
		querySnapshot.docs.forEach(doc => {
		markers.push(doc.data());
		});
	});
	return markers;
	}
    uploadPhotoAsync = async uri => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`;

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .ref(path)
                .put(file);

            upload.on(
                "state_changed",
                snapshot => {},
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        });
    };

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
	
	get displayName() {
        return (firebase.auth().currentUser || {}).displayName;
    }

    get timestamp() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;
