import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/messaging";
import { useSelector } from "react-redux";
import Loader from "../../components/loader/Loader";

const FirebaseData = () => {

  const setting = useSelector((state) => state.setting);

  if (setting.setting === null) {
    return <Loader screen='full' />;
  }

  const apiKey = setting.setting && setting.setting.firebase.apiKey;
  const authDomain = setting.setting && setting.setting.firebase.authDomain;
  const projectId = setting.setting && setting.setting.firebase.projectId;
  const storageBucket = setting.setting && setting.setting.firebase.storageBucket;
  const messagingSenderId = setting.setting && setting.setting.firebase.messagingSenderId;
  const appId = setting.setting && setting.setting.firebase.appId;
  const measurementId = setting.setting && setting.setting.firebase.measurementId;


  // const firebaseConfig = {
  //   apiKey: apiKey,
  //   authDomain: authDomain,
  //   projectId: projectId,
  //   storageBucket: storageBucket,
  //   messagingSenderId: messagingSenderId,
  //   appId: appId,
  //   measurementId: measurementId,
  // };
  const firebaseConfig = {
    apiKey: "AIzaSyBNwi_ZzEtxVCRclxQDEY_Ubnw30ovow0w",
    authDomain: "ecommerce-app-2d118.firebaseapp.com",
    projectId: "ecommerce-app-2d118",
    storageBucket: "ecommerce-app-2d118.appspot.com",
    messagingSenderId: "49513027712",
    appId: "1:49513027712:web:0fd5c893167e2c4d71ae65",
    measurementId: "G-X4QB4VVEJ6"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }

  const auth = firebase.auth();

  const messaging = firebase.messaging();
  try {
    messaging.onMessage(function (payload) {
      // console.log("Message ->", payload);
      let data = payload?.data;
      // console.log(data);
      new Notification(data?.title, { body: data?.message, icon: data?.image || setting?.setting?.web_settings?.web_logo });
    });
  } catch (err) {
    console.log(err?.message);
  }
  return { auth, firebase, messaging };
};

export default FirebaseData;