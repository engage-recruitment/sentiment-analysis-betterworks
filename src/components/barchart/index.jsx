import React from "react";
import { ColumnChart } from "react-chartkick";
import "chart.js";

const BarChart = (props) => {
  const data = props.scores.map((score) => [
    score.segment,
    score.sentimentScore,
  ]);
  return <ColumnChart data={data} />;
};

export default BarChart;
