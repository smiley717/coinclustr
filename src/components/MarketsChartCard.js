import React, { useState, useEffect } from "react";
import { Row, Skeleton, Button } from "antd";
import moment from "moment";
import get from "lodash/get";
import { css } from "glamor";

import LineMarketChart from "../components/LineMarketChart";

import { Label } from "../styled/Typography";
import CustomCard from "../styled/CustomCard";

import { GetMarketChartInRange } from "../services/MarketServices";
import theme from "../utils/theme";

const FILTER_TIME_LIST = [
  { value: "DAILY", label: "24H" },
  { value: "WEEKLY", label: "1W" },
  { value: "MONTHLY", label: "1M" },
  { value: "YEARLY", label: "1Y" },
];

const CRYPTO_LIST = [
  { value: "BITCOIN", label: "BTC" },
  { value: "ETHEREUM", label: "ETH" },
  { value: "LITECOIN", label: "LTC" },
];

const wrapperStyles = css({
  width: "360px",
});

const MarketsChartCard = () => {
  const [timeRangeNameSelected, setTimeRangeNameSelected] = useState("DAILY");
  const [selectedTimeRange, setSelectedTimeRange] = useState({
    from: moment().startOf("date").unix(),
    to: moment().endOf("date").unix(),
  });
  const [selectedCurrency, setSelectedCurrency] = useState("BITCOIN");
  const [dataFetching, setDataFetching] = useState(true);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    GetMarketChartInRange(selectedCurrency, {
      currency: "USD",
      filtered: true,
      from: selectedTimeRange.from,
      to: selectedTimeRange.to,
    }).then((res) => {
      setGraphData(get(res, "data.prices", []));
      setDataFetching(false);
    });
  }, [selectedCurrency, selectedTimeRange.from, selectedTimeRange.to]);

  const selectCurrency = (event, currency) => {
    event.preventDefault();
    setSelectedCurrency(currency);
    setDataFetching(true);
    GetMarketChartInRange(currency, {
      currency: "USD",
      filtered: true,
      from: selectedTimeRange.from,
      to: selectedTimeRange.to,
    }).then((res) => {
      setGraphData(get(res, "data.prices", []));
      setDataFetching(false);
    });
  };

  const selectMarketInRange = (range) => {
    setDataFetching(true);
    let timespan = "";
    switch (range) {
      case "DAILY":
        timespan = "date";
        break;
      case "WEEKLY":
        timespan = "isoWeek";
        break;
      case "MONTHLY":
        timespan = "month";
        break;
      case "YEARLY":
        timespan = "year";
        break;
      default:
        break;
    }
    const range_from = moment().startOf(timespan).unix();
    const range_to = moment().endOf(timespan).unix();
    setSelectedTimeRange({
      from: range_from,
      to: range_to,
    });
    setTimeRangeNameSelected(range);
    const params = {
      currency: "USD",
      filtered: true,
      from: range_from,
      to: range_to,
    };
    GetMarketChartInRange(selectedCurrency, params).then((res) => {
      setGraphData(get(res, "data.prices", []));
      setDataFetching(false);
    });
  };

  const generateDataForGraph = (data) => {
    let result = [];
    if (data.length > 0) {
      data.forEach((element) => {
        let item = [];
        item.push(moment(parseInt(element[0])).format());
        item.push(parseFloat(element[1]));
        result.push(item);
      });
    }
    return result;
  };

  return (
    <CustomCard {...wrapperStyles}>
      <div className="w-full">
        <Row className="justify-between">
          <Label className="text-coinclustr-gray-40">Price chart</Label>
        </Row>
        <Row className="justify-between mt-4">
          <div className="filter flex w-10/12">
            {FILTER_TIME_LIST.map((item, index) => {
              const { value, label } = item;
              return (
                <Button
                  key={index}
                  type={timeRangeNameSelected === value ? "primary" : "text"}
                  size="small"
                  className="px-2 mr-2"
                  onClick={() => selectMarketInRange(value)}
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </Row>
        <Row className="chart-content">
          <div className="w-full flex mb-4">
            {CRYPTO_LIST.map((item, index) => {
              const { value, label } = item;
              return (
                <div
                  key={index}
                  className="flex-1 pt-3 pb-1 cursor-pointer"
                  style={
                    selectedCurrency === value
                      ? {
                          color: theme.colors.blueIconColor,
                          borderBottom: `3px solid ${theme.colors.blueIconColor}`,
                        }
                      : {}
                  }
                  onClick={(event) => selectCurrency(event, value)}
                >
                  {label}
                </div>
              );
            })}
          </div>
          {dataFetching ? (
            <Skeleton />
          ) : (
            <LineMarketChart
              data={generateDataForGraph(graphData)}
              width="300px"
              height="250px"
            />
          )}
        </Row>
      </div>
    </CustomCard>
  );
};

export default MarketsChartCard;
