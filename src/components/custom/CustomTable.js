import React from "react";
import styled from "styled-components";
import { Table } from "antd";

import theme from "../../utils/theme";

const CustomTableStyled = styled(Table)`
  table {
    border-collapse: separate;
    border-spacing: 0;
    @media only screen and (max-width: 768px) {
      overflow-x: auto;
      white-space: nowrap;
      display: block;
    },
    .ant-table-thead {
      font-family: Poppins;
      font-size: 14px;
      width: 100%;
      tr {
        th {
          background-color: #f4f7fa;
          border: none;
          span {
            font-size: 14px;
            color: #575a5f;
            font-weight: 400;
          }
          color: #575a5f;
          text-align: center;
        }
      }
    }

    .ant-table-tbody {
      background: #FFFFFF;
      box-sizing: border-box;
      tr:nth-child(odd) {
        background: #fff;
      }
      tr:nth-child(even) {
        background: #f7f8f8;
      }
      
      tr:first-child td:first-child { 
        border-top-left-radius: 10px; 
      }
      tr:first-child td:last-child { 
        border-top-right-radius: 10px; 
      }
      tr:last-child td:first-child { 
        border-bottom-left-radius: 10px; 
      }
      tr:last-child td:last-child { 
        border-bottom-right-radius: 10px; 
      }
      tr:first-child td { 
        border-top-style: solid;
      }
      tr:last-child td { 
        border-bottom-style: solid;
      }
      tr td:first-child { 
        border-left-style: solid;
      }
      tr td:last-child { 
        border-right-style: solid;
      }
    }

    .ant-table-tbody  tr  td {
      border: none;
      cursor: pointer;
      text-align: center;
      border-color: #dee1e5;
      border-width: 1px; 
    }
  }
`;

// TODO: need to find a solution to update the custom table as design
const CustomTable = (props) => {
  return <CustomTableStyled {...props}></CustomTableStyled>;
};

export default CustomTable;
