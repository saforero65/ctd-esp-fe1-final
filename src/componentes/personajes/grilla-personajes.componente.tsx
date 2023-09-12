import { FC, useEffect } from "react";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { fetchCharactersThunk } from "../../actions/characters.actions";
import { IRootState } from "../../store/store";
import "./grilla-personajes.css";
import CharacterCard from "./tarjeta-personaje.componente";

const GrillaPersonajes: FC = () => {
  const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
  const { status, characters } = useSelector((state) => state.characters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharactersThunk(""));
  }, [dispatch]);

  if (status === "LOADING") return <div>Cargando...</div>;
  if (status === "FAILED") return <div>No se encontraron los personajes.</div>;
  if (characters?.length === 0) return <></>;

  return (
    <div className="grilla-personajes ">
      {characters.map((character) => {
        return (
          <div key={character.id}>
            <CharacterCard character={character} />
          </div>
        );
      })}
    </div>
  );
};

export default GrillaPersonajes;
