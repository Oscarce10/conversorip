// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC99ISgHYyjAxtCZOT7AsDHCVX3o4YsEhM",
    authDomain: "oscarceconversorip.firebaseapp.com",
    databaseURL: "https://oscarceconversorip.firebaseio.com",
    projectId: "oscarceconversorip",
    storageBucket: "oscarceconversorip.appspot.com",
    messagingSenderId: "863937190998",
    appId: "1:863937190998:web:d855ad22fd35ca2d5a2ff7",
    measurementId: "G-BL8BZESE9J"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Get a reference to the database service
var database = firebase.database();