export interface IFilm {
    id: number;
    title: string;
    episode_id: number;
    director: string;
    producer: string;
    release_date: string;
    starships: number[];
}
export interface IFilmsArr {
    count: number;
    next: string | null;
    previous: string | null;
    results: IFilm[];
}
