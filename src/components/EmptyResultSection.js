import React from "react";

import CustomCard from "../styled/CustomCard";
import { H4 } from "../styled/Typography";
import { ReactComponent as WalletFlatIcon } from "../img/icons/wallet-flat.svg";

const EmptyResultSection = ({ text = "" }) => (
  <CustomCard
    display="flex"
    justifycontent="center"
    className="flex justify-center items-center py-16"
  >
    <div className="flex justify-center items-center flex-col">
      <WalletFlatIcon className="mb-6" />
      <H4>{text}</H4>
    </div>
  </CustomCard>
);

export default EmptyResultSection;
