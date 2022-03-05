import { useReducer, useEffect } from "react";

import { appReducer, defaultState } from "./appReducer/appReducer";
import { countryListArray } from "../../utils/list_of_country_names";
import { getError } from "../../utils/error";
import { validateInput } from "../../utils/inputValidation";
import { fetchTotal } from "../../utils/fetchTotal";

import LatestData from "../LatestData/LatestData";
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
        dispatch({ type: "TOTALS", value: [data.data]});
      } catch (error: any) {
        dispatch({ type: "ERROR", value: getError(error) });
      }
    };
    fetchTotals();

    dispatch({ type: "LOADING", value: false });

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
        return country.toLowerCase().includes(state.input.toLowerCase());
      }),
    });
  };


  return (
    <div
      className="covid"
      onClick={() => dispatch({ type: "SHOW_SUGGESTIONS", value: false })}
    >
      {!state.loading ?(
        <>
          <LatestData data={state.latestData}/>
          <Input
            state={state}
            dispatch={dispatch}
            onSuggestedCountries={handleSuggestedCountries}
          />
        </>
      ) : <Loader />}
    </div>
  );
}

export default App;
