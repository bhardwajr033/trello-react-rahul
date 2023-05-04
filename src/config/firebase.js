import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaOl8WUAxrbsTZVL2dnFgzjzZErsQQYTk",
  authDomain: "trello-react-rahul.firebaseapp.com",
  projectId: "trello-react-rahul",
  storageBucket: "trello-react-rahul.appspot.com",
  messagingSenderId: "575922017869",
  appId: "1:575922017869:web:4afad1fdd4b9d311cb6e04",
  measurementId: "G-8JR5382RMK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;
