import React from "react";

import { LabelLarge } from "styled/Typography";

import { ReactComponent as CheckedIcon } from "img/icons/checked.svg";
import { ReactComponent as ClosedIcon } from "img/icons/close-circle-icon.svg";

const PlanDetailSection = () => (
  <ul>
    <li className="mb-2 flex items-center">
      <CheckedIcon className="mr-4" />
      <LabelLarge>Analytics Platform</LabelLarge>
    </li>
    <li className="mb-2 flex items-center">
      <CheckedIcon className="mr-4" />
      <LabelLarge>Desktop version</LabelLarge>
    </li>
    <li className="mb-2 flex items-center">
      <CheckedIcon className="mr-4" />
      <LabelLarge>Chat support</LabelLarge>
    </li>
    <li className="mb-2 flex items-center">
      <ClosedIcon className="mr-4" />
      <LabelLarge>Optimize</LabelLarge>
    </li>
    <li className="mb-2 flex items-center">
      <ClosedIcon className="mr-4" />
      <LabelLarge>Reports and notifications</LabelLarge>
    </li>
  </ul>
);

export default PlanDetailSection;
