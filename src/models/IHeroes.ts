export interface IHero {
    id: number;
    name: string;
    films: number[];
    starships: number[];
}


export interface IHeroesArr {
    count: number;
    next: string | null;
    previous: string | null;
    results: IHero[];
}