import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        padding: theme.spacing(3),
        backgroundColor: "#917d6c",
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
        objectPosition: "100%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
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
    fieldsContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
        },
    },
    formControl: {
        marginTop: 0,
    },
    searchWrapper: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(3),
    },
    inputLabel: {
        fontWeight: "bold",
        textAlign: "left",
    },
    selectField: {
        textAlign: "left",
        width: "100%",
    },
    textField: {
        width: "100%",
        marginTop: 0,
        "& label + .MuiInput-formControl": {
            marginTop: 0,
        },
    },
    saveButton: {
        width: "100%",
        marginTop: theme.spacing(1),
        backgroundColor: "#000",
        color: "#fff",
        "&:hover": {
            backgroundColor: "#333",
        },
        "&:focus": {
            backgroundColor: "#555",
        },
    },
    secondaryButton: {
        width: "100%",
        marginTop: theme.spacing(1),
        backgroundColor: "#d7d7d7",
        color: "black",
        "&:hover": {
            backgroundColor: "#b8b8b8",
        },
        "&:focus": {
            backgroundColor: "#767575",
        },
    },
    imageContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        padding: "3% 5%",
        gap: "24px",
        minHeight: "30vh",
        "& > .MuiGrid-item": {
            flex: "0 0 calc(25% - 16px)",
            margin: theme.spacing(1),
        },
        paddingTop: "1%",
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
        fontStyle: "italic",
        fontWeight: "bold",
        fontSize: "1.2rem",
    },
    "label + .MuiInput-formControl": {
        marginTop: 0,
        width: "100%",
    },
}));

export default useStyles;
