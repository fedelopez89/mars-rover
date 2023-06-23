import React, { useRef } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import marsImage from "../../assets/mars-image.gif";
// Constants
import * as CONST_CONFIG from "../../constants/roverPhotos";
import * as CONST_BUTTON from "../../constants/buttons";
// Styles
import useStyles from "./HomePageStyles";

function HomePage() {
  const classes = useStyles();
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

  const handleImageLoaded = () => {
    imageRef.current.classList.add(classes.overlayVisible);
    titleRef.current.classList.add(classes.titleVisible);
    buttonRef.current.classList.add(classes.buttonContainerVisible);
  };

  return (
    <div className={classes.homePageWrapper}>
      <Typography variant="h2" className={classes.title}>
        {CONST_CONFIG.HOME_PAGE_TITLE}
      </Typography>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={6} className={classes.imageContainer}>
          <img
            src={marsImage}
            alt="Mars"
            className={classes.image}
            onLoad={handleImageLoaded}
            ref={imageRef}
          />
        </Grid>
      </Grid>
      <div className={`${classes.overlay}`} ref={titleRef}>
        <div className={`${classes.buttonContainer}`} ref={buttonRef}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            className={classes.startButton}
            to="/mars-rover-photos"
          >
            {CONST_BUTTON.BUTTON_HOME_PAGE_START}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
