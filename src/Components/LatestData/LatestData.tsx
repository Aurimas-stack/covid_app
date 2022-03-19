import { FC } from "react";

import { LatestTotals } from "../../utils/types";

import "./LatestData.css";

interface LatestDataProps {
  data: LatestTotals[];
}

const LatestData: FC<LatestDataProps> = ({ data }) => {
  const cases = data[0].TotalCases !== undefined ? data[0].TotalCases : "api error";
  const caseDate =  data[0].TotalDeaths !== undefined ? data[0].TotalDeaths : "api error";
  const recovered = data[0].TotalRecovered !== undefined ? data[0].TotalRecovered : "api error";

  return (
    <div className="latest_data_cont">
      <h1>Total cases: {cases}</h1>
      <h3>Total recovered: {recovered}</h3>
      <h3>Total deaths: {caseDate}</h3>
    </div>
  );
};

export default LatestData;
