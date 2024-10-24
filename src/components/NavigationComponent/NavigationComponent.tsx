import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./NavigationComponent.css";

function NavigationComponent() {
  return (
    <nav className="nav-container">
      <Button
        className="nav-button"
        component={Link}
        to="/"
        variant="contained"
        color="primary"
      >
        Dog Breeds
      </Button>
      <Button
        component={Link}
        to="/favorites"
        variant="contained"
        color="secondary"
      >
        Favorites
      </Button>
    </nav>
  );
}

export default NavigationComponent;
