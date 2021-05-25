import React, { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { css } from "glamor";

import CustomCard from "../../styled/CustomCard";
import { H3, Subtitle } from "../../styled/Typography";

const toggleButtonStyles = css({
  position: "absolute",
  fontSize: "18px",
  top: "24px",
  right: "24px",
});

const CollapseCard = ({ title, subtitle, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <CustomCard display="block" style={{ marginBottom: "16px" }}>
      <H3 className>{title}</H3>
      <Subtitle>{subtitle}</Subtitle>
      <span className="cursor-pointer">
        {isCollapsed ? (
          <UpOutlined
            {...toggleButtonStyles}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        ) : (
          <DownOutlined
            {...toggleButtonStyles}
            onClick={() => setIsCollapsed(!isCollapsed)}
          />
        )}
      </span>
      <div className="block py-4">{!isCollapsed ? children : null}</div>
    </CustomCard>
  );
};

export default CollapseCard;
