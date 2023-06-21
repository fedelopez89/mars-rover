import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    container: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
    },
    imageContainer: {
        position: "relative",
        width: 400,
        height: 400,
        overflow: "hidden",
        borderRadius: "50%",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#fff",
        opacity: 0,
        transition: "opacity 1s ease-in-out",
    },
    overlayVisible: {
        opacity: 1,
    },
    title: {
        marginBottom: theme.spacing(2),
        fontWeight: "bold",
        fontSize: "2rem",
        textAlign: "center",
        transition: "opacity 1s ease-in-out 1s",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.6)",
    },
    titleVisible: {
        opacity: 1,
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(2),
        opacity: 0,
        transition: "opacity 1s ease-in-out 2s",
    },
    buttonContainerVisible: {
        opacity: 1,
    },
}));

export default useStyles;
