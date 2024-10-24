import { CircularProgress } from "@mui/material";
import "./LoadingComponent.css";

function LoadingComponent({ message }: { message: string }) {
  return (
    <div className="container">
      <p>{message}</p>
      <CircularProgress />
    </div>
  );
}
export default LoadingComponent;
