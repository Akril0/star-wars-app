import {Edge, Node} from "reactflow";
import {IHero} from "@/models/IHeroes";
import {IFilmsArr} from "@/models/IFilms";
import {IStarshipsArr} from "@/models/IStarships";

export const createNodes = (responseHero: IHero,
                                  responseFilms: IFilmsArr,
                                  responseStarships: IStarshipsArr) => {

    const nodes: Node[] = [
        {
            id: responseHero.id.toString(),
            data: {label: responseHero.name},
            position: {x: 0, y: 0},
            type: 'input'
        }
    ]
    const startFilmCoords = 0 - (responseFilms.count * 100)

    responseFilms.results.forEach((film, index) => {
        nodes.push({
            id: film.id.toString(),
            data: {label: film.title},
            position: {x: startFilmCoords + (200 * index), y: 100}
        })
    })

    const startStarshipCoords = 0 - (responseStarships.count * 100)

    responseStarships.results.forEach((starship, index) => {
        nodes.push({
            id: starship.id.toString(),
            data: {label: starship.name},
            position: {
                x: startStarshipCoords + (200 * index),
                y: 200
            }
        })
    })

    return nodes
}

export const createEdges = (responseHero: IHero,
                                  responseFilms: IFilmsArr) => {
    const edges: Edge[] = []

    responseHero.films.forEach(film => {
        edges.push({
            id: `${responseHero.id}-${film}`,
            source: responseHero.id.toString(),
            target: film.toString()
        })
    })
    responseFilms.results.forEach(film => {
        film.starships.forEach(starshipId => {
            if (responseHero.starships.find((starship) => starship === starshipId)) {
                edges.push({
                    id: `${film.id}-${starshipId}`,
                    source: film.id.toString(),
                    target: starshipId.toString(),
                })
            }
        })
    })

    return edges;
}