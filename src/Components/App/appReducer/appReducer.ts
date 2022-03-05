import React from "react";

import { LatestTotals } from "../../../utils/types";

export type Action =
  | { type: "DEFAULT_STATE" }
  | { type: "INPUT"; value: string }
  | { type: "ERROR"; value: string }
  | { type: "LOADING"; value: boolean }
  | { type: "SHOW_SUGGESTIONS"; value: boolean }
  | { type: "SHOW_WORD_COUNT"; value: boolean }
  | { type: "SUGGEST_COUNTRIES"; value: string[] }
  | { type: "TOTALS"; value: LatestTotals[] };

export interface InitialState {
  input: string;
  error: string;
  loading: boolean;
  showSuggestions: boolean;
  showWordCount: boolean;
  suggestedCountries: string[];
  latestData: LatestTotals[];
}

export const defaultState: InitialState = {
  input: "",
  error: "",
  loading: false,
  showSuggestions: false,
  showWordCount: false,
  suggestedCountries: [],
  latestData: [],
};

export const appReducer: React.Reducer<InitialState, Action> = (
  state: InitialState,
  action: Action
): InitialState => {
  switch (action.type) {
    case "INPUT":
      return { ...state, input: action.value };
    case "ERROR":
      return { ...state, error: action.value };
    case "LOADING":
      return { ...state, loading: action.value };
    case "SHOW_SUGGESTIONS":
      return { ...state, showSuggestions: action.value };
    case "SHOW_WORD_COUNT":
      return { ...state, showWordCount: action.value };
    case "SUGGEST_COUNTRIES":
      return { ...state, suggestedCountries: action.value };
    case "TOTALS":
      return { ...state, latestData: action.value };
    case "DEFAULT_STATE":
      return defaultState;
    default:
      return defaultState;
  }
};
