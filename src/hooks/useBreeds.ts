import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FETCH_BREEDS_BASE_URL } from "../constants/baseUrls";
import { API_KEY } from "../constants/apikey";

const fetchBreeds = async () => {
  try {
    const { data } = await axios.get(FETCH_BREEDS_BASE_URL, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    return data;
  } catch (error) {
    throw new Error("Failed to load breeds");
  }
};

export const useBreeds = () => {
  return useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
  });
};
