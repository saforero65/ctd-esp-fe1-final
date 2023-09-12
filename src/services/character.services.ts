import Character from "../interfaces/character.types";
import Episode from "../interfaces/episode.types";
import Pagination from "../interfaces/pagination.types";

export const getCharactersAPI = async (
  name?: string
): Promise<[Character[], Pagination, number] | [any, any, number]> => {
  let nameParam = "";
  if (name !== "" && name !== undefined) {
    nameParam = `name=${name}`;
  }
  return fetch(`https://rickandmortyapi.com/api/character?${nameParam}`).then(
    function (response) {
      return response
        .json()
        .then((data) => [data.results, data.info, response.status]);
    }
  );
};


export const changePage = async (
  url: string
): Promise<[Character[], Pagination]> => {
  return fetch(url)
    .then((data) => data.json())
    .then((data) => [data.results, data.info]);
};

export const fetchEpisodes = async (
  arrayEpisodeID: (string | undefined)[]
): Promise<Episode | Episode[]> => {
  return (
    await fetch(`https://rickandmortyapi.com/api/episode/${arrayEpisodeID}`)
  ).json();
};
