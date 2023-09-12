import { FC, useEffect, useState } from "react";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { useLocation } from "react-router-dom";
import { getEpisodesThunk } from "../actions/episodes.actions";
import FavoriteButton from "../componentes/botones/boton-favorito.componente";
import CardEpisode from "../componentes/episodios/tarjeta-episodio.componente";
import Character from "../interfaces/character.types";
import Episode from "../interfaces/episode.types";
import { IRootState } from "../store/store";
import "./Detalle.css";
/**
 * Esta es la pagina de detalle. Aqui se puede mostrar la vista sobre el personaje seleccionado junto con la lista de episodios en los que aparece
 * 
 * EL TRABAJO SOBRE ESTE ARCHIVO ES OPCIONAL Y NO ES REQUISITO DE APROBACION
 * 
 * 
 * 
 * Uso: 
 * ``` <PaginaDetalle /> ```
 * 
 * @returns la pagina de detalle
 */
const PaginaDetalle: FC = () => {
  const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
  const { episodes, status } = useSelector((state) => state.episodes);
  const dispatch = useDispatch();

  const location = useLocation();
  const state: any = location.state;
  const character: Character = { ...state.character };

  const [arrayEpisodeID, setArrayEpisodeID] = useState<(string | undefined)[]>(
    []
  );

  useEffect(() => {
   
    const array: (string | undefined)[] = character.episode.map((episode) => {
      return episode.split("/").at(-1);
    });
    setArrayEpisodeID(array);
  }, [character.episode]);

  useEffect(() => {
    dispatch(getEpisodesThunk(arrayEpisodeID));
  }, [arrayEpisodeID]);

  return (
    <div className="container">
      <h3>{character.name}</h3>
      <div className={"detail"}>
        <div className={"detail-header"}>
          <img src={character.image} alt={character.name} />
          <div className={"detail-header-text"}>
            <p>{character.name}</p>
            <p>Planeta: {character.origin.name}</p>
            <p>Genero: {character.gender}</p>
          </div>
          <FavoriteButton character={character} />
        </div>
      </div>
      <h4>Lista de episodios donde apareció el character</h4>
      <div className={"episodes-grid"}>
        {status === "LOADING" ? (
          <div>Cargando characters...</div>
        ) : status === "FAILED" ? (
          <div>No se pudo cargar los characters.</div>
        ) : !episodes ? (
          <></>
        ) : Array.isArray(episodes) ? (
          episodes.map((episode: Episode) => {
            return (
              <div key={`episode_${episode.id}_${character.name}`}>
                <CardEpisode episode={episode} />
              </div>
            );
          })
        ) : (
          <CardEpisode episode={episodes} />
        )}
      </div>
    </div>
  );
};

export default PaginaDetalle;
