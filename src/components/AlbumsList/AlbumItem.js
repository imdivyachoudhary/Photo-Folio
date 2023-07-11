import { useState, useReducer, useEffect } from "react";
import styles from "./AlbumItem.module.css";

import EditImage from "../../images/edit.png";
import DeleteImage from "../../images/trash-bin.png";

function AlbumItem({ album, showAlbumImages, toSetUpdateAlbum, deleteAlbumHandler }) {
  const [currentHover, setCurrentHover] = useState(false);
  return (
    <div
      className={styles.card}
      onClick={() => {
        showAlbumImages(album);
      }}
      onMouseOver={() => {
        setCurrentHover(true);
      }}
      onMouseLeave={() => {
        setCurrentHover(false);
      }}
    >
      {currentHover && (
        <>
          <div className={styles.optionIcon} style={{ top: -30, right: 100 }} onClick={(e)=>{e.stopPropagation(); toSetUpdateAlbum(album)}}>
            <img alt="edit" src={EditImage} />
          </div>
          <div className={styles.optionIcon} style={{ top: -30, left: 100 }}>
            <img alt="delete" src={DeleteImage} onClick={(e)=>{e.stopPropagation(); deleteAlbumHandler(album.id)}} />
          </div>
        </>
      )}
      <div className={`${styles.cardItem} ${styles.albumThumbnail}`}>
        <img
          alt={album.title}
          src="https://cdn-icons-png.flaticon.com/128/10293/10293886.png"
        />
      </div>
      <div className={`${styles.cardItem} ${styles.albumTitle}`}>
        <h3 style={currentHover ?  {overflow:"auto"} : {}}>{album.title}</h3>
      </div>
    </div>
  );
}

export default AlbumItem;
