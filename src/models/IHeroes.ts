export interface IHero {
    id: number;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: number;
    films: number[];
    starships: number[];
}


export interface IHeroesArr {
    count: number;
    next: string | null;
    previous: string | null;
    results: IHero[];
}