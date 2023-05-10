// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAFSlpkC9wWfAc_hlZx0jGcWWGsBlljgPE",
//   authDomain: "kirayewala-88e93.firebaseapp.com",
//   projectId: "kirayewala-88e93",
//   storageBucket: "kirayewala-88e93.appspot.com",
//   messagingSenderId: "174140784222",
//   appId: "1:174140784222:web:ac8b43cf106d7a128afecf",
//   measurementId: "G-WYVDY7C0GL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// var myName = window.prompt("ENter your Name");
// function sendMessage(){
//   var msg = document.getElementById("message").value;
  
//   firebase.database().ref("message").push().set({
//     "sender": myName,
//     "message": msg
//   })
//   return false;
// }



var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
  apiKey: ' AIzaSyA6oeTBjzkaluuFGMJFgdEWoGfElxbfcCk', // for Mapquest, OpenCage, Google Premier
  formatter: 'json'         // 'gpx', 'string', ...
};
 
var geocoder = NodeGeocoder(options);

geocoder.reverse({lat:25.2425166666667, lon:55.2984633333333}, function(err, res) {
  console.log(res);
});