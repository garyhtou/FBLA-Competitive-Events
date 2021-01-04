import firebase from "firebase/app";
import "firebase/database";
import "firebase/analytics";

if (!firebase.apps.length) {
	firebase.initializeApp({
		apiKey: "AIzaSyB5IMVzTKGEikVHzEWrfuewQVm1tLSCDzk",
		authDomain: "fbla-competitive-events.firebaseapp.com",
		databaseURL: "https://fbla-competitive-events-default-rtdb.firebaseio.com",
		projectId: "fbla-competitive-events",
		storageBucket: "fbla-competitive-events.appspot.com",
		messagingSenderId: "208112630070",
		appId: "1:208112630070:web:4c1865cedcc0b07ecf1b97",
		measurementId: "G-1Q7X3QVDXN",
	});
}

module.exports = firebase;
