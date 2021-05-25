import React, { useState } from "react";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Divider } from "antd";
import { css } from "glamor";
import { Menu } from "antd";
import remove from "lodash/remove";

import { BodyText } from "../styled/Typography";
import CustomTag from "../styled/CustomTag";

import { FILTER_INVOICE_LIST } from "../utils/Constant";
import { isEmpty } from "utils/common-utils";
import theme from "../utils/theme";

const ButtonStylings = css({
  border: `1px solid ${theme.colors.borderColor}`,
  borderRadius: "8px",
  backgroundColor: "#fff",
});

const InvoiceFilterDropdown = ({ onSubmit }) => {
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const onSelectTag = (value) => {
    if (selectedFilter.indexOf(value) === -1) {
      setSelectedFilter([...selectedFilter, value]);
    } else {
      const dump_selected_invoice = selectedFilter;
      const new_status = remove(dump_selected_invoice, (element) => {
        return element !== value;
      });
      setSelectedFilter(new_status);
    }
  };

  const onRemoveTag = (value) => {
    const dump_selected_filter = selectedFilter;
    const new_status = remove(dump_selected_filter, (element) => {
      return element !== value;
    });
    setSelectedFilter(new_status);
  };

  const toggleDropdownVisible = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const menu = (
    <Menu className="p-4">
      {FILTER_INVOICE_LIST.map((item, index) => {
        return (
          <CustomTag
            key={index}
            onClick={() => onSelectTag(item.value)}
            selected={selectedFilter.indexOf(item.value) > -1}
          >
            {item.label}
          </CustomTag>
        );
      })}
      {selectedFilter && !isEmpty(selectedFilter) && (
        <>
          <Divider className="my-3" />
          <div className="w-full flex items-center">
            <BodyText className="mr-4">Selected Invoice</BodyText>
            <div className="">
              {selectedFilter.map((item, index) => {
                return (
                  <CustomTag
                    closable
                    key={index}
                    onClose={() => onRemoveTag(item)}
                  >{`Action: ${item}`}</CustomTag>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        trigger={["click"]}
        visible={dropdownVisible}
        onVisibleChange={() => {
          onSubmit(selectedFilter);
          setDropdownVisible(!dropdownVisible);
        }}
      >
        <div
          {...ButtonStylings}
          className="flex justify-between items-center px-4 py-2 mt-3"
          role="button"
          onClick={toggleDropdownVisible}
        >
          <div className="flex items-center select-none">
            <SearchOutlined className="mr-4" />
            <BodyText>Search / Filter Invoices</BodyText>
          </div>
          <DownOutlined />
        </div>
      </Dropdown>
      {selectedFilter && !isEmpty(selectedFilter) && (
        <div className="w-full flex items-center py-3">
          <BodyText className="mr-4">Selected Filters</BodyText>
          <div className="">
            {selectedFilter.map((item, index) => {
              return (
                <CustomTag
                  closable
                  key={index}
                  onClose={() => onRemoveTag(item)}
                >{`Action: ${item}`}</CustomTag>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default InvoiceFilterDropdown;
