import axios from 'axios';

const api = axios.create({
    baseURL: 'https://sw-api.starnavi.io',
});

export const fetchHeroes = async (page: number) => {
    const response = await api.get(`/people/?page=${page}`);
    return response.data;
};

export const fetchHeroDetails = async (id: string) => {
    const response = await api.get(`/heroes/${id}`);
    return response.data;
};