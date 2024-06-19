import {
    render,
    screen,
    fireEvent,
    waitFor
} from '@testing-library/react';
import HeroList from '@/components/HeroList';
import {fetchHeroes} from '@/services/heroes';
import '@testing-library/jest-dom/extend-expect';
import {IHero, IHeroesArr} from '@/models/IHeroes';

// Mocking the fetchHeroes function
jest.mock('@/services/heroes.ts');
const mockFetchHeroes = fetchHeroes as jest.MockedFunction<typeof fetchHeroes>;

const mockHeroes: IHero[] = [
    {
        id: 10,
        name: "Obi-Wan Kenobi",
        films: [
            1,
            2,
            3,
            4,
            5,
            6
        ],
        starships: [
            48,
            59,
            64,
            65,
            74
        ]
    },
    {
        id: 12,
        name: "Wilhuff Tarkin",
        films: [
            1,
            6
        ],
        starships: []
    },


    // Add more mock heroes as needed
];

const mockHeroesResponse: IHeroesArr = {
    results: mockHeroes,
    count: 82,
    next: null,
    previous: "https://sw-api.starnavi.io/people/?page=8",
};

describe('HeroList Component', () => {
    beforeEach(() => {
        mockFetchHeroes.mockResolvedValue(mockHeroesResponse);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders a list of heroes', async () => {
        render(<HeroList/>);

        // Wait for the heroes to be loaded
        await waitFor(() => expect(mockFetchHeroes).toHaveBeenCalled());

        // Check if the heroes are displayed
        mockHeroes.forEach(hero => {
            expect(screen.getByText(hero.name)).toBeInTheDocument();
        });
    });

    it('loads more heroes when the button is clicked', async () => {
        mockFetchHeroes.mockResolvedValueOnce({
            results: mockHeroes,
            next: 'https://sw-api.starnavi.io/people/?page=2',
            previous: null,
            count: 82
        }).mockResolvedValueOnce({
            results: [
                {
                    id: 13,
                    name: "Chewbacca",
                    films: [
                        1,
                        2,
                        3,
                        6
                    ],
                    starships: [
                        10,
                        22
                    ],
                },
                {
                    id: 14,
                    name: "Han Solo",
                    films: [
                        1,
                        2,
                        3
                    ],
                    starships: [
                        10,
                        22
                    ],
                },
            ],
            next: null,
            previous: 'https://sw-api.starnavi.io/people/?page=1',
            count: 82
        });

        render(<HeroList/>);

        // Wait for the first batch of heroes to be loaded
        await waitFor(() => expect(mockFetchHeroes).toHaveBeenCalledTimes(1));

        // Click the "Load More" button
        fireEvent.click(screen.getByText('More'));

        // Wait for the second batch of heroes to be loaded
        await waitFor(() => expect(mockFetchHeroes).toHaveBeenCalledTimes(2));

        // Check if the new heroes are displayed
        expect(screen.getByText('Chewbacca')).toBeInTheDocument();
        expect(screen.getByText('Han Solo')).toBeInTheDocument();
    });

    it('shows a loading indicator while loading heroes', async () => {
        render(<HeroList/>);

        // Check if the loading indicator is displayed
        expect(screen.getByTestId('loader')).toBeInTheDocument();

        // Wait for the heroes to be loaded
        await waitFor(() => expect(mockFetchHeroes).toHaveBeenCalled());

        // Check if the loading indicator is removed
        expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
    });
});
