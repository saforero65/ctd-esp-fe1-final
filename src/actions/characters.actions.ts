import { Action, ActionCreator, ThunkAction } from "@reduxjs/toolkit";
import Character from "../interfaces/character.types";
import Pagination from "../interfaces/pagination.types";
import { changePage, getCharactersAPI } from "../services/character.services";
import { IRootState } from "../store/store";

interface getCharactersAccion extends Action {
  type: "GET_CHARACTERS";
  query: string;
}

interface getCharactersSuccessAccion extends Action {
  type: "GET_CHARACTERS_SUCCESS";
  characters: Character[];
  pagination: Pagination;
}

interface getCharactersErrorAccion extends Action {
  type: "GET_CHARACTERS_ERROR";
  error: string | number;
}

const getCharacters: ActionCreator<getCharactersAccion> = (query: string) => {
  return {
    type: "GET_CHARACTERS",
    query: query,
  };
};

const getCharactersSuccess: ActionCreator<getCharactersSuccessAccion> = (
  characters: Character[],
  pagination: Pagination
) => {
  return {
    type: "GET_CHARACTERS_SUCCESS",
    characters: characters,
    pagination: pagination,
  };
};

const getCharactersError: ActionCreator<getCharactersErrorAccion> = (
  msg: string | number
) => {
  return {
    type: "GET_CHARACTERS_ERROR",
    error: msg,
  };
};

export type CharacterActions =
  | ReturnType<typeof getCharacters>
  | ReturnType<typeof getCharactersSuccess>
  | ReturnType<typeof getCharactersError>;

interface FetchCharactersThunkAction
  extends ThunkAction<void, IRootState, unknown, CharacterActions> {}

export const fetchCharactersThunk = (
  query: string
): FetchCharactersThunkAction => {
  return async (dispatch, getState) => {
    dispatch(getCharacters(query));
    try {
      const response = await getCharactersAPI(query);
      const [characters, info, status] = response;
      if (status === 200) {
        dispatch(getCharactersSuccess(characters, info));
      } else {
        dispatch(getCharactersError(status));
      }
    } catch (e) {
      dispatch(getCharactersError(e));
    }
  };
};

export const changePageThunk = (url: string): FetchCharactersThunkAction => {
  return async (dispatch) => {
    try {
      const [characters, info] = await changePage(url);
      dispatch(getCharactersSuccess(characters, info));
    } catch (e) {
      dispatch(getCharactersError(e));
    }
  };
};
