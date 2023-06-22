import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "wljhnnGdFl9r3MLBTzyMrKTjItUWJ7pqzijkAGuf";

const useMarsRoverPhotos = ({
  rover,
  camera,
  earth = getEarthDate(),
  sol = null,
  page = 1,
  perPage = 25,
}) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setLoading(true);
        const params = {};

        if (camera) {
          params.camera = camera;
        }

        if (earth && !sol) {
          params.earth_date = earth;
        } else if (sol !== null) {
          params.sol = sol;
        } else if (!earth && !sol) {
          params.earth_date = getEarthDate();
        }

        params.api_key = API_KEY;

        const response = await axios.get(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos`,
          {
            params,
          }
        );
        setPhotos(
          response.data.photos.slice(
            perPage * (page - 1),
            perPage + perPage * (page - 1)
          )
        );
        setTotalPages(Math.ceil(response.data.photos.length / perPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Mars Rover Photos:", error);
      }
    };

    fetchPhotos();
  }, [rover, camera, earth, sol, perPage, page]);

  return { photos, loading, totalPages };
};

export const getEarthDate = () => {
  const now = new Date();
  const utcDate = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );
  const usDate = new Date(
    utcDate.toLocaleString("en-US", { timeZone: "America/New_York" })
  );

  const year = usDate.getFullYear();
  const month = String(usDate.getMonth() + 1);
  const day = String(usDate.getDate());

  return `${year}-${month}-${day}`;
};

export default useMarsRoverPhotos;
