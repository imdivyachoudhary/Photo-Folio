import { useState, useReducer, useEffect, useRef } from "react";
import styles from "./ImagesList.module.css";
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

import ImageItem from "./ImageItem";

function ImagesList(props) {
  const [images, setImages] = useState([]);
  const [updateImage, setUpdateImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageTitleRef = useRef();
  const imageUrlRef = useRef();

  const getData = async () => {
    setLoading(true);
    let docRef = collection(db, "images");
    let albumDocRef = doc(db, "albums", props.album.id);
    let q = query(
      docRef,
      where("album_id", "==", albumDocRef),
      orderBy("created_at", "desc")
    );
    onSnapshot(q, (snapShot) => {
      const data = snapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(data);
      setImages(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!updateImage) return;
    imageTitleRef.current.value = updateImage.title;
    imageUrlRef.current.value = updateImage.url;
  }, [updateImage]);

  const clearInput = () => {
    imageTitleRef.current.value = "";
    imageUrlRef.current.value = "";
  };

  const createImageHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docNew = {
        album_id: doc(db, "albums", props.album.id),
        title: imageTitleRef.current.value,
        url: imageUrlRef.current.value,
        created_at: new Date(),
      };

      const docRef = collection(db, "images");
      await addDoc(docRef, docNew);

      clearInput();

      toast.success("Image created successfully.");
    } catch (error) {
      console.log(error);
      clearInput();
      toast.error("Something went wrong!!!");
    } finally {
      setLoading(false);
    }
  };

  const tosetUpdateImage = (image) => {
    setUpdateImage(image);
  };

  const updateImageHandler = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const docNew = {
        title: imageTitleRef.current.value,
        url: imageUrlRef.current.value,
      };

      const docRef = doc(db, "images", updateImage.id);
      await updateDoc(docRef, docNew);

      setUpdateImage(null);

      clearInput();

      toast.success("Image updated successfully.");
    } catch (error) {
      console.log(error);
      setUpdateImage(null);
      clearInput();
      toast.error("Something went wrong!!!");
    } finally {
      setLoading(false);
    }
  };

  const deleteImageHandler = async (image_id) => {
    setLoading(true);
    try {
      const docRef = doc(db, "images", image_id);
      await deleteDoc(docRef);

      toast.success("Image deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!!!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.albumHeading}>
        <h2>{props.album.title}</h2>
        <button className={styles.backBtn} onClick={props.showAlbumsList}>
          Back
        </button>
      </div>
      <form
        className={styles.form}
        onSubmit={updateImage ? updateImageHandler : createImageHandler}
      >
        <div className={styles.formItem}>
          <input
            id="imageTitle"
            className={styles.input}
            type="text"
            placeholder="Image Title"
            ref={imageTitleRef}
            required
          />
        </div>
        <div className={styles.formItem}>
          <input
            id="imageUrl"
            className={styles.input}
            type="text"
            placeholder="Image Url"
            ref={imageUrlRef}
            required
          />
        </div>
        <div className={styles.formItem}>
          <button className={styles.submitBtn}>
            {updateImage ? "Update " : "Add "} Image
          </button>
        </div>
      </form>
      <div className="imagesListContainer">
        {loading ? (
          <Spinner radius={50} color={"#fb607f"} stroke={5} visible={true} />
        ) : (
          images.map((image) => (
            <ImageItem
              key={image.id}
              image={image}
              toSetUpdateImage={tosetUpdateImage}
              deleteImageHandler={deleteImageHandler}
            />
          ))
        )}
      </div>
    </>
  );
}

export default ImagesList;
