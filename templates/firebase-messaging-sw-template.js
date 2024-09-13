importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');


firebase.initializeApp({
    apiKey: "AIzaSyBNwi_ZzEtxVCRclxQDEY_Ubnw30ovow0w",
    authDomain: "ecommerce-app-2d118.firebaseapp.com",
    projectId: "ecommerce-app-2d118",
    storageBucket: "ecommerce-app-2d118.appspot.com",
    messagingSenderId: "49513027712",
    appId: "1:49513027712:web:0fd5c893167e2c4d71ae65",
    measurementId: "G-X4QB4VVEJ6"
});

const messaging = firebase.messaging();

try {
    messaging.setBackgroundMessageHandler(function (payload) {
        let data = payload?.notification;
        const notificationTitle = data?.title;
        const notificationOptions = {
            body: data?.body,
            icon: './logo.png' || 0,
            image: data?.image
        };

        return self.registration.showNotification(notificationTitle,
            notificationOptions);
    });

} catch (error) {
    console.log("This is an error ->", error);
}
