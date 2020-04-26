import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCZ1-RADuaZC96PFBEe0EUkAanYc9tHZDY",
    authDomain: "stickyblickynotes.firebaseapp.com",
    databaseURL: "https://stickyblickynotes.firebaseio.com",
    projectId: "stickyblickynotes",
    storageBucket: "stickyblickynotes.appspot.com",
    messagingSenderId: "13586369945",
    appId: "1:13586369945:web:01dfc2ad0c5b6cff621708",
    measurementId: "G-EFHCJVCHPZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase