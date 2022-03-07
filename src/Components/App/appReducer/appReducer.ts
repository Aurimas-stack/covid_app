import React from "react";

import { CountryList } from "../../../utils/list_of_country_names";
import { LatestTotals, SixMonthsCountryData } from "../../../utils/types";

export type Action =
  | { type: "DEFAULT_STATE" }
  | { type: "INPUT"; value: string }
  | { type: "ERROR"; value: string }
  | { type: "LOADING"; value: boolean }
  | { type: "LOADING_COUNTRY_DATA"; value: boolean }
  | { type: "SHOW_SUGGESTIONS"; value: boolean }
  | { type: "SHOW_WORD_COUNT"; value: boolean }
  | { type: "SUGGEST_COUNTRIES"; value: CountryList[] }
  | { type: "COUNTRY_REPORT"; value: SixMonthsCountryData[] }
  | { type: "TOTALS"; value: LatestTotals[] };

export interface InitialState {
  input: string;
  error: string;
  loading: boolean;
  loadingCountryData: boolean;
  showSuggestions: boolean;
  showWordCount: boolean;
  suggestedCountries: CountryList[];
  countryReport: SixMonthsCountryData[];
  latestData: LatestTotals[];
}

export const defaultState: InitialState = {
  input: "",
  error: "",
  loading: false,
  loadingCountryData: false,
  showSuggestions: false,
  showWordCount: false,
  suggestedCountries: [],
  countryReport: [],
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
    case "LOADING_COUNTRY_DATA":
      return { ...state, loadingCountryData: action.value };
    case "SHOW_SUGGESTIONS":
      return { ...state, showSuggestions: action.value };
    case "SHOW_WORD_COUNT":
      return { ...state, showWordCount: action.value };
    case "SUGGEST_COUNTRIES":
      return { ...state, suggestedCountries: action.value };
    case "COUNTRY_REPORT":
      return { ...state, countryReport: action.value };
    case "TOTALS":
      return { ...state, latestData: action.value };
    case "DEFAULT_STATE":
      return defaultState;
    default:
      return defaultState;
  }
};
