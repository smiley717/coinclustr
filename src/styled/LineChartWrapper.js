import styled from "styled-components";

import theme from "../utils/theme";

const LineChartWrapper = styled.div`
  width: 100%;
  overflow-x: 100%;

  .google-visualization-tooltip {
    background: transparent;
    border: 0;
    border-radius: 0;
    box-shadow: none;
  }

  .custom-tooltip {
    min-width: 160px;
    padding: 16px;
    border-radius: 10px;
    background: ${theme.colors.whiteColor};
    border: 1px solid ${theme.colors.cardBorderColor};

    .tooltip-content {
      margin-bottom: 5px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      color: ${theme.colors.alertDefaultDescriptionColor};
    }
  }

  .loading {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    color: ${theme.colors.baseTextColor};
  }
`;

export default LineChartWrapper;