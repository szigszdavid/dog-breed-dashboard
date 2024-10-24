import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FETCH_BREEDS_BASE_URL } from "../constants/baseUrls";
import { API_KEY } from "../constants/apikey";

const fetchBreed = async (id: string) => {
  try {
    const { data } = await axios.get(FETCH_BREEDS_BASE_URL + id, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    return data;
  } catch (error) {
    throw new Error(`Failed to load breed by id ${id}`);
  }
};

export const useBreed = (id: string) => {
  return useQuery({ queryKey: ["breed"], queryFn: () => fetchBreed(id) });
};
