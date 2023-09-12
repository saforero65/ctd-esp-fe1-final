import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Character from '../../interfaces/character.types';
import BotonFavorito from '../botones/boton-favorito.componente';
import './tarjeta-personaje.css';

/**
 * Tarjeta para cada personaje dentro de la grilla de personajes. 
 * 
 * Deberás agregar las propiedades necesarias para mostrar los datos de los personajes
 * 
 * 
 * @returns un JSX element 
 */
const TarjetaPersonaje:FC<{ character: Character }> = ({ character }) => {
  let navigate = useNavigate();

  const redirectToDetailPage = () => {
    navigate(`/detalle/${character.id}`, { state: { character: character } });
  };

  return (
    <div className="tarjeta-personaje">
      <img
        src={character.image}
        onClick={redirectToDetailPage}
        alt={character.name}
      />
      <div className="tarjeta-personaje-body">
        <span>{character.name}</span>
        <BotonFavorito character={character} />
      </div>
    </div>
  );
};

export default TarjetaPersonaje;
