import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBK4qhOTVKkJK2O-runq3PcyG3U4OWbN08",
    authDomain: "ticketingapp-c05c2.firebaseapp.com",
    databaseURL: "https://ticketingapp-c05c2.firebaseio.com",
    projectId: "ticketingapp-c05c2",
    storageBucket: "ticketingapp-c05c2.appspot.com",
    messagingSenderId: "988663500869",
    appId: "1:988663500869:web:07f6c6e5e48f135e17532c"
  };
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);
const storage=firebase.storage()
export default storage    