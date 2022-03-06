import { FC } from "react";

import * as d3 from "d3";
import { scaleBand, scaleLinear } from "d3";

import { LatestCountryData } from "../../utils/types";

import AxisBottom from "./Axis/AxisBottom";
import AxisLeft from "./Axis/AxisLeft";
import Bars from "./Bars/Bars";

import "./CountryReport.css";

interface ReportProps {
  report: LatestCountryData[];
}

const CountryReport: FC<ReportProps> = ({ report }): JSX.Element | null => {
  const data: { label: string; value: number }[] = [
    { label: "New cases", value: report[0].active_diff },
    { label: "New Deaths", value: report[0].deaths_diff },
  ];
  const margin = { top: 10, right: 0, bottom: 20, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.3);

  const scaleY = scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0])
    .nice();

  const svg = d3.select("svg");
  const chart = svg.append("g");
  const bar = svg.append("rect");
  bar
    .on('mouseenter', function (actual, i) {
        d3.select(this).attr('opacity', 0.5)
    })
    .on('mouseleave', function (actual, i) {
        d3.select(this).attr('opacity', 1)
    })

  if (report.length === 0 || !report) return null;

  return (
    <svg
      className="d3-component"
      width={width + margin.left + margin.right}
      height={height + margin.top + margin.bottom}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleY} />
        <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
      </g>
    </svg>
  );
};
export default CountryReport;
