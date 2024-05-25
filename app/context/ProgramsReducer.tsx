"use client";

import React from "react";
import { State, Action } from "./types";

export const initialState = {
  user: null,
  favorites: [],
  watchLater: [],
};


export const programsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites.filter((title) => title !== action.payload)
          : [...state.favorites, action.payload],
      };
    case "TOGGLE_WATCH_LATER":
      return {
        ...state,
        watchLater: state.watchLater.includes(action.payload)
          ? state.watchLater.filter((title) => title !== action.payload)
          : [...state.watchLater, action.payload],
      };
      case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
