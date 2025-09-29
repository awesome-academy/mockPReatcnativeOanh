import axiosClient from './axiosClient';
import { Question } from '@/types/setting';

export const getListQuestions = async (): Promise<Question[]> => {
  try {
    const response = await axiosClient.get<Question[]>('/questions');
    return response.data;
  } catch (error) {
    throw error;
  }
};
