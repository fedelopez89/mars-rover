import React, { useCallback, useEffect, useReducer } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { Pagination } from "@mui/material";
import { CheckCircle, Close } from "@material-ui/icons";
import { Link } from "react-router-dom";
// Components
import CardImage from "../CardImage/CardImage";
import Header from "../Header/Header";
import {
  galleryPhotosReducer,
  initialState,
  actionTypes,
} from "../../reducers/galleryPhotos";
// Utils
import useMarsRoverPhotos from "../../hooks/useMarsRoverPhotos";
// Constants
import * as CONST_CONFIG from "../../constants/roverPhotos";
import * as CONST_BUTTON from "../../constants/buttons";
// Styles
import useStyles from "./RoverPhotosStyles";

const RoverPhotos = () => {
  const classes = useStyles();

  const [galleryState, dispatchGalleryAction] = useReducer(
    galleryPhotosReducer,
    initialState
  );

  const { photos, loading, totalPages } = useMarsRoverPhotos({
    rover: galleryState?.selectedRover,
    camera:
      galleryState?.selectedCamera === "all"
        ? null
        : galleryState?.selectedCamera,
    earth:
      galleryState?.selectedDate === "" ? null : galleryState?.selectedDate,
    sol: galleryState?.selectedSol,
    page: galleryState?.currentPage,
  });

  const handleFavoriteSave = useCallback(() => {
    dispatchGalleryAction({
      type: actionTypes.SAVE_FAV_SEARCH,
    });
  }, []);

  const handlePageChange = useCallback((_, page) => {
    dispatchGalleryAction({
      type: actionTypes.SET_CURRENT_PAGE,
      payload: {
        page,
      },
    });
  }, []);

  const handleRoverChange = useCallback((event) => {
    dispatchGalleryAction({
      type: actionTypes.SET_CURRENT_ROVER,
      payload: {
        rover: event.target.value,
      },
    });
  }, []);

  const handleCameraChange = useCallback((event) => {
    dispatchGalleryAction({
      type: actionTypes.SET_CURRENT_CAMERA,
      payload: {
        camera: event.target.value,
      },
    });
  }, []);

  const handleDateChange = useCallback((event) => {
    dispatchGalleryAction({
      type: actionTypes.SET_CURRENT_DATE,
      payload: {
        date: event.target.value,
      },
    });
  }, []);

  const handleSolChange = useCallback((event) => {
    dispatchGalleryAction({
      type: actionTypes.SET_CURRENT_SOL,
      payload: {
        sol: event.target.value,
      },
    });
  }, []);

  const handleFavoriteClick = useCallback((photo) => {
    dispatchGalleryAction({
      type: actionTypes.SET_FAVORITE_PHOTO,
      payload: {
        photo,
      },
    });
  }, []);

  const handleOpenFavoriteSave = useCallback(() => {
    dispatchGalleryAction({
      type: actionTypes.OPEN_FAV_MODAL,
      payload: {
        value: true,
      },
    });
  }, []);

  const handleFavoriteSelection = useCallback((selectedFavorite) => {
    dispatchGalleryAction({
      type: actionTypes.SELECT_FAV_SEARCH,
      payload: {
        selectedFavorite,
      },
    });
  }, []);

  const handleRemoveFavorite = useCallback((favSelected) => {
    dispatchGalleryAction({
      type: actionTypes.REMOVE_FAV_SEARCH,
      payload: {
        favSelected,
      },
    });
  }, []);

  const renderPhotos = useCallback(() => {
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
        favoritesPhotos={galleryState?.favoritesPhotos}
        onFavoriteClick={handleFavoriteClick}
      />
    ));
  }, [
    photos,
    classes.noResultsContainer,
    galleryState?.favoritesPhotos,
    handleFavoriteClick,
  ]);

  useEffect(() => {
    dispatchGalleryAction({
      type: actionTypes.INITIALIZE,
    });
  }, []);

  return (
    <div className={classes.root}>
      <Header />
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
                value={galleryState?.selectedRover || ""}
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
                value={galleryState?.selectedCamera || ""}
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
                shrink={Boolean(galleryState?.selectedDate)}
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
                  inputProps: {
                    min: "1900-01-01",
                    max: "2100-12-31",
                  },
                }}
                value={galleryState?.selectedDate}
                onChange={handleDateChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <InputLabel
                className={classes.inputLabel}
                id="date-input-label"
                shrink={Boolean(galleryState?.selectedSol)}
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
                value={galleryState?.selectedSol || ""}
                onChange={handleSolChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Button
                onClick={handleFavoriteSave}
                className={classes.saveButton}
              >
                {CONST_BUTTON.BUTTON_ADD_TO_FAV}
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <Button
                onClick={handleOpenFavoriteSave}
                className={classes.secondaryButton}
              >
                {CONST_BUTTON.BUTTON_OPEN_SEARCH_FAV}
              </Button>
            </Grid>
          </Grid>
        </div>
        <Button
          component={Link}
          to="/mars-rover-photos/favorites"
          className={classes.customButton}
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
                  page={galleryState.currentPage}
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
      <Modal
        open={galleryState?.openFavoriteModal}
        onClose={() =>
          dispatchGalleryAction({
            type: actionTypes.OPEN_FAV_MODAL,
            payload: {
              value: false,
            },
          })
        }
        className={classes.favoriteModalWrapper}
      >
        <div className={classes.favoriteModal}>
          <Typography variant="h6" className={classes.favoriteModalTitle}>
            {CONST_CONFIG.MODAL_TITLE_FAV_SEARCHS}
          </Typography>
          <Typography className={classes.favoriteModalItem} variant="h6">
            {galleryState?.favorites?.length === 0
              ? CONST_CONFIG.NO_FAV_SEARCHES
              : CONST_CONFIG.PARAMS_SEARCH_FAV}
          </Typography>
          {galleryState?.favorites?.map((favorite, index) => (
            <div key={index} className={classes.favoriteModalItem}>
              <Typography
                className={classes.favoriteRowData}
                variant="body1"
              >{`${favorite?.rover} - ${favorite?.camera} - ${favorite?.date} - ${favorite?.sol}`}</Typography>
              <IconButton
                className={classes.selectFavoriteButton}
                onClick={() => handleFavoriteSelection(favorite)}
              >
                <CheckCircle />
              </IconButton>
              <IconButton
                className={classes.removeFavoriteButton}
                onClick={() => handleRemoveFavorite(favorite)}
              >
                <Close />
              </IconButton>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default RoverPhotos;
