'use client'

import {useCallback, useEffect, useState} from "react";
import {fetchHeroes} from "@/services/heroes";
import Link from "next/link";
import {IHero, IHeroesArr} from "@/models/IHeroes";
import Loader from "@/components/Loader";
import MoreButton from "@/components/MoreButton";
import {number} from "prop-types";


const HeroList: React.FC = () => {
    const [heroes, setHeroes] = useState<IHero[]>([]);
    const [page, setPage] = useState<number | null>(1);
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        (async () => {
            if (page) {
                setLoading(true);
                const newHeroes = await fetchHeroes(page);
                console.log(newHeroes)
                setHeroes(prev => [...prev, ...newHeroes.results]);
                setLoading(false);
                if (!newHeroes.next) setPage(null);
            }
        })()
    }, [page]);


    const handleButton = () => {
        setPage(prev => Number(prev) + 1);
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
            {(!loading && heroes.length !== 0 && page) &&
                <MoreButton handleButton={handleButton}/>
            }
            {loading && <Loader/>}
        </div>
    );
};

export default HeroList