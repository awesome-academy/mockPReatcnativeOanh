import { PlantPot } from '@/types/product';
import axiosClient from './axiosClient';

const API_ENDPOINT = '/plant_pots';

export const getListPlantPots = async (): Promise<PlantPot[]> => {
  try {
    const response = await axiosClient.get<PlantPot[]>(API_ENDPOINT);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getListLimitedPlantPots = async (
  limit: number,
  page: number = 1,
): Promise<PlantPot[]> => {
  try {
    const response = await axiosClient.get<PlantPot[]>(
      `${API_ENDPOINT}?_limit=${limit}&_page=${page}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getPlantPotById = async (id: string): Promise<PlantPot> => {
  try {
    const response = await axiosClient.get<PlantPot>(`${API_ENDPOINT}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
