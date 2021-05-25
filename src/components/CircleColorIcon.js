import React from "react";
import { css } from "glamor";

const CircleColorIcon = ({
  className = "",
  children,
  width = "20px",
  height = "20px",
  iconWidth = "15px",
  iconHeight = "15px",
}) => {
  const CircleColorStyles = css({
    " svg": {
      content: " ",
      position: "absolute",
      top: "50%",
      left: "50%",
      display: "block",
      transform: "translate(-50%, -50%)",
      width: iconWidth,
      height: iconHeight,
    },
  });
  return (
    <span
      className={`rounded-full bg-opacity-20 relative block ${className}`}
      style={{ width: width, height: height }}
    >
      {<span {...CircleColorStyles}>{children}</span>}
    </span>
  );
};

export default CircleColorIcon;
