'use client'

import {useCallback, useEffect, useState} from "react";
import {fetchHeroes} from "@/services/heroes";
import Link from "next/link";


const HeroList: React.FC = () => {
    const [heroes, setHeroes] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        (async () => {
            setLoading(true);
            const newHeroes = await fetchHeroes(page);
            console.log(newHeroes);
            setHeroes(prev => [...prev, ...newHeroes.results]);
            setLoading(false);
        })()
    }, [page]);


    const handleButton = () => {
        setPage(prev => prev + 1);
    }
    return (
        <div className="p-4">
            <div className="p-4 grid gap-4 md:grid-cols-5 grid-cols-2">
                {heroes.map(hero => (
                    <Link href={`/${hero.id}`} key={hero.id}
                        className="
                            h-28
                            cursor-pointer
                            bg-blue-600
                            rounded
                            p-2
                            hover:bg-blue-700
                            transition">
                        {hero.name}
                    </Link>
                ))}
            </div>
            {!loading && <button className="mx-auto block"
                                 onClick={handleButton}>
                Ещё
            </button>}
            {loading && <div className="loader">

            </div>}
        </div>
    );
};

export default HeroList