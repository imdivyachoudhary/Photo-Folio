import { useState, useReducer, useEffect } from "react";
import styles from "./ImageItem.module.css";

import EditImage from "../../images/edit.png";
import DeleteImage from "../../images/trash-bin.png";

function ImageItem({ image, toSetUpdateImage, deleteImageHandler }) {
  const [currentHover, setCurrentHover] = useState(false);
  return (
    <div
      className={styles.card}
      onMouseOver={() => {
        setCurrentHover(true);
      }}
      onMouseLeave={() => {
        setCurrentHover(false);
      }}
    >
      {currentHover && (
        <>
          <div className={styles.optionIcon} style={{ top: -30, right: 200 }} onClick={() => { toSetUpdateImage(image)}}>
            <img alt="edit" src={EditImage} />
          </div>
          <div className={styles.optionIcon} style={{ top: -30, left: 200 }}>
            <img alt="delete" src={DeleteImage} onClick={() => { deleteImageHandler(image.id)}} />
          </div>
        </>
      )}
      <div className={`${styles.cardItem} ${styles.imageUrl}`}>
        <img
          alt={image.title}
          src={image.url}
        />
      </div>
      <div className={`${styles.cardItem} ${styles.imageTitle}`}>
        <h3>{image.title}</h3>
      </div>
    </div>
  );
}

export default ImageItem;
