import { useState, useReducer, useEffect } from "react";
import "./App.css";

// react toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import firebase methods here
import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebaseInit";

// components imports
import AlbumsList from "./components/AlbumsList/AlbumsList";
import ImagesList from "./components/ImagesList/ImagesList";
import Favicon from "../src/images/favicon_io/favicon.ico";
import LogoImage from "../src/images/photofolio-logo-zip-file/png/logo-no-background.png";

function App() {
  const [viewAlbum, setViewAlbum] = useState(null);

  useEffect(() => {
    var link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = Favicon;
  });

  const showAlbumImages = (album) => {
    setViewAlbum(album);
  };

  const showAlbumsList = () => {
    setViewAlbum(null);
  };

  return (
    <>
      <ToastContainer />
      <h2 className="mainHeading">
        <img alt="logo" src={LogoImage} className="logo" />
      </h2>
      <div className="App">
        {viewAlbum ? (
          <ImagesList album={viewAlbum} showAlbumsList={showAlbumsList} />
        ) : (
          <AlbumsList showAlbumImages={showAlbumImages} />
        )}
      </div>
    </>
  );
}

export default App;
