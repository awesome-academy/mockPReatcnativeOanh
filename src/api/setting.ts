import axiosClient from './axiosClient';
import { Order, Question, Tutorial } from '@/types/setting';

export const getListQuestions = async (): Promise<Question[]> => {
  try {
    const response = await axiosClient.get<Question[]>('/questions');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getListTutorials = async (): Promise<Tutorial[]> => {
  try {
    const response = await axiosClient.get<Tutorial[]>('/tutorials');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTutorialById = async (id: number | string): Promise<Tutorial> => {
  try {
    const response = await axiosClient.get<Tutorial>(`/tutorials/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getListOrderHistory = async (): Promise<Order[]> => {
  try {
    const response = await axiosClient.get<Order[]>('/orders');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (id: number | string): Promise<Order> => {
  try {
    const response = await axiosClient.get<Order>(`/orders/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
