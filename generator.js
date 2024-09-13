require("dotenv").config();
const fs = require('fs');

// Read the sitemap template file
const template = fs.readFileSync('./templates/sitemap-template.xml', 'utf-8');

// Replace __BASE_URL__ with the actual base URL
const base_url = process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
const sitemap = template.replace(/__REACT_APP_BASE_URL__/g, base_url).replace(/LAST_MODIFIED/g, new Date().toISOString().slice(0, 19).concat("+00:00"));

// Write the modified sitemap XML to a new file
fs.writeFileSync('./public/sitemap.xml', sitemap);

const robotsTemplate = fs.readFileSync("./templates/robots-template.txt", "utf-8");
const robotsTxt = robotsTemplate.replace(/__REACT_APP_BASE_URL__/g, base_url);

fs.writeFileSync("./public/robots.txt", robotsTxt);

const firebaseConfig = {
    apiKey: "AIzaSyBNwi_ZzEtxVCRclxQDEY_Ubnw30ovow0w",
    authDomain: "ecommerce-app-2d118.firebaseapp.com",
    projectId: "ecommerce-app-2d118",
    storageBucket: "ecommerce-app-2d118.appspot.com",
    messagingSenderId: "49513027712",
    appId: "1:49513027712:web:0fd5c893167e2c4d71ae65",
    measurementId: "G-X4QB4VVEJ6"
  };
  
const messagingTemplate = fs.readFileSync("./templates/firebase-messaging-sw-template.js", 'utf-8');
const messagingFile = messagingTemplate.replace(/FIREBASE_API_KEY/g, firebaseConfig.apiKey)
    .replace(/FIREBASE_AUTH_DOMAIN/g, firebaseConfig.authDomain)
    .replace(/FIREBASE_PROJECT_ID/g, firebaseConfig.projectId)
    .replace(/FIREBASE_STORAGE_BUCKET/g, firebaseConfig.storageBucket)
    .replace(/FIREBASE_MESSAGING_SENDER_ID/g, firebaseConfig.messagingSenderId)
    .replace(/FIREBASE_APP_ID/g, firebaseConfig.appId)
    .replace(/FIREBASE_MEASUREMENT_ID/g, firebaseConfig.measurementId);

fs.writeFileSync("./public/firebase-messaging-sw.js", messagingFile);