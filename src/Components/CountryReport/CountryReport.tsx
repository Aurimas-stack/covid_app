import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";

import { SixMonthsCountryData } from "../../utils/types";

import "./CountryReport.css";

interface ReportProps {
  report: SixMonthsCountryData[];
}

const CountryReport: FC<ReportProps> = ({ report }): JSX.Element | null => {
  const svgRef = useRef(null);
  const margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  const dataSet = report.map((el) => ({
    x: new Date(el.date),
    y: el.total_cases,
  }));
  useEffect(() => {
    if (svgRef.current) {
      d3.select(svgRef.current).select("svg").remove();
      const yMaxValue = d3.max(dataSet, (d) => d.y);
      const xMinValue = d3.min(dataSet, (d) => d.x);
      const xMaxValue = d3.max(dataSet, (d) => d.x);
      console.log();
      const svg = d3
        .select(svgRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3
        .scaleLinear()
        .domain([xMinValue, xMaxValue] as [Date, Date])
        .range([0, width]);
      const yScale = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, yMaxValue] as number[])
        .nice();
      const line = d3
        .line() //@ts-ignore
        .x((d) => xScale(d.x)) //@ts-ignore
        .y((d) => yScale(d.y))
        .curve(d3.curveMonotoneX);
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
      svg
        .append("g")
        .attr("class", "grid")
        .call(
          d3
            .axisLeft(yScale)
            .tickSize(-width)
            .tickFormat(() => "")
        );
      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`) // @ts-ignore
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat("%Y %b")));

      svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

      svg
        .append("path")
        .datum(dataSet)
        .attr("fill", "none")
        .attr("stroke", "#F23030")
        .attr("stroke-width", 4)
        .attr("class", "line") //@ts-ignore
        .attr("d", line);
    }
  }, [
    dataSet,
    width,
    height,
    margin.right,
    margin.left,
    margin.top,
    margin.bottom,
  ]);

  if (report.length === 0 || !report) return null;

  return <div className="d3-component" ref={svgRef}></div>;
};
export default CountryReport;
