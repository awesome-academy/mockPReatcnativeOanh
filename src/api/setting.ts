import axiosClient from './axiosClient';
import { Question, Tutorial } from '@/types/setting';

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
