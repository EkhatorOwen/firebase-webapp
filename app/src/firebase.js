import firebase from 'firebase';

let config ={
  apiKey: "",
    authDomain: "timeline-blog.firebaseapp.com",
    databaseURL: "",
    projectId: "timeline-blog",
    storageBucket: "timeline-blog.appspot.com",
    messagingSenderId: ""
}

firebase.initializeApp(config)

export default firebase;
