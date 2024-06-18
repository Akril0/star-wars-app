import {fetchHeroDetails} from '@/services/heroes';
import {fetchFilmsArrayById} from "@/services/films";
import {fetchStarshipsById} from "@/services/starships";
import {createEdges, createNodes} from "@/services/nodes";
import HeroFlow from "@/components/HeroFlow";
import Redirect from "@/components/Redirect";

interface PageProps {
    params: {
        id: string;
    };
}


const Character = async ({params}: PageProps) => {
    try {

        const {id} = params;
        const responseHero = await fetchHeroDetails(id);
        const responseFilms = await fetchFilmsArrayById(responseHero.films);
        const responseStarships = await fetchStarshipsById(responseHero.starships);
        const nodes = createNodes(responseHero, responseFilms, responseStarships)
        const edges = createEdges(responseHero, responseFilms)
        return (
            <div className='w-screen h-screen bg-amber-50'>
                <HeroFlow nodes={nodes} edges={edges}/>
            </div>
        );
    } catch (e) {
        return (
            <Redirect/>
        )
    }
};

export default Character;
