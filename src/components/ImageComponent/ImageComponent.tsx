import { useImage } from "../../hooks/useImage";
import ErrorComponent from "../ErrorComponent/ErrorComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

export function ImageComponent({ breed }: any) {
  const { data: image, isLoading, isError, error } = useImage(breed);

  if (isLoading)
    return (
      <LoadingComponent message="Loading the selected breed's image. Please wait" />
    );
  if (isError)
    return (
      <ErrorComponent
        message={`Error fetching image details:: ${error.message}`}
      />
    );

  return (
    <>
      <img src={image} alt={breed.name} />
    </>
  );
}
