import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFavorite } from "../../store/slices/favouritesSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import "./FavouritePage.css";
import { ImageComponent } from "../../components/ImageComponent/ImageComponent";

function FavoritesPage() {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const dispatch = useDispatch();

  const handleRemoveFavorite = (breedId: string) => {
    dispatch(removeFavorite(breedId));
  };

  if (favorites.length === 0) {
    return <p>No favorite breeds yet!</p>;
  }

  return (
    <div>
      <h2>Your Favorite Breeds</h2>
      <TableContainer>
        <Table className="favorite-table">
          <TableHead>
            <TableRow>
              <TableCell>Breed Name</TableCell>
              <TableCell>Life Expectancy</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {favorites.map((breed: any) => (
              <TableRow key={breed.id}>
                <TableCell>{breed.name}</TableCell>
                <TableCell>{breed.life_span}</TableCell>
                <TableCell>
                  <ImageComponent breed={breed} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveFavorite(breed.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h3>Comparison Table</h3>
      <TableContainer>
        <Table className="favorite-table">
          <TableHead>
            <TableRow>
              <TableCell>Breed Name</TableCell>
              {favorites.map((breed: any) => (
                <TableCell key={breed.id}>{breed.name}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Life Expectancy</TableCell>
              {favorites.map((breed: any) => (
                <TableCell key={breed.id}>{breed.life_span}</TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Breed Group</TableCell>
              {favorites.map((breed: any) => (
                <TableCell key={breed.id}>
                  {breed.breed_group || "N/A"}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Weight</TableCell>
              {favorites.map((breed: any) => (
                <TableCell key={breed.id}>
                  {breed.weight?.metric || "N/A"}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Height</TableCell>
              {favorites.map((breed: any) => (
                <TableCell key={breed.id}>
                  {breed.height?.metric || "N/A"}
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              <TableCell>Temperament</TableCell>
              {favorites.map((breed: any) => (
                <TableCell key={breed.id}>
                  {breed.temperament || "N/A"}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FavoritesPage;
