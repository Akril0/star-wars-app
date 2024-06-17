import {fetchHeroDetails} from '@/services/heroes';

interface PageProps {
    params: {
        id: string;
    };
}


const Character = async ({params}: PageProps) => {

    const {id} = params;
    console.log(params);
    const details = await fetchHeroDetails(id);
    console.log(details);
    return (
        <div className='w-screen h-screen'>

        </div>
    );
};

export default Character;
