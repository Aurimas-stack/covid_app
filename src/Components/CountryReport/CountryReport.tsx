import React, { FC, useRef, useEffect } from "react";
import * as d3 from "d3";

import { LatestCountryData } from "../../utils/types";

import "./CountryReport.css";

interface ReportProps {
  report: LatestCountryData[];
}

const CountryReport: FC<ReportProps> = ({ report }): JSX.Element | null => {
  const d3Container = useRef(null);
  useEffect(() => {
    if (d3Container.current) {
      const svg = d3.select(d3Container.current);
      const update = svg.append("g").selectAll("text").data(report);

      svg.append("circle")
      .attr("cx", 150)
      .attr("cy", 70)
      .attr("r",  50)
    }
  }, [report, d3Container.current]);

  if (!report) return null;

  return (
    <svg className="d3-component" width={400} height={200} ref={d3Container} />
  );
};
export default CountryReport;
