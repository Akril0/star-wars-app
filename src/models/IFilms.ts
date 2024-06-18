export interface IFilm {
    id: number;
    title: string;
    episode_id: number;
    starships: number[];
}
export interface IFilmsArr {
    count: number;
    next: string | null;
    previous: string | null;
    results: IFilm[];
}
