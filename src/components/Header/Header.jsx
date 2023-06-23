import React from "react";
// Images
import marsImage2 from "../../assets/mars-image2.jpeg";
// Styles
import useStyles from "./HeaderStyles";

const Header = () => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <img src={marsImage2} alt="Header" className={classes.headerImage} />
    </header>
  );
};

export default Header;
