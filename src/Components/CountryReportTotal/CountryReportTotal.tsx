import { FC, useEffect, useRef } from "react";
import * as d3 from "d3";

import { Action } from "../App/appReducer/appReducer";
import { SixMonthsCountryData } from "../../utils/types";

import useWindowDimensions from "./windowDimension";

import "./CountryReport.css";

interface ReportProps {
  report: SixMonthsCountryData[];
  dispatch: React.Dispatch<Action>;
  graphType: string;
}

const CountryReportTotal: FC<ReportProps> = ({
  report,
  graphType,
  dispatch,
}): JSX.Element | null => {
  const { width } = useWindowDimensions();
  const svgRef = useRef(null);
  let dateFormat: string = "%Y %b";
  const margin: {top: number, right:number, bottom: number, left: number} = 
  { top: 50, 
    right: 50, 
    bottom: 50, 
    left: 80 };
  let svgWidth:number = 900 - margin.left - margin.right,
    svgHeight:number = 500 - margin.top - margin.bottom;
  const dataSet: {x: Date, y: number}[] = report.map((el) => ({
    x: new Date(el.date),
    y: graphType === "total_cases" ? el.total_cases : el.total_deaths,
  }));

  if (width < 900) {
    svgWidth = 700 - margin.left - margin.right;
    svgHeight = 400 - margin.top - margin.bottom;
  }

  if (width < 705) {
    svgWidth = 500 - margin.left - margin.right;
    svgHeight = 400 - margin.top - margin.bottom;
    dateFormat = "%b";
  }

  useEffect(() => {
    if (svgRef.current) {
      d3.select(svgRef.current).select("svg").remove();
      const yMaxValue = d3.max(dataSet, (d) => d.y);
      const xMinValue = d3.min(dataSet, (d) => d.x);
      const xMaxValue = d3.max(dataSet, (d) => d.x);
      const svg = d3
        .select(svgRef.current)
        .append("svg")
        .attr("width", svgWidth + margin.left + margin.right)
        .attr("height", svgHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      const xScale = d3
        .scaleLinear()
        .domain([xMinValue, xMaxValue] as [Date, Date])
        .range([0, svgWidth]);
      const yScale = d3
        .scaleLinear()
        .range([svgHeight, 0])
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
        .attr("transform", `translate(0, ${svgHeight})`)
        .call(
          d3
            .axisBottom(xScale)
            .tickSize(-svgHeight)
            .tickFormat(() => "")
        );
      svg
        .append("g")
        .attr("class", "grid")
        .call(
          d3
            .axisLeft(yScale)
            .tickSize(-svgWidth)
            .tickFormat(() => "")
        );
      svg
        .append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${svgHeight})`) // @ts-ignore
        .call(d3.axisBottom().scale(xScale).tickFormat(d3.timeFormat(`${dateFormat}`)));

      svg.append("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

      svg
        .append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("y", -35)
        .attr("x", 38)
        .attr("dy", ".75em")
        .text(`${graphType}`);

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
    svgWidth,
    dateFormat,
    svgHeight,
    margin.right,
    margin.left,
    margin.top,
    margin.bottom,
    graphType,
  ]);

  if (report.length === 0 || !report) return null;

  return (
    <div className="d3-component" ref={svgRef}>
      <button
        className="btn"
        onClick={() => dispatch({ type: "SHOW_GRAPH", value: false })}
      >
        Close
      </button>
    </div>
  );
};
export default CountryReportTotal;
