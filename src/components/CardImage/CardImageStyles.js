import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    imageWrapper: {
        position: "relative",
        width: "200px",
        height: "300px",
        margin: theme.spacing(1),
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        transition: "transform 0.3s",
    },
    hoverOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "200px",
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
    description: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "75px",
        marginTop: theme.spacing(1),
        fontSize: "14px",
        color: "#fff",
        textAlign: "center",
        padding: theme.spacing(1),
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        "&:hover": {
            backgroundColor: "rgb(117 90 90 / 60%)",
        },
    },
}));

export default useStyles;
