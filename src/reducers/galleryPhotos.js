// Constants
import * as CONST_CONFIG from "../constants/roverPhotos";
// Utils
import { getEarthDate } from "../hooks/useMarsRoverPhotos";

export const getFavoritesPhotos = () => {
    const favoritesFromStorage = localStorage.getItem("favoritesPhotos");
    return favoritesFromStorage ? JSON.parse(favoritesFromStorage) : [];
};

const getFavoritesSearchParams = () => {
    const storedFavorites = localStorage.getItem("favoriteSearch");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
};

// Define the initial state of the reducer
export const initialState = {
    currentPage: 1,
    selectedCamera: null,
    selectedRover: CONST_CONFIG.DEFAULT_ROVER,
    selectedDate: getEarthDate(),
    selectedSol: null,
    favorites: [],
    favoritesPhotos: [],
    openFavoriteModal: false,
};

// Define the action types
export const actionTypes = {
    INITIALIZE: "INITIALIZE",
    OPEN_FAV_MODAL: "OPEN_FAV_MODAL",
    REMOVE_FAV_SEARCH: "REMOVE_FAV_SEARCH",
    SAVE_FAV_SEARCH: "SAVE_FAV_SEARCH",
    SELECT_FAV_SEARCH: "SELECT_FAV_SEARCH",
    SET_CURRENT_CAMERA: "SET_CURRENT_CAMERA",
    SET_CURRENT_DATE: "SET_CURRENT_DATE",
    SET_CURRENT_PAGE: "SET_CURRENT_PAGE",
    SET_CURRENT_ROVER: "SET_CURRENT_ROVER",
    SET_CURRENT_SOL: "SET_CURRENT_SOL",
    SET_FAVORITE_PHOTO: "SET_FAVORITE_PHOTO",
};

// Define the reducer function
export function galleryPhotosReducer(state, action) {
    if (action.type === actionTypes.INITIALIZE) {
        return {
            ...state,
            favorites: getFavoritesSearchParams(),
            favoritesPhotos: getFavoritesPhotos(),
        };
    }
    if (action.type === actionTypes.OPEN_FAV_MODAL) {
        return {
            ...state,
            openFavoriteModal: action?.payload?.value,
        };
    }
    if (action.type === actionTypes.REMOVE_FAV_SEARCH) {
        localStorage.setItem(
            "favoriteSearch",
            JSON.stringify(
                state?.favorites.filter(
                    (favorite) => favorite !== action?.payload?.favSelected
                )
            )
        );
        const updFavorites = state?.favorites?.filter(
            (favorite) => favorite !== action?.payload?.favSelected
        );
        return {
            ...state,
            favorites: updFavorites,
        };
    }
    if (action.type === actionTypes.SAVE_FAV_SEARCH) {
        let updFavorites = state?.favorites;
        if (
            state?.selectedRover ||
            state?.selectedCamera ||
            state?.selectedDate ||
            state?.selectedSol
        ) {
            const newFavorite = {
                rover: state?.selectedRover,
                camera: state?.selectedCamera,
                date: state?.selectedDate,
                sol: state?.selectedSol,
            };
            const updatedFavorites =
                state?.favorites?.length > 0
                    ? [...state?.favorites, newFavorite]
                    : [newFavorite];
            localStorage.setItem("favoriteSearch", JSON.stringify(updatedFavorites));
            updFavorites =
                state?.favorites?.length > 0
                    ? [...state?.favorites, newFavorite]
                    : [newFavorite];
        }
        return {
            ...state,
            favorites: updFavorites,
        };
    }
    if (action.type === actionTypes.SELECT_FAV_SEARCH) {
        return {
            ...state,
            selectedCamera: action?.payload?.selectedFavorite.camera,
            selectedDate: action?.payload?.selectedFavorite.date,
            selectedRover: action?.payload?.selectedFavorite.rover,
            selectedSol: action?.payload?.selectedFavorite.sol,
            openFavoriteModal: false,
        };
    }
    if (action.type === actionTypes.SET_CURRENT_CAMERA) {
        return {
            ...state,
            currentPage: 1,
            selectedCamera: action?.payload?.camera,
        };
    }
    if (action.type === actionTypes.SET_CURRENT_DATE) {
        return {
            ...state,
            currentPage: 1,
            selectedDate: action?.payload?.date,
            selectedSol: "",
        };
    }
    if (action.type === actionTypes.SET_CURRENT_PAGE) {
        return {
            ...state,
            currentPage: action?.payload?.page,
        };
    }
    if (action.type === actionTypes.SET_CURRENT_ROVER) {
        return {
            ...state,
            currentPage: 1,
            selectedRover: action?.payload?.rover,
        };
    }
    if (action.type === actionTypes.SET_CURRENT_SOL) {
        return {
            ...state,
            currentPage: 1,
            selectedDate: "",
            selectedSol: action?.payload?.sol,
        };
    }
    if (action.type === actionTypes.SET_FAVORITE_PHOTO) {
        const currentFavPhotos = state?.favoritesPhotos;
        const isFavorite = currentFavPhotos?.some(
            (favorite) => favorite?.id === action?.payload?.photo?.id
        );
        let updatedFavorites = [];
        if (isFavorite) {
            updatedFavorites = currentFavPhotos?.filter(
                (favorite) => favorite.id !== action?.payload?.photo?.id
            );
        } else {
            updatedFavorites = [...currentFavPhotos, action?.payload?.photo];
        }
        localStorage.setItem("favoritesPhotos", JSON.stringify(updatedFavorites));
        return {
            ...state,
            favoritesPhotos: updatedFavorites,
        };
    }
}
