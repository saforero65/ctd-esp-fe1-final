import { Reducer } from "@reduxjs/toolkit";
import { CharacterActions } from "../actions/characters.actions";
import Character from "../interfaces/character.types";
import Pagination from "../interfaces/pagination.types";

interface CharactersState {
  status: "IDLE" | "LOADING" | "COMPLETED" | "FAILED";
  characters: Character[];
  query: string;
  pagination: Pagination;
  error: string | number | null;
}

const initialState: CharactersState = {
  status: "IDLE",
  characters: [],
  query: "",
  pagination: { count: 0, pages: 0, next: "", prev: "" },
  error: null,
};


const charactersReducer: Reducer<CharactersState, CharacterActions> = (
  state = initialState,
  action
): CharactersState => {
  switch (action.type) {
    case "GET_CHARACTERS":
      return {
        ...state,
        status: "LOADING",
        characters: [],
        query: action.query,
        error: null,
      };
    case "GET_CHARACTERS_SUCCESS":
      return {
        ...state,
        status: "COMPLETED",
        characters: action.characters,
        pagination: action.pagination,
      };
    case "GET_CHARACTERS_ERROR":
      return {
        ...state,
        status: "FAILED",
        characters: [],
        error: action.error,
      };
    default:
      return { ...state };
  }
};

export default charactersReducer;
