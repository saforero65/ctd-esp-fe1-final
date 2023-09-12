import { ChangeEvent, FC } from "react";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { fetchCharactersThunk } from "../../actions/characters.actions";
import { IRootState } from "../../store/store";
import "./filtros.css";

const Filtros: FC = () => {
  const useSelector: TypedUseSelectorHook<IRootState> = useReduxSelector;
  const query = useSelector((state) => state.characters.query);
  const dispatch = useDispatch();

  const onChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let query = e.target.value;
    dispatch(fetchCharactersThunk(query));
  };

  return (
    <div className="filtros">
      <label htmlFor="filter">Filtrar por nombre:</label>
      <input
        type="text"
        placeholder="Rick, Morty, Beth, Alien, ...etc"
        onChange={onChange}
        value={query}
        name="filter"
        autoFocus={true}
      />
    </div>
  );
};

export default Filtros;
