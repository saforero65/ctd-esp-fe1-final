import { FC } from "react";
import { useDispatch } from "react-redux";
import { fetchCharactersThunk } from "../actions/characters.actions";
import Pagination from "../componentes/paginacion/pagination.component";
import Filters from "../componentes/personajes/filtros.componente";
import GridCharacters from "../componentes/personajes/grilla-personajes.componente";


const PaginaInicio: FC = () => {
  const dispatch = useDispatch();

 
  const deleteFiltersOnClick = () => {
    dispatch(fetchCharactersThunk(""));
  };

  return (
    <div className="container">
      <div className="actions">
        <h3>Catálogo de Personajes</h3>
        <button className="danger" onClick={deleteFiltersOnClick}>
          Limpiar filtros
        </button>
      </div>
      <Filters />
      <Pagination />
      <GridCharacters />
      <Pagination />
    </div>
  );
};

export default PaginaInicio;
