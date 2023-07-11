import { useState, useReducer, useEffect, useRef } from "react";
import styles from "./AlbumsList.module.css";
import Spinner from "react-spinner-material";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  doc,
  collection,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseInit";

import AlbumItem from "./AlbumItem";

function AlbumsList(props) {
  const [albums, setAlbums] = useState([]);
  const [updateAlbum, setUpdateAlbum] = useState(null);
  const [loading, setLoading] = useState(false);

  const albumTitleRef = useRef();

  const getData = async () => {
    setLoading(true);
    let docRef = collection(db, "albums");
    let q = query(docRef, orderBy("created_at", "desc"));
    onSnapshot(q, (snapShot) => {
      const data = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // console.log(data);
      setAlbums(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!updateAlbum) return;
    albumTitleRef.current.value = updateAlbum.title;
  }, [updateAlbum]);

  const clearInput = () => {
    albumTitleRef.current.value = "";
  };

  const createAlbumHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docNew = {
        title: albumTitleRef.current.value,
        created_at: new Date(),
      };

      const docRef = collection(db, "albums");
      await addDoc(docRef, docNew);

      clearInput();

      toast.success("Album created successfully.");
    } catch (error) {
      console.log(error);
      clearInput();
      toast.error("Something went wrong!!!");
    } finally {
      setLoading(false);
    }
  };

  const tosetUpdateAlbum = (album) => {
    setUpdateAlbum(album);
  };

  const updateAlbumHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docNew = {
        title: albumTitleRef.current.value,
      };

      const docRef = doc(db, "albums", updateAlbum.id);
      await updateDoc(docRef, docNew);

      setUpdateAlbum(null);

      clearInput();

      toast.success("Album updated successfully.");
    } catch (error) {
      console.log(error);
      setUpdateAlbum(null);
      clearInput();
      toast.error("Something went wrong!!!");
    } finally {
      setLoading(false);
    }
  };

  const deleteAlbumHandler = async (album_id) => {
    setLoading(true);
    try {
      const docRef = doc(db, "albums", album_id);

      let imagesDocRef = collection(db, "images");
      let q = query(imagesDocRef, where("album_id", "==", docRef));

      let album_images = await getDocs(q);
      album_images.docs.forEach(async (row) => {
        let imageRef = doc(db, "images", row.id);
        await deleteDoc(imageRef);
      });
      await deleteDoc(docRef);

      toast.success("Album deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className={styles.form}
        onSubmit={updateAlbum ? updateAlbumHandler : createAlbumHandler}
      >
        <input
          id="albumTitle"
          className={styles.input}
          type="text"
          placeholder="Album Title"
          ref={albumTitleRef}
          required
        />
        <button className={styles.submitBtn}>
          {updateAlbum ? "Update " : "Add "} Album
        </button>
      </form>
      <div className="listContainer">
        {loading ? (
          <Spinner radius={50} color={"#fb607f"} stroke={5} visible={true} />
        ) : (
          albums.map((album) => (
            <AlbumItem
              key={album.id}
              album={album}
              showAlbumImages={props.showAlbumImages}
              toSetUpdateAlbum={tosetUpdateAlbum}
              deleteAlbumHandler={deleteAlbumHandler}
            />
          ))
        )}
      </div>
    </>
  );
}

export default AlbumsList;
