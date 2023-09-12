import { FC } from "react";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { toggleFavorite } from "../../actions/favorites.actions";
import Character from "../../interfaces/character.types";
import { IRootState } from "../../store/store";
import "./boton-favorito.css";
/**
 * Boton que indica si un elemento es favorito o no, y da la posibilidad de marcarlo/desmarcarlo
 * 
 * Deberás tipar las propiedades si usas este componente
 * 
 * 
 * @returns un JSX element 
 */
const BotonFavorito: FC<{ character: Character }> = ({ character }) => {
  const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
  const favoriteMap = useSelector((state) => state.favorites.favoritesMapa);
  const dispatch = useDispatch();

  const src = require(favoriteMap.has(character.id)
    ? "../../assets/star-filled.png"
    : "../../assets/star.png");


  const toggleFavorites = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(toggleFavorite(character));
  };

  return (
    <button className="boton-favorito" onClick={toggleFavorites} type="button">
      <img src={src} alt={"favorite"} />
    </button>
  );
};

export default BotonFavorito;
