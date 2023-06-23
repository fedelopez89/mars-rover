import React, { useEffect, useState } from "react";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
// Components
import CardImage from "../CardImage/CardImage";
import Header from "../Header/Header";
// Constants
import * as CONST_CONFIG from "../../constants/roverPhotos";
import * as CONST_BUTTON from "../../constants/buttons";
// Styles
import useStyles from "../RoverPhotos/RoverPhotosStyles";

const FavoritePhotos = () => {
  const classes = useStyles();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoritesPhotos");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const renderPhotos = (photos) => {
    if (!photos || photos?.length === 0) {
      return (
        <div className={classes.noResultsContainer}>
          <Typography variant="body1">{CONST_CONFIG.NO_FAV_IMAGES}</Typography>
        </div>
      );
    }
    return photos?.map((photo) => (
      <CardImage key={photo.id} photo={photo} favoritesPhotos={favorites} />
    ));
  };

  return (
    <div className={classes.root}>
      <Header />
      <Button
        variant="contained"
        color="primary"
        component={Link}
        className={classes.customButton}
        to="/mars-rover-photos"
      >
        {CONST_BUTTON.BUTTON_GO_BACK}
      </Button>
      <div className={classes.imageContainer}>{renderPhotos(favorites)}</div>
    </div>
  );
};

export default FavoritePhotos;
