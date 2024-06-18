interface IStarship {
    id: number;
    name: string;
    cost_in_credits: string;
}

export interface IStarshipsArr {
    count: number;
    next: string | null;
    previous: string | null;
    results: IStarship[];
}