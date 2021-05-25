import React, { useState, useEffect } from "react";
import { Row, Typography, Skeleton, message } from "antd";
import get from "lodash/get";

import CustomCard from "../styled/CustomCard";
import CustomButton from "../styled/CustomButton";

import LineChart from "../components/LineChart";
import { GetRecentEarningActivity } from "../services/CustomerService";

const { Text } = Typography;

const RecentEarningChart = () => {
  const [selectedTimeSpan, setSelectedTimeSpan] = useState("HOURLY");
  const [
    recentEarningActivityLoading,
    setRecentEarningActivityLoading,
  ] = useState(true);
  const [recentEarningActivity, setRecentEarningActivity] = useState([]);

  useEffect(() => {
    setRecentEarningActivityLoading(true);
    GetRecentEarningActivity({ dateTimeFrequency: selectedTimeSpan })
      .then((res) => {
        setRecentEarningActivityLoading(false);
        setRecentEarningActivity(get(res, "data", []));
      })
      .catch(() => {
        message.error("Error when fetching recent earning activity");
        setRecentEarningActivityLoading(false);
      });
  }, [selectedTimeSpan]);

  const renderFilter = (className) => (
    <div className={`filter ${className}`}>
      <CustomButton
        className={`transparent ${
          selectedTimeSpan === "HOURLY" ? "active" : ""
        }`}
        onClick={() => setSelectedTimeSpan("HOURLY")}
      >
        1H
      </CustomButton>
      <CustomButton
        className={`transparent ${
          selectedTimeSpan === "DAILY" ? "active" : ""
        }`}
        onClick={() => setSelectedTimeSpan("DAILY")}
      >
        1D
      </CustomButton>
      <CustomButton
        className={`transparent ${
          selectedTimeSpan === "MONTHLY" ? "active" : ""
        }`}
        onClick={() => setSelectedTimeSpan("MONTHLY")}
      >
        1M
      </CustomButton>
      <CustomButton
        className={`transparent ${
          selectedTimeSpan === "YEARLY" ? "active" : ""
        }`}
        onClick={() => setSelectedTimeSpan("YEARLY")}
      >
        1Y
      </CustomButton>
    </div>
  );

  return (
    <CustomCard className="w-full">
      <div className=" w-full">
        <div className="w-full">
          <Row className="justify-between">
            <Text className="chart-label">Recent earnings</Text>
            {renderFilter("hide-mobile")}
          </Row>
          {/* <Row className="justify-between items-center mt-8">
            <Text className="total-value">$18,300.18</Text>
            <Row className="chart-label">
              <Text className="time">Return All Time</Text>
              <Text className="growth">+72.18%</Text>
              <Text className="price">$14,685.18</Text>
            </Row>
            {renderFilter("hide-desktop")}
            <Row className="chart-label">
              <Text className="time">Return 1W</Text>
              <Text className="growth">+10.15%</Text>
              <Text className="price">$72.18</Text>
            </Row>
          </Row> */}
          <Row className="chart-content">
            {recentEarningActivityLoading ? (
              <div className="w-full h-60 flex justify-center items-center">
                <Skeleton />
              </div>
            ) : (
              <LineChart width="100%" data={recentEarningActivity} />
            )}
          </Row>
        </div>
      </div>
    </CustomCard>
  );
};

export default RecentEarningChart;
