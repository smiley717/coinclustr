import React from "react";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

import { LabelLarge } from "../styled/Typography";
import theme from "../utils/theme";

const GoBackButton = ({ url, text }) => {
  return (
    <Link
      to={url}
      className="flex justify-start items-center cursor-pointer mb-2"
    >
      <LeftOutlined
        style={{ color: theme.colors.alertDefaultDescriptionColor }}
      />
      <LabelLarge
        className="ml-4 mb-0"
        style={{ color: theme.colors.alertDefaultDescriptionColor }}
      >
        {text}
      </LabelLarge>
    </Link>
  );
};

export default GoBackButton;
