import React from "react";
import { IconButton } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
// Styles
import useStyles from "./CardImageStyles";

const CardImage = ({ photo, onFavoriteClick }) => {
  const classes = useStyles();

  const handleFavoriteClick = (event) => {
    event.stopPropagation();
    onFavoriteClick(photo);
  };

  return (
    <div key={photo.id} className={classes.imageWrapper}>
      <img src={photo.img_src} alt={photo.id} className={classes.image} />
      <div className={classes.hoverOverlay}>
        <IconButton aria-label="Add to favorites" onClick={handleFavoriteClick}>
          <FavoriteIcon className={classes.hoverIcon} />
        </IconButton>
      </div>
    </div>
  );
};

export default CardImage;
