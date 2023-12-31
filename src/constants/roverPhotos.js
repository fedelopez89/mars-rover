export const HOME_PAGE_TITLE = "Mars Rover";
//
export const SEARCH_CAMERA = "Search by Camera";
export const SEARCH_ROVER = "Search by Rover";
export const SEARCH_EARTH_DAY_DATE = "Search by Earth Day Date";
export const SEARCH_SOL = "Search by Sol (number)";
//
export const ROVER_OPTIONS = [
    { value: "curiosity", text: "curiosity" },
    { value: "opportunity", text: "opportunity" },
    { value: "spirit", text: "spirit" },
];
export const CAMERA_OPTIONS = [
    { value: "all", text: "All Cameras" },
    { value: "FHAZ", text: "Front Hazard Avoidance Camera" },
    { value: "RHAZ", text: "Rear Hazard Avoidance Camera" },
    { value: "MAST", text: "Mast Camera" },
    { value: "CHEMCAM", text: "Chemistry and Camera Complex" },
    { value: "MAHLI", text: "Mars Hand Lens Imager" },
    { value: "MARDI", text: "Mars Descent Imager" },
    { value: "NAVCAM", text: "Navigation Camera" },
    { value: "PANCAM", text: "Panoramic Camera" },
    {
        value: "MINITES",
        text: "Miniature Thermal Emission Spectrometer (Mini-TES)",
    },
];
//
export const NO_IMAGES_FOUND =
    "No images found for the requested search. Please enter new search criteria.";
export const NO_FAV_IMAGES =
    "Favorite images are not currently being recorded.";
//
export const DEFAULT_ROVER = "curiosity";
//
export const BASE_URL = "https://api.nasa.gov/mars-photos/api/v1/rovers";
export const API_KEY = "wljhnnGdFl9r3MLBTzyMrKTjItUWJ7pqzijkAGuf";
export const IMAGES_PER_PAGE = 25;
//
export const MODAL_TITLE_FAV_SEARCHS = "Favorite Searches";
export const PARAMS_SEARCH_FAV = "Rover - Camera - Earth Date - Sol";
export const NO_FAV_SEARCHES = "No favorite searches are currently saved.";
//