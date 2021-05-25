import React from "react";
import { Skeleton } from "antd";

const Loader = () => (
  <div className="container mx-auto flex justify-center items-center">
    <Skeleton active />
  </div>
);

export default Loader;
