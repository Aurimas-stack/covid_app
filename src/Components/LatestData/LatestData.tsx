import { FC } from "react";

import { LatestTotals } from "../../utils/types";

import "./LatestData.css";

interface LatestDataProps {
  data: LatestTotals[];
}

const LatestData: FC<LatestDataProps> = ({ data }) => {
  const cases = data[0].TotalCases !== undefined ? data[0].TotalCases : "api error";
  const caseDate =  data[0].TotalDeaths !== undefined ? data[0].TotalDeaths : "api error"

  return (
    <div className="latest_data_cont">
      <h1>Total cases: {cases}.</h1>
      <h3>Total Deaths: {caseDate}.</h3>
    </div>
  );
};

export default LatestData;
