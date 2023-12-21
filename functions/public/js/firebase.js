// // Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app"
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCxkCiCBK3jwoncU6ImOnySFDZ6pXNaEGI",
    authDomain: "blogging-website-3c10f.firebaseapp.com",
    projectId: "blogging-website-3c10f",
    storageBucket: "blogging-website-3c10f.appspot.com",
    messagingSenderId: "380720413493",
    appId: "1:380720413493:web:8922ee416ad6c7d497ea7c",
    measurementId: "G-STPZ0312NV"
};

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const db = app.firestore();
// const auth = firebase.auth();

// export { db, auth };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();