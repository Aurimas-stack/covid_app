import React, { useReducer, useEffect } from "react";

import { appReducer, defaultState } from "./appReducer/appReducer";
import {
  countryListArray,
  CountryList,
} from "../../utils/list_of_country_names";
import { getError } from "../../utils/error";
import { validateInput } from "../../utils/inputValidation";
import { fetchTotal, fetchCountryReport } from "../../utils/fetchTotal";

import LatestData from "../LatestData/LatestData";
import CountryReport from "../CountryReport/CountryReport";
import Input from "../Input/Input";
import Loader from "../Loader/Loader";

import "./App.css";

function App(): JSX.Element {
  const [state, dispatch] = useReducer(appReducer, defaultState);

  useEffect(() => {
    dispatch({ type: "LOADING", value: true });

    const fetchTotals = async () => {
      try {
        const response = await fetchTotal();
        const data = await response.json();
        dispatch({ type: "TOTALS", value: [data[0]] });
      } catch (error: any) {
        dispatch({ type: "ERROR", value: getError(error) });
      }
    };
    fetchTotals();
    dispatch({ type: "LOADING", value: false });
    return;

  }, []);

  const handleSuggestedCountries = () => {
    dispatch({ type: "SHOW_SUGGESTIONS", value: true });

    if (state.input.length === 0) return;

    if (state.input.length === 1) {
      dispatch({ type: "SUGGEST_COUNTRIES", value: [] });
      return;
    }

    dispatch({
      type: "SUGGEST_COUNTRIES",
      value: countryListArray.filter((country) => {
        return country.Country
          .toLocaleLowerCase()
          .includes(state.input.toLocaleLowerCase());
      }),
    });
  };

  const handleCovidCountry = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputValidation: { error: string; value: boolean } = validateInput(
      state.input
    );
    const country: CountryList[] = countryListArray.filter((country) => {
      return country.Country
        .toLocaleLowerCase()
        .includes(state.input.toLocaleLowerCase());
    });

    if (inputValidation.value === true) {
      dispatch({ type: "ERROR", value: inputValidation.error });
      return;
    }

    if (country.length > 1 || country.length === 0) {
      dispatch({ type: "ERROR", value: "Country not found." });
      return;
    }

    dispatch({ type: "LOADING_COUNTRY_DATA", value: true });

    try {
      const response: Response = await fetchCountryReport(country[0].ThreeLetterSymbol);
      const data = await response.json();
      dispatch({ type: "COUNTRY_REPORT", value: data });
    } catch (error: any) {
      dispatch({ type: "ERROR", value: getError(error) });
    }

    dispatch({ type: "LOADING_COUNTRY_DATA", value: false });
  };

  return (
    <div
      style={
        state.loading
          ? { backgroundColor: "#3D5473" }
          : { backgroundColor: "#F2F2F2" }
      }
      className="covid"
      onClick={() => dispatch({ type: "SHOW_SUGGESTIONS", value: false })}
    >
      {state.loading === false ? (
        <>
          {state.latestData.length > 0 && <LatestData data={state.latestData} />}
          <Input
            state={state}
            dispatch={dispatch}
            onSuggestedCountries={handleSuggestedCountries}
            handleCovidCountry={handleCovidCountry}
          />
          {state.loadingCountryData ? (
            <Loader />
          ) : (
            state.countryReport.length > 0 && (
              <CountryReport report={state.countryReport} />
            )
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default App;
