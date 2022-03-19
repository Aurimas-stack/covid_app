//<CountryReportTotal report={state.countryReport} />
import { FC } from "react";
import CountryReportTotal from "../CountryReportTotal/CountryReportTotal";
import { Action } from "../App/appReducer/appReducer";
import { SixMonthsCountryData } from "../../utils/types";

import "./CountryReport.css";

interface ReportProps {
  report: SixMonthsCountryData[];
  graph: boolean;
  graphType: string;
  dispatch: React.Dispatch<Action>;
}

const CountryReport: FC<ReportProps> = ({
  report,
  graph,
  dispatch,
  graphType,
}) => {
  return (
    <>
      {graph ? (
        <CountryReportTotal
          report={report}
          graphType={graphType}
          dispatch={dispatch}
        />
      ) : (
        <div className="report_container">
          <h3>Data latest date: {report[0].date}</h3>
          <h3>New cases: {report[0].new_cases}</h3>
          <h3>New deaths: {report[0].new_deaths}</h3>
          <button className="btn"
            onClick={() => {
              dispatch({ type: "SHOW_GRAPH", value: true });
              dispatch({ type: "GRAPH_TYPE", value: "total_cases" });
            }}
          >
            Total cases
          </button>
          <button className="btn"
            onClick={() => {
              dispatch({ type: "SHOW_GRAPH", value: true });
              dispatch({ type: "GRAPH_TYPE", value: "total_deaths" });
            }}
          >
            Total Deaths
          </button>
        </div>
      )}
    </>
  );
};

export default CountryReport;
