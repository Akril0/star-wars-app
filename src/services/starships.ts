import $api from "@/http";
import {IHeroesArr} from "@/models/IHeroes";
import {IFilmsArr} from "@/models/IFilms";
import {IStarshipsArr} from "@/models/IStarships";

export const fetchStarshipsById = async (idArr: number[]) => {
    const idString = idArr.join(',')
    const response = await $api.get<IStarshipsArr>(`/starships/?id__in=${idString}`);
    return response.data;
};