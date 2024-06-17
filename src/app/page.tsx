'use client'
import HeroList from "@/components/HeroList";


const Home: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-xl mb-4">Star Wars Heroes</h1>
            <HeroList/>
        </div>
    );
};

export default Home;