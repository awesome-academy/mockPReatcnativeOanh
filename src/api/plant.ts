import { Plant } from '@/types/product';
import axiosClient from './axiosClient';

const API_ENDPOINT = '/plants';

export const getListAllPlants = async (filters = {}): Promise<Plant[]> => {
  const query = new URLSearchParams(filters).toString();
  try {
    const response = await axiosClient.get<Plant[]>(`${API_ENDPOINT}?${query}`);
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

export const getPlantById = async (
  id: string | number,
  options?: { signal?: AbortSignal },
): Promise<Plant> => {
  try {
    const response = await axiosClient.get<Plant>(`${API_ENDPOINT}/${id}`, {
      signal: options?.signal,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
