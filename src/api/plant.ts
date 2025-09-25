import { Plant } from '@/types/product';
import axiosClient from './axiosClient';

const API_ENDPOINT = '/plants';

export const getListAllPlants = async (): Promise<Plant[]> => {
  try {
    const response = await axiosClient.get<Plant[]>(API_ENDPOINT);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getListLimitedPlants = async (
  limit: number,
  page: number = 1,
): Promise<Plant[]> => {
  try {
    const response = await axiosClient.get<Plant[]>(
      `${API_ENDPOINT}?_limit=${limit}&_page=${page}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPlantById = async (id: string): Promise<Plant> => {
  try {
    const response = await axiosClient.get<Plant>(`${API_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
