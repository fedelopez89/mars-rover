import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  FormControl,
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
  const [selectedDate, setSelectedDate] = useState(getEarthDate());
  const [selectedSol, setSelectedSol] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoritesPhotos, setFavoritesPhotos] = useState([]);
  const perPage = 25;

  const { photos, loading, totalPages } = useMarsRoverPhotos({
    rover: "curiosity",
    camera: selectedCamera === "all" ? null : selectedCamera,
    earth: selectedDate === "" ? null : selectedDate,
    sol: selectedSol,
    page: currentPage,
    perPage,
  });

  const handleFavoriteSave = () => {
    if (selectedCamera || selectedDate || selectedSol) {
      const newFavorite = {
        camera: selectedCamera,
        date: selectedDate,
        sol: selectedSol,
      };
      setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
      localStorage.setItem("favoriteSearch", JSON.stringify(newFavorite));
    }
  };

  const handlePageChange = useCallback((event, page) => {
    setCurrentPage(page);
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
        <Grid container spacing={2} className={classes.fieldsContainer}>
          {/* Camera Filter */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <FormControl className={classes.formControl}>
              <InputLabel
                className={classes.inputLabel}
                id="camera-filter-label"
                shrink
              >
                {CONST_CONFIG.FIELD_CAMERA}
              </InputLabel>
              <Select
                labelId="camera-filter-label"
                id="camera-filter"
                value={selectedCamera || ""}
                onChange={handleCameraChange}
                displayEmpty
              >
                <MenuItem disabled value="">
                  {CONST_CONFIG.SELECT_CAMERA_FILTER}
                </MenuItem>
                {CONST_CONFIG.CAMERA_OPTIONS.map(({ value, text }) => (
                  <MenuItem key={value} value={value}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleFavoriteSave}
            >
              {CONST_BUTTON.BUTTON_ADD_TO_FAV}
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/mars-rover-photos/favorites"
            >
              {CONST_BUTTON.BUTTON_VIEW_FAV}
            </Button>
          </Grid>
          {/* Earth Day Date */}
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
              InputProps={{
                placeholder: "Select Earth Day Date",
              }}
              value={selectedDate}
              onChange={handleDateChange}
            />
          </Grid>
          {/* Sol */}
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
              InputProps={{
                placeholder: "Enter Sol",
              }}
              value={selectedSol || ""}
              onChange={handleSolChange}
            />
          </Grid>
        </Grid>
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
