// Dependencies
import app from "firebase/app";
import "firebase/auth";

// Firebase Configurations
import config from "./firebaseConfig";

// Initialize Firebase App
app.initializeApp(config);

export default app;