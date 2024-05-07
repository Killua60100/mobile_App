import { api } from '../api';

export const getallplaygames = async () => {
  try {
    const response = await api.get('/games');
    return response.data;
  } catch (error) {
    console.error('Error fetching games:', error);
    return []; 
  }
};

export const getGameCategories = async () => {
  try {
    const response = await api.get('/category');
    return response.data;
  } catch (error) {
    console.error('Error fetching game categories:', error);
    return [];
  }
};
