import { API_URL } from '@env';
import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_URL}/your-endpoint`);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
  }
};
