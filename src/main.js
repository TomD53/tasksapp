import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import firebase from "firebase"

require("./assets/main.scss")

var firebaseConfig = {
    apiKey: "AIzaSyDQoq8QPBVLbSYXZaNmF9exbQbkRqghDIY",
    authDomain: "tom-tasksapp.firebaseapp.com",
    databaseURL: "https://tom-tasksapp-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tom-tasksapp",
    storageBucket: "tom-tasksapp.appspot.com",
    messagingSenderId: "910853614006",
    appId: "1:910853614006:web:764a9f2a79d407ec1e7917",
    measurementId: "G-QC5HGZ05KM"
}

firebase.initializeApp(firebaseConfig);
firebase.analytics();


createApp(App).use(router).mount('#app')
