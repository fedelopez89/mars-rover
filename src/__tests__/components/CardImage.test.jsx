import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CardImage from "../../components/CardImage/CardImage";

const mockPhoto = {
  id: 1152421,
  sol: 3866,
  camera: {
    id: 23,
    name: "CHEMCAM",
    rover_id: 5,
    full_name: "Chemistry and Camera Complex",
  },
  img_src:
    "https://mars.nasa.gov/msl-raw-images/proj/msl/redops/ods/surface/sol/03866/soas/rdr/ccam/CR0_740693647PRC_F1012474CCAM01866L1.PNG",
  earth_date: "2023-06-22",
  rover: {
    id: 5,
    name: "Curiosity",
    landing_date: "2012-08-06",
    launch_date: "2011-11-26",
    status: "active",
  },
};

describe("CardImage component", () => {
  test("renders correctly without errors", () => {
    render(<CardImage photo={mockPhoto} favoritesPhotos={[]} />);
    // Check that no exceptions were thrown
    expect(screen.queryByTestId("error-message")).toBeNull();
    // Check that essential elements are present
    expect(screen.getByAltText(mockPhoto.id)).toBeInTheDocument();
    expect(screen.getByText(mockPhoto.camera.full_name)).toBeInTheDocument();
  });
  test("handles favorite click correctly", () => {
    const onFavoriteClick = jest.fn();
    render(
      <CardImage
        photo={mockPhoto}
        favoritesPhotos={[]}
        onFavoriteClick={onFavoriteClick}
      />
    );
    // Check that initial state is false
    expect(screen.getByLabelText("Add to favorites")).toHaveStyle({
      color: "rgba(0, 0, 0, 0.54)",
    });
    // Simulate click on the favorite icon
    fireEvent.click(screen.getByLabelText("Add to favorites"));
    // Check that onFavoriteClick function was called correctly
    expect(onFavoriteClick).toHaveBeenCalledWith(mockPhoto);
    // Check that initial state is rgba(0, 0, 0, 0.54)
    expect(screen.getByLabelText("Add to favorites")).toHaveStyle({
      color: "rgba(0, 0, 0, 0.54)",
    });
  });
  test("handles image click correctly", () => {
    window.open = jest.fn();
    render(<CardImage photo={mockPhoto} favoritesPhotos={[]} />);
    // Simulate click on the image description
    fireEvent.click(screen.getByText(mockPhoto.camera.full_name));
    // Check that window.open function was called correctly with the image URL
    expect(window.open).toHaveBeenCalledWith(mockPhoto.img_src, "_blank");
  });
});
