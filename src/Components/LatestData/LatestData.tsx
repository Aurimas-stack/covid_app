import { FC } from "react";

import { LatestTotals } from "../../utils/types";

import "./LatestData.css";

interface LatestDataProps {
  data: LatestTotals[];
}

const LatestData: FC<LatestDataProps> = ({ data }) => {
  if (data.length === 0) return null;

  return (
    <div className="latest_data_cont">
      <h1>Cases confirmed: {data[0].confirmed}.</h1>
      <h3>Date: {data[0].date}.</h3>
    </div>
  );
};

export default LatestData;
