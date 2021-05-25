import { Menu } from "antd";
import styled from "styled-components";
import devices from "./Devices";

const { Item } = Menu;

export const CustomMenuItem = styled(Item)`
  position: relative;
  display: inline-flex !important;
  flex: 1 !important;
  justify-content: center;
  align-items: center;
  min-height: ${(props) => (props.minheight ? props.minheight : "auto")}px;
  margin: 0 0px 0 0 !important;
  padding: 0 4px !important;
  font-style: normal;
  font-weight: 500;
  font-size: 14px !important;
  line-height: 32px;
  color: ${(props) => props.theme.colors.menuColor};
  border-bottom: 0 !important;
  transition: all 0.3s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    height: 3px;
    width: 0;
    display: block;
    background: ${(props) => props.theme.colors.primaryBlueColor};
    border-radius: 10px;
    transform: translateX(-50%);
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }

  &.ant-menu-item-selected,
  &:hover,
  &:focus,
  &:active {
    color: ${(props) => props.theme.colors.menuActiveColor} !important;
    border-bottom: 0 !important;

    &::after {
      width: 100%;
    }
  }

  @media ${devices.tablet} {
    padding: 0 15px !important;
    margin-right: 10px !important;
  }

  @media ${devices.laptop} {
    padding: 0 18px !important;
    margin-right: 32px !important;
  }
`;

export const CustomMenuHorizontal = styled(Menu)`
  background: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
  display: flex !important;
`;
