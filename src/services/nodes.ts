import {fetchFilmsArrayById} from "@/services/films";
import {fetchStarshipsById} from "@/services/starships";
import {fetchHeroDetails} from "@/services/heroes";

export const createNodes = async (id: string) => {
    const responseHero = await fetchHeroDetails(id);
    const responseFilms = await fetchFilmsArrayById(responseHero.films);
    const responseStarships = await fetchStarshipsById(responseHero.starships);

}