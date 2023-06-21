import React, { useState } from "react";
import {
    Grid,
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    IconButton,
    TextField,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@mui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
// Images
import marsImage2 from "../assets/mars-image2.gif";
// Utils
import useMarsRoverPhotos from "../hooks/useMarsRoverPhotos";

const cameraOptions = [
    "All",
    "FHAZ",
    "RHAZ",
    "MAST",
    "CHEMCAM",
    "MAHLI",
    "MARDI",
    "NAVCAM",
    "PANCAM",
    "MINITES",
];

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        padding: theme.spacing(3),
    },
    header: {
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        marginBottom: theme.spacing(3),
    },
    headerImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    loaderContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 300,
    },
    loader: {
        margin: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: "100%",
    },
    inputLabel: {
        color: "#fff",
    },
    textField: {
        color: "#fff",
    },
    imageContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        minHeight: 400,
        "& > .MuiGrid-item": {
            flex: "0 0 calc(25% - 16px)", // Ancho del 25% con margen entre elementos
            margin: theme.spacing(1),
        },
    },
    imageWrapper: {
        position: "relative",
        width: "200px",
        height: "200px",
        margin: theme.spacing(1),
        overflow: "hidden",
        cursor: "pointer",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.3s",
    },
    hoverOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
        transition: "opacity 0.3s",
        "&:hover": {
            opacity: 0.7,
        },
    },
    favoriteIcon: {
        color: "#fff",
        fontSize: 40,
        opacity: 1,
        transition: "opacity 0.3s",
    },
    "imageContainer:hover .favoriteIcon": {
        opacity: 0.9,
    },
    hoverIcon: {
        color: "#fff",
        fontSize: 40,
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(2),
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            borderRadius: 0,
        },
        "& .Mui-selected": {
            background: theme.palette.primary.main,
            color: "#fff",
            "&:hover": {
                background: theme.palette.primary.dark,
            },
        },
    },
    noResultsContainer: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: "#fff",
        borderRadius: theme.shape.borderRadius,
        textAlign: "center",
    },
}));

const RoverPhotos = () => {
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSol, setSelectedSol] = useState(null);
    const perPage = 25;

    const { photos, loading, totalPages } = useMarsRoverPhotos({
        rover: "curiosity",
        camera: selectedCamera === "All" ? null : selectedCamera,
        earth: selectedDate,
        sol: selectedSol,
        page: currentPage,
        perPage,
    });

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleCameraChange = (event) => {
        setSelectedCamera(event.target.value);
        setCurrentPage(1);
    };

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
        setCurrentPage(1);
    };

    const handleSolChange = (event) => {
        setSelectedSol(event.target.value);
        setCurrentPage(1);
    };

    const handleFavoriteClick = (event) => {
        event.stopPropagation();
        // Lógica para agregar a favoritos
    };

    const renderPhotos = () => {
        if (photos.length === 0) {
            return (
                <div className={classes.noResultsContainer}>
                    <Typography variant="body1">
                        No images found for the requested search. Please enter new search
                        criteria.
                    </Typography>
                </div>
            );
        }

        return photos.map((photo) => (
            <div key={photo.id} className={classes.imageWrapper}>
                <img src={photo.img_src} alt={photo.id} className={classes.image} />
                <div className={classes.hoverOverlay}>
                    <IconButton
                        aria-label="Add to favorites"
                        onClick={handleFavoriteClick}
                    >
                        <FavoriteIcon className={classes.hoverIcon} />
                    </IconButton>
                </div>
            </div>
        ));
    };

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <img src={marsImage2} alt="Header" className={classes.headerImage} />
            </header>
            {loading ? (
                <div className={classes.loaderContainer}>
                    <CircularProgress className={classes.loader} />
                </div>
            ) : (
                <div>
                    <Grid container spacing={2}>
                        {/* Camera Filter */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel
                                    className={classes.inputLabel}
                                    id="camera-filter-label"
                                >
                                    Select Camera
                                </InputLabel>
                                <Select
                                    labelId="camera-filter-label"
                                    id="camera-filter"
                                    value={selectedCamera || ""}
                                    onChange={handleCameraChange}
                                >
                                    {cameraOptions.map((camera) => (
                                        <MenuItem key={camera} value={camera}>
                                            {camera}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* Earth Day Date */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Earth Day Date"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                    className: classes.inputLabel,
                                }}
                                value={selectedDate || ""}
                                onChange={handleDateChange}
                            />
                        </Grid>
                        {/* Sol */}
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <TextField
                                label="Sol"
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
                    </Grid>
                    <div className={classes.imageContainer}>{renderPhotos()}</div>
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
                </div>
            )}
        </div>
    );
};

export default RoverPhotos;
