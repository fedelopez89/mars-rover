import React, { useState } from "react";
import {
    Grid,
    CircularProgress,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Pagination } from "@mui/lab";

import useMarsRoverPhotos from "../hooks/useMarsRoverPhotos";
import marsImage2 from "../assets/mars-image2.gif";

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
    header: {
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
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
        maxWidth: 300,
    },
    imageContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
    },
    image: {
        width: "200px",
        height: "200px",
        objectFit: "cover",
        margin: theme.spacing(1),
    },
    paginationContainer: {
        display: "flex",
        justifyContent: "center",
        margin: theme.spacing(2),
    },
}));

const RoverPhotos = () => {
    const classes = useStyles();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCamera, setSelectedCamera] = useState("All");
    const perPage = 25;

    const { photos, loading, totalPages } = useMarsRoverPhotos({
        rover: "curiosity",
        camera: selectedCamera === "All" ? null : selectedCamera,
        /* earth: null, */
        sol: null,
        page: currentPage,
        perPage,
    });

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const handleCameraChange = (event) => {
        setSelectedCamera([event.target.value]);
        setCurrentPage(1);
    };

    const renderPhotos = () => {
        return photos.map((photo) => (
            <img
                key={photo.id}
                src={photo.img_src}
                alt={photo.id}
                className={classes.image}
            />
        ));
    };

    return (
        <div>
            <header className={classes.header}>
                <img src={marsImage2} alt="Header" className={classes.headerImage} />
            </header>
            {loading ? (
                <div className={classes.loaderContainer}>
                    <CircularProgress className={classes.loader} />
                </div>
            ) : (
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="camera-filter-label">Select Camera</InputLabel>
                        <Select
                            labelId="camera-filter-label"
                            id="camera-filter"
                            value={selectedCamera}
                            onChange={handleCameraChange}
                        >
                            {cameraOptions.map((camera) => (
                                <MenuItem key={camera} value={camera}>
                                    {camera}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Grid container className={classes.imageContainer}>
                        {renderPhotos()}
                    </Grid>
                    <div className={classes.paginationContainer}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoverPhotos;
