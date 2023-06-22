import React, { useState, useEffect } from "react";
import { IconButton, Typography } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
// Styles
import useStyles from "./CardImageStyles";

const CardImage = ({ photo, favoritesPhotos, onFavoriteClick }) => {
  const classes = useStyles();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    onFavoriteClick(photo);
  };

  const handleClickOnImage = (imgUrl) => {
    if (imgUrl?.trim()?.length > 0) {
      window.open(imgUrl, "_blank");
    }
  };

  useEffect(() => {
    const isPhotoFavorite = favoritesPhotos.some(
      (favorite) => favorite.id === photo.id
    );
    setIsFavorite(isPhotoFavorite);
  }, [photo, favoritesPhotos]);

  return (
    <div key={photo?.id} className={classes.imageWrapper}>
      <img src={photo?.img_src} alt={photo?.id} className={classes.image} />
      <div
        className={classes.description}
        onClick={() => handleClickOnImage(photo?.img_src)}
      >
        <Typography variant="caption">{photo?.camera?.full_name}</Typography>
        <Typography variant="caption">{`Camera: ${photo?.camera?.name}`}</Typography>
        <Typography variant="caption">{`Earth Date: ${photo?.earth_date}`}</Typography>
        <Typography variant="caption">{`Sol: ${photo?.sol}`}</Typography>
      </div>
      <div className={classes.hoverOverlay}>
        <IconButton aria-label="Add to favorites" onClick={handleFavoriteClick}>
          <FavoriteIcon
            className={`${classes.hoverIcon} ${
              isFavorite ? classes.favoriteIcon : ""
            }`}
            style={{ color: isFavorite ? "red" : "#fff" }}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default CardImage;
