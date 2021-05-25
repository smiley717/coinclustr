import React, { useState } from "react";
import Chart from "react-google-charts";
import moment from "moment";
import { Skeleton } from "antd";

import LineChartWrapper from "../styled/LineChartWrapper";
import { isEmpty, numberWithCommas } from "utils/common-utils";
import { H3, Label } from "../styled/Typography";

import styled from "styled-components";

const ScroledChart = styled.div`
  @media (max-width: 500px) {
    overflow: scroll;
    margin-top: 20px;
    text-align: start;
  }
`;

const defaultOptions = {
  title: null,
  legend: "none",
  crosshair: { orientation: "vertical", color: "#686D71", trigger: "focus" },
  hAxis: {
    title: null,
    format: "EE dd",
    textStyle: {
      color: "transparent",
      fontSize: 0,
      fontName: "Poppins",
    },
    gridlines: {
      color: "transparent",
    },
  },
  vAxis: {
    title: null,
    format: "short",
    textStyle: {
      color: "#45484C",
      fontSize: 14,
      fontName: "Poppins",
    },
    gridlines: {
      color: "#EFF0F2",
      count: 5,
    },
  },
  chartArea: {
    left: 60,
    right: 30,
    top: 20,
    bottom: 50,
  },
  lineWidth: 1,
  colors: ["#1D66FF"],
  tooltip: {
    trigger: "none",
  },
};

const renderLoadingChart = () => <Skeleton />;

const LineMarketChart = ({ data, options, width, height }) => {
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedDateTime, setSelectedDateTime] = useState("");

  if (!data) {
    return null;
  }

  let chartOptions = defaultOptions;
  if (options) {
    chartOptions = Object.assign(defaultOptions, options);
  }

  let chartData = [["time", "price"]];

  if (Array.isArray(data) && data.length > 0) {
    data.forEach((item) => {
      chartData.push([
        moment(item[0]).format("M/DD/YYYY HH:MM A"),
        parseFloat(item[1]),
      ]);
    });
  } else {
    const arrayData = Object.entries(data);
    arrayData.forEach((item) => {
      chartData.push([
        moment(item[0]).format("M/DD/YYYY HH:MM A"),
        parseFloat(item[1]),
      ]);
    });
  }

  const chartEvents = [
    {
      eventName: "ready",
      callback: ({ chartWrapper, google }) => {
        const chart = chartWrapper.getChart();
        google.visualization.events.addListener(chart, "onmouseover", (e) => {
          const { row } = e;
          setSelectedDateTime(chartData[row + 1][0]);
          setSelectedPrice(chartData[row + 1][1]);
        });
      },
    },
  ];

  return (
    <LineChartWrapper>
      <div className="w-full flex items-baseline" style={{ height: "30px" }}>
        {!isEmpty(selectedPrice) ? (
          <H3 className="mr-2 flex items-center">
            {`$${numberWithCommas(parseFloat(selectedPrice).toFixed(2))}`}
          </H3>
        ) : null}
        {!isEmpty(selectedDateTime) ? <Label>{selectedDateTime}</Label> : null}
      </div>
      <ScroledChart>
        <Chart
          className="chart"
          // style={{ marginLeft: "-23px" }}
          graphID="LineChart"
          width={width || "520px"}
          height={height || "8px"}
          chartType="LineChart"
          data={chartData}
          options={chartOptions}
          chartEvents={chartEvents}
          loader={renderLoadingChart()}
        />
      </ScroledChart>
    </LineChartWrapper>
  );
};

export default LineMarketChart;
