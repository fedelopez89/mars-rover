import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
}));

export default useStyles;
