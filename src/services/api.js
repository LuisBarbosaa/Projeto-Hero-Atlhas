import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://akabab.github.io/superhero-api/api';

export const getAllHeroes = async () => {
  const response = await axios.get(`${BASE_URL}/all.json`);
  return response.data;
};

export const getHeroById = async (id) => {
  const response = await axios.get(`${BASE_URL}/id/${id}.json`);
  return response.data;
};
