import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCnDXsFboAkgM6Di0FPbVCi8WnFhhAUgnM",
  authDomain: "music-player-20c63.firebaseapp.com",
  databaseURL: "https://music-player-20c63.firebaseio.com",
  projectId: "music-player-20c63",
  storageBucket: "music-player-20c63.appspot.com",
  messagingSenderId: "600737151324",
  appId: "1:600737151324:web:776a93aca478c43eee2999",
};
firebase.initializeApp(config);
export default firebase;
