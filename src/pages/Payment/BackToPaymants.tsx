import React from "react";
import { Link } from "react-router-dom";
import { LabelLarge } from "styled/Typography";
import { LeftOutlined } from "@ant-design/icons";
import theme from "../../utils/theme";

export default function BackToPaymants() {
  return (
    <Link to="/payments" className="flex justify-start items-center">
      <LeftOutlined style={{ color: theme.colors.gray50 }} />
      <LabelLarge className="ml-4">Payments</LabelLarge>
    </Link>
  );
}
