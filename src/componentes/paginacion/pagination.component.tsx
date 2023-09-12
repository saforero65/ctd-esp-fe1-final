import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { changePageThunk } from "../../actions/characters.actions";
import { IRootState } from "../../store/store";
import "./paginacion.css";

/**
 * Componente que contiene los botones para paginar
 * 
 * Deberás agregar las propiedades necesarias para que funcione correctamente
 * 
 * 
 * @returns un JSX element 
 */
const Paginacion = () => {
  const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
  const dispatch = useDispatch();

  const pagination = useSelector((state) => state.characters.pagination);
  const { count, next, pages, prev } = pagination;

  const previusPage = () => {
    dispatch(changePageThunk(prev));
  };

  const nextPage = () => {
    dispatch(changePageThunk(next));
  };

  return (
    <div className="paginacion">
      <button
        onClick={previusPage}
        disabled={prev === null ? true : false}
        className={"primary"}
      >
        Anterior
      </button>
      <button
        onClick={nextPage}
        disabled={next === null ? true : false}
        className={"primary"}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginacion;
