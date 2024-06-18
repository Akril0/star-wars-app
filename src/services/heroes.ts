import $api from "@/http";
import {IHero, IHeroesArr} from "@/models/IHeroes";
import {fetchFilmsArrayById} from "@/services/films";
import {fetchStarshipsById} from "@/services/starships";


export const fetchHeroes = async (page: number) => {
    const response = await $api.get<IHeroesArr>(`/people/?page=${page}`);
    return response.data;
};

export const fetchHeroDetails = async (id: string) => {
    const responseHero = await $api.get<IHero>(`/people/${id}`);
    return responseHero.data;
};