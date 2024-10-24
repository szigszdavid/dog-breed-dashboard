import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Button, Paper, Grid2 as Grid } from "@mui/material";
import { useBreed } from "../../hooks/useBreed";
import { ImageComponent } from "../../components/ImageComponent/ImageComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
} from "../../store/slices/favouritesSlice";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import "./BreedDetail.css";

function BreedDetail() {
  const { id } = useParams<{ id: string }>();
  const [isFavorited, setIsFavorited] = useState(false);
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.favorites);

  if (!id)
    return <ErrorComponent message={`Failed to load breed by id: ${id}`} />;

  const { data: breed, isLoading, isError, error } = useBreed(id!);

  useEffect(() => {
    setIsFavorited(
      favorites.map((favorite: any) => favorite.id).includes(parseInt(id))
    );
  }, [id, favorites]);

  const handleFavoriteToggle = () => {
    if (breed) {
      if (isFavorited) {
        dispatch(removeFavorite(breed.id));
      } else {
        dispatch(addFavorite(breed));
      }

      setIsFavorited(!isFavorited);
    }
  };

  if (isLoading || id != breed.id)
    return (
      <LoadingComponent message="Loading the selected breed's image. Please wait" />
    );
  if (isError)
    return (
      <ErrorComponent
        message={`Error fetching breed details: ${error.message}`}
      />
    );

  return (
    <div className="container">
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid>
            <ImageComponent breed={breed} />
          </Grid>
          <Grid>
            <Typography variant="h4">{breed.name}</Typography>
            <Typography variant="h6">
              Breed Group: {breed.breed_group || "N/A"}
            </Typography>
            <Typography variant="h6">
              Life Expectancy: {breed.life_span}
            </Typography>
            <Typography variant="h6">
              Weight: {breed.weight?.metric || "N/A"}
            </Typography>
            <Typography variant="h6">
              Height: {breed.height?.metric || "N/A"}
            </Typography>
            <Typography variant="h6">
              Temperament: {breed.temperament || "N/A"}
            </Typography>
            <Button
              variant="contained"
              color={isFavorited ? "secondary" : "primary"}
              onClick={handleFavoriteToggle}
            >
              {isFavorited ? "Unfavorite" : "Favorite"}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default BreedDetail;
