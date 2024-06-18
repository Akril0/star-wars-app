'use client'

import {useCallback, useEffect, useState} from "react";
import {fetchHeroes} from "@/services/heroes";
import Link from "next/link";
import {IHero, IHeroesArr} from "@/models/IHeroes";


const HeroList: React.FC = () => {
    const [heroes, setHeroes] = useState<IHero[]>([]);
    const [page, setPage] = useState(1);
    const [moreButton, setMoreButton] = useState(true)
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        (async () => {
            setLoading(true);
            const newHeroes = await fetchHeroes(page);
            setHeroes(prev => [...prev, ...newHeroes.results]);
            setLoading(false);
        })()
    }, [page]);


    const handleButton = () => {
        setPage(prev => prev + 1);
    }
    return (
        <div className="p-4">
            <div
                className="p-4 grid gap-4 md:grid-cols-5 grid-cols-2">
                {heroes.map(hero => (
                    <Link href={`/${hero.id}`} key={hero.id}
                          className="
                            text-center
                            cursor-pointer
                            bg-blue-600
                            rounded
                            p-2.5
                            hover:bg-blue-700
                            active:scale-90
                            transition">
                        {hero.name}
                    </Link>
                ))}
            </div>
            {(!loading && heroes.length !== 0 && moreButton) && <button
                className="
                    mt-5
                    w-1/6
                    mx-auto
                    block
                    bg-blue-600
                    p-2
                    rounded-2xl
                    hover:bg-blue-700
                    active:scale-90
                    transition
                    "
                onClick={handleButton}>
                More
            </button>}
            {loading && <div className="
                    flex
                    justify-center
                    gap-1
                    mt-5
                    w-1/6
                    mx-auto
                    bg-blue-600
                    p-2
                    rounded-2xl">
                <svg className='animate-spin'
                     width="20" height="20" viewBox="0 0 60 60"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M30 60C46.5685 60 60 46.5685 60 30C60 13.4315 46.5685 0 30 0C13.4315 0 0 13.4315 0 30C0 46.5685 13.4315 60 30 60ZM30 50C41.0457 50 50 41.0457 50 30C50 18.9543 41.0457 10 30 10C18.9543 10 10 18.9543 10 30C10 41.0457 18.9543 50 30 50Z"
                          fill="white" fillOpacity="0.3"/>
                    <path
                        d="M60 30C60 24.0666 58.2405 18.2664 54.9441 13.3329C51.6476 8.39942 46.9623 4.55424 41.4805 2.28361C35.9987 0.012985 29.9667 -0.581115 24.1473 0.576442C18.3279 1.734 12.9824 4.59122 8.7868 8.7868L15.8572 15.8572C18.6543 13.06 22.2182 11.1551 26.098 10.3833C29.9778 9.61157 33.9993 10.0077 37.6541 11.5215C41.3088 13.0353 44.4325 15.5989 46.6302 18.888C48.828 22.1772 50.001 26.0442 50.001 30H60Z"
                        fill="white"/>
                </svg>
                Loading...
            </div>}
        </div>
    );
};

export default HeroList