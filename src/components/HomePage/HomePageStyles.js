import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    homePageWrapper: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        flexDirection: "column",
        gap: "2%",
    },
    container: {
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
        color: "white",
        fontFamily: "cursive",
        marginBottom: theme.spacing(2),
        fontWeight: "bold",
        fontSize: "3rem",
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
        transition: "opacity 1s ease-in-out 1.25s",
    },
    buttonContainerVisible: {
        opacity: 1,
    },
    startButton: {
        width: "100%",
        marginTop: theme.spacing(1),
        backgroundColor: "#67513e",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#91745c",
        },
        "&:focus": {
            backgroundColor: "#91745c",
        },
    },
}));

export default useStyles;
