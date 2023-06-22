import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@mui/material";
import { Link } from "react-router-dom";
// Components
import CardImage from "../CardImage/CardImage";
// Images
import marsImage2 from "../../assets/mars-image2.jpeg";
// Utils
import useMarsRoverPhotos, {
  getEarthDate,
} from "../../hooks/useMarsRoverPhotos";
// Constants
import * as CONST_CONFIG from "../../constants/roverPhotos";
import * as CONST_BUTTON from "../../constants/buttons";
// Styles
import useStyles from "./RoverPhotosStyles";

const RoverPhotos = () => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [selectedRover, setSelectedRover] = useState("curiosity");
  const [selectedDate, setSelectedDate] = useState(getEarthDate());
  const [selectedSol, setSelectedSol] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesPhotos, setFavoritesPhotos] = useState([]);
  const perPage = 25;

  const { photos, loading, totalPages } = useMarsRoverPhotos({
    rover: selectedRover,
    camera: selectedCamera === "all" ? null : selectedCamera,
    earth: selectedDate === "" ? null : selectedDate,
    sol: selectedSol,
    page: currentPage,
    perPage,
  });

  const handleFavoriteSave = () => {
    if (selectedRover || selectedCamera || selectedDate || selectedSol) {
      const newFavorite = {
        rover: selectedRover,
        camera: selectedCamera,
        date: selectedDate,
        sol: selectedSol,
      };
      setFavorites((prevFavorites) =>
        prevFavorites?.length > 0
          ? [...prevFavorites, newFavorite]
          : [newFavorite]
      );
      localStorage.setItem("favoriteSearch", JSON.stringify(newFavorite));
    }
  };

  const handlePageChange = useCallback((event, page) => {
    setCurrentPage(page);
  }, []);

  const handleRoverChange = useCallback((event) => {
    setSelectedRover(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleCameraChange = useCallback((event) => {
    setSelectedCamera(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleDateChange = useCallback((event) => {
    setSelectedDate(event.target.value);
    setSelectedSol("");
    setCurrentPage(1);
  }, []);

  const handleSolChange = useCallback((event) => {
    setSelectedSol(event.target.value);
    setSelectedDate(" ");
    setCurrentPage(1);
  }, []);

  const handleFavoriteClick = useCallback((photo) => {
    setFavoritesPhotos((prevFavorites) => {
      const isFavorite = prevFavorites.some(
        (favorite) => favorite.id === photo.id
      );
      let updatedFavorites = [];
      if (isFavorite) {
        updatedFavorites = prevFavorites.filter(
          (favorite) => favorite.id !== photo.id
        );
      } else {
        updatedFavorites = [...prevFavorites, photo];
      }
      localStorage.setItem("favoritesPhotos", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  }, []);

  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem("favoritesPhotos");
    const initialFavoritesPhotos = favoritesFromStorage
      ? JSON.parse(favoritesFromStorage)
      : [];
    setFavoritesPhotos(initialFavoritesPhotos);
  }, []);

  const renderPhotos = () => {
    if (photos?.length === 0) {
      return (
        <div className={classes.noResultsContainer}>
          <Typography variant="body1">
            {CONST_CONFIG.NO_IMAGES_FOUND}
          </Typography>
        </div>
      );
    }
    return photos?.map((photo) => (
      <CardImage
        key={photo.id}
        photo={photo}
        favoritesPhotos={favoritesPhotos}
        onFavoriteClick={handleFavoriteClick}
      />
    ));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteSearch");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <img src={marsImage2} alt="Header" className={classes.headerImage} />
      </header>
      <div>
        <div className={classes.searchWrapper}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <InputLabel
                className={classes.inputLabel}
                id="rover-search-label"
                shrink
              >
                {CONST_CONFIG.SEARCH_ROVER}
              </InputLabel>
              <Select
                labelId="rover-search-label"
                id="rover-search"
                value={selectedRover || ""}
                onChange={handleRoverChange}
                className={classes.selectField}
              >
                {CONST_CONFIG.ROVER_OPTIONS.map(({ value, text }) => (
                  <MenuItem key={value} value={value}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <InputLabel
                className={classes.inputLabel}
                id="camera-search-label"
                shrink
              >
                {CONST_CONFIG.SEARCH_CAMERA}
              </InputLabel>
              <Select
                labelId="camera-search-label"
                id="camera-search"
                value={selectedCamera || ""}
                onChange={handleCameraChange}
                className={classes.selectField}
              >
                {CONST_CONFIG.CAMERA_OPTIONS.map(({ value, text }) => (
                  <MenuItem key={value} value={value}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <InputLabel
                className={classes.inputLabel}
                id="date-input-label"
                shrink={Boolean(selectedDate)}
              >
                {CONST_CONFIG.SEARCH_EARTH_DAY_DATE}
              </InputLabel>
              <TextField
                label=" "
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                  className: classes.inputLabel,
                }}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <InputLabel
                className={classes.inputLabel}
                id="date-input-label"
                shrink={Boolean(selectedDate)}
              >
                {CONST_CONFIG.SEARCH_SOL}
              </InputLabel>
              <TextField
                label=" "
                type="number"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                  className: classes.inputLabel,
                }}
                value={selectedSol || ""}
                onChange={handleSolChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleFavoriteSave}
                className={classes.saveButton}
              >
                {CONST_BUTTON.BUTTON_ADD_TO_FAV}
              </Button>
            </Grid>
          </Grid>
        </div>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/mars-rover-photos/favorites"
        >
          {CONST_BUTTON.BUTTON_VIEW_FAV}
        </Button>
        {loading && (
          <div className={classes.loaderContainer}>
            <CircularProgress className={classes.loader} />
          </div>
        )}
        {!loading && (
          <div>
            <div className={classes.imageContainer}>{renderPhotos()}</div>
            {photos?.length > 0 && (
              <div className={classes.paginationContainer}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  variant="outlined"
                  shape="rounded"
                  className={classes.pagination}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoverPhotos;
