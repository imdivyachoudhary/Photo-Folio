import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDPNzuqP5wm41SgMPs6E2FGM5qjTb5DeJY",
  authDomain: "photo-folio-98b97.firebaseapp.com",
  projectId: "photo-folio-98b97",
  storageBucket: "photo-folio-98b97.appspot.com",
  messagingSenderId: "729144366521",
  appId: "1:729144366521:web:8272c23bbd10ecabd95268",
  measurementId: "G-6L8VGSQECM",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
