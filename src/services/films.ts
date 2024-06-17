import $api from "@/http";
import {IFilm, IFilmsArr} from "@/models/IFilms";

export const fetchFilmDetails = async (id: number) => {
    const response = await $api.get<IFilm>(`/films/${id}`);
    return response.data;
};

export const fetchFilmsArrayById = async (idArr: number[]) => {
    const idString = idArr.join(',')
    const response = await $api.get<IFilmsArr>(`/films/?id__in=${idString}`);
    return response.data;
};