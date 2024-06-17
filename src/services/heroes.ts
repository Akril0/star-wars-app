import $api from "@/http";
import {IHero, IHeroesArr} from "@/models/IHeroes";
import {fetchFilmsArrayById} from "@/services/films";
import {fetchStarshipsById} from "@/services/starships";


export const fetchHeroes = async (page: number) => {
    const response = await $api.get<IHeroesArr>(`/people/?page=${page}`);
    return response.data;
};

export const fetchHeroDetails = async (id: string) => {
    try {
        const responseHero = await $api.get<IHero>(`/people/${id}`);
        const responseFilms = await fetchFilmsArrayById(responseHero.data.films);
        const responseStarships = await fetchStarshipsById(responseHero.data.starships);
        const films = responseFilms.results.map(film => ({
            ...film,
            starships: film.starships.filter(starship => responseHero.data.starships.includes(starship)).map(starshipId => responseStarships.results.find(starship => starship.id === starshipId)),
        }))
        return {...responseHero.data, films: [...films]}
    } catch (e) {
        // console.log(e);
        return {}
    }
};
``