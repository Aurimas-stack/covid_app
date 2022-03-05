import { FC } from "react";

import { Action, InitialState } from "../App/appReducer/appReducer";

import Error from "../Error/Error";

import "./Input.css";

interface InputProps {
  state: InitialState;
  dispatch: React.Dispatch<Action>;
  onSuggestedCountries: () => void;
}

const Input: FC<InputProps> = ({ state, dispatch, onSuggestedCountries }) => {
  const suggestionList =
    state.suggestedCountries.length > 5
      ? state.suggestedCountries.slice(0, 5)
      : state.suggestedCountries;
  return (
    <form className="input_form">
      <div className="input_cont">
        <input
          type="text"
          value={state.input}
          placeholder="Enter country name..."
          maxLength={56}
          required
          onFocus={() => dispatch({ type: "SHOW_WORD_COUNT", value: true })}
          onBlur={() => dispatch({ type: "SHOW_WORD_COUNT", value: false })}
          onChange={(e) => {
            dispatch({ type: "INPUT", value: e.target.value });
            onSuggestedCountries();
          }}
        />
        {state.showSuggestions && (
          <ul className="suggestion_cont">
            {suggestionList.map((suggestion, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => {
                    dispatch({ type: "INPUT", value: suggestion });
                    dispatch({ type: "SHOW_SUGGESTIONS", value: false });
                  }}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        )}
        <Error error={state.error} />
      </div>
      {state.showWordCount && (
        <div className="word_count_container">
          <p
            style={
              state.input.length >= 46
                ? { color: "#F23030" }
                : { color: "#000" }
            }
          >
            {state.input.length} / 56
          </p>
        </div>
      )}
      <button type="submit">Search</button>
    </form>
  );
};

export default Input;
