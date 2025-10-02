import { Tool } from '@/types/product';
import axiosClient from './axiosClient';

const API_ENDPOINT = '/tools';

export const getListTools = async (filters = {}): Promise<Tool[]> => {
  const query = new URLSearchParams(filters).toString();
  try {
    const response = await axiosClient.get<Tool[]>(`${API_ENDPOINT}?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getListLimitedTools = async (
  limit: number,
  page: number = 1,
): Promise<Tool[]> => {
  try {
    const response = await axiosClient.get<Tool[]>(
      `${API_ENDPOINT}?_limit=${limit}&_page=${page}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getToolById = async (
  id: string | number,
  options?: { signal?: AbortSignal },
): Promise<Tool> => {
  try {
    const response = await axiosClient.get<Tool>(`${API_ENDPOINT}/${id}`, {
      signal: options?.signal,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
