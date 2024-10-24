import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DogList from "./features/BreedList/BreedList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BreedDetail from "./features/BreedDetails/BreedDetail";
import { Provider } from "react-redux";
import store from "./store/store";
import FavoritesPage from "./features/FavouritePage/FavouritePage";
import NavigationComponent from "./components/NavigationComponent/NavigationComponent";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <NavigationComponent />
          <Routes>
            <Route path="/" element={<DogList />} />
            <Route path="/breed/:id" element={<BreedDetail />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
