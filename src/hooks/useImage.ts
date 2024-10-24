import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FETCH_IMAGE_BASE_URL } from "../constants/baseUrls";
import { API_KEY } from "../constants/apikey";

const fetchImage = async (id: string) => {
  try {
    if (!id) return "";

    const { data } = await axios.get(FETCH_IMAGE_BASE_URL + id, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    return data.url;
  } catch (error) {
    throw new Error(`Failed to load image by id ${id}`);
  }
};

export const useImage = (breed: any) => {
  return useQuery({
    queryKey: ["image", breed],
    queryFn: () => fetchImage(breed.reference_image_id),
  });
};
