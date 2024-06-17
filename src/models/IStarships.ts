interface IStarship {
    id: number;
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
}

export interface IStarshipsArr {
    count: number;
    next: string | null;
    previous: string | null;
    results: IStarship[];
}