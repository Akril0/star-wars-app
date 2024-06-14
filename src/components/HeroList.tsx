'use client'

import {useCallback, useEffect, useState} from "react";
import {fetchHeroes} from "@/services/api";


const HeroList: React.FC = () => {
    const [heroes, setHeroes] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadFunc = async () => {
            setLoading(true);
            const newHeroes = await fetchHeroes(page);
            console.log(newHeroes);
            setHeroes(prev => [...prev, ...newHeroes.results]);
            setLoading(false);
        }
        loadFunc();
    }, [page]);

    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
            return;
        }
        setPage(prev => prev + 1);
    }, [loading]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
    const handleButton = () => {
        setPage(prev => prev + 1);
    }
    return (
        <div className="p-4">
            <ul>
                {heroes.map(hero => (
                    <li key={hero.id}
                        className="cursor-pointer p-2 border-b">
                        {hero.name}
                    </li>
                ))}
            </ul>
            <button onClick={handleButton}>Ещё</button>
            {loading && <div className="loader"></div>}
        </div>
    );
};

export default HeroList