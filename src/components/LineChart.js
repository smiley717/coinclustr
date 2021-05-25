import React from "react";
import Chart from "react-google-charts";
import moment from "moment";
import { Skeleton } from "antd";

import LineChartWrapper from "../styled/LineChartWrapper";

const defaultOptions = {
  title: null,
  legend: "none",
  hAxis: {
    title: null,
    format: "EE dd",
    textStyle: {
      color: "#ADB5BD",
      fontSize: 14,
      fontName: "Poppins",
    },
    gridlines: {
      color: "transparent",
    },
  },
  vAxis: {
    title: null,
    format: "0.0000",
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
    isHtml: true,
    crosshairs: [true],
  },
};

const chartEvents = [
  {
    eventName: "ready",
    callback() {
      const chartDiv = document.getElementById("LineChart");
      const axisLabels = chartDiv.getElementsByTagName("text");
      for (let i = 0; i < axisLabels.length; i++) {
        if (axisLabels[i].getAttribute("text-anchor") === "end") {
          // eslint-disable-next-line no-self-assign
          const innerHTML = axisLabels[i].innerHTML;
          axisLabels[i].innerHTML = innerHTML;
        }
      }
    },
  },
];

const createCustomHTMLContent = (time, price) => {
  return `
    <div class="custom-tooltip">
      <p class="tooltip-content">${moment(time).format(
        "ddd, MMM Do YYYY, HH:mm"
      )}</p>
      <p class="tooltip-content"><strong>Total:</strong> ${price} btc</p>
    </div>
  `;
};

const renderLoadingChart = () => <Skeleton />;

const LineChart = ({ data, options, width, height }) => {
  if (!data) {
    return null;
  }

  let chartOptions = defaultOptions;
  if (options) {
    chartOptions = Object.assign(defaultOptions, options);
  }

  let chartData = [
    ["time", "price", { role: "tooltip", type: "string", p: { html: true } }],
  ];

  if (Array.isArray(data) && data.length > 0) {
    data.forEach((item) => {
      chartData.push([
        moment(item[0]).format("M/DD/YYYY HH:MM A"),
        parseFloat(item[1]),
        createCustomHTMLContent(item[0], parseFloat(item[1])),
      ]);
    });
  } else {
    const arrayData = Object.entries(data);
    arrayData.forEach((item) => {
      chartData.push([
        moment(item[0]).format("ddd DD"),
        parseFloat(item[1]),
        createCustomHTMLContent(item[0], parseFloat(item[1])),
      ]);
    });
  }

  return (
    <LineChartWrapper>
      <Chart
        graphID="LineChart"
        width={width || "720px"}
        height={height || "208px"}
        chartType="LineChart"
        data={chartData}
        options={chartOptions}
        chartEvents={chartEvents}
        loader={renderLoadingChart()}
      />
    </LineChartWrapper>
  );
};

export default LineChart;
