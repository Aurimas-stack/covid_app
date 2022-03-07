import { FC, useEffect, useRef } from "react";

import * as d3 from "d3";
import { scaleBand, scaleLinear, svg } from "d3";

import { SixMonthsCountryData } from "../../utils/types";

import AxisBottom from "./Axis/AxisBottom";
import AxisLeft from "./Axis/AxisLeft";
import Bars from "./Bars/Bars";

import "./CountryReport.css";

interface ReportProps {
  report: SixMonthsCountryData[];
}

const CountryReport: FC<ReportProps> = ({ report }): JSX.Element | null => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const data: { label: string; value: number }[] = [
        { label: "New cases", value: Number(report[0].total_cases) },
      ];
      const margin = { top: 50, right: 50, bottom: 50, left: 50 };
      const width = 800;
      const height = 600;
      const yMinValue = d3.min(report, (d) => d.total_cases);
      const yMaxValue = d3.max(report, (d) => d.total_cases);
      const xMinValue = d3.min(report, (d) => d.date);
      const xMaxValue = d3.max(report, (d) => d.date);

      svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      const tooltip = svg.append("div").attr("class", "tooltip");

      const xScale = d3.scaleLinear().range([0, width]);
      const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, Math.max(...report.map(({ total_cases }) => total_cases))]);

      const line = d3.line().y( report => yScale())
      svg
        .append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0, ${height})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickSize(-height)
            .tickFormat(() => "")
        );
    }
  }, []);

  /*const width = 600 - margin.left - margin.right;
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
  const bar = svg.append("rect");*/

  if (report.length === 0 || !report) return null;

  return <svg className="d3-component" ref={svgRef}></svg>;
};
export default CountryReport;
