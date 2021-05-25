import React, { useEffect, useState } from "react";
import { SearchOutlined, DownOutlined } from "@ant-design/icons";
import { Dropdown, Divider } from "antd";
import { css } from "glamor";
import { Menu, Input } from "antd";
import { BodyText } from "../styled/Typography";
import CustomTag from "../styled/CustomTag";
import { FILTER_PAYMENT_LIST } from "../utils/Constant";
import { useLocation } from "react-router-dom";
import { isEmpty } from "utils/common-utils";
import theme from "../utils/theme";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";

// import { userFilters, selectedFilters } from "recoil/payments";

const ButtonStylings = css({
  border: `1px solid ${theme.colors.borderColor}`,
  borderRadius: "8px",
  backgroundColor: "#fff",
});

const SearchDropdownFilter = ({ onSubmit, userFilters, selectedFilters, filtersList, title }) => {
  const location = useLocation();
  const userFilter = useRecoilValue(userFilters);
  const setUserFilters = useSetRecoilState(userFilters);

  const selectedFilter = useRecoilValue(selectedFilters);
  const setSelectedFilter = useSetRecoilState(selectedFilters);
  const resetSelectedFilter = useResetRecoilState(selectedFilters);


  const searchableOptions = [...filtersList, ...userFilter];
  const [filters, setFilter] = useState(searchableOptions);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownSearchTerm, setDropdownSearchTerm] = useState('');

  useEffect(() => {
    onSubmit(selectedFilter)
    console.log("use effect")
  }, [selectedFilter]);

  const onDropdownSearchTermChange = (evt) => {
    const searchTerm = evt.target.value;
    setDropdownSearchTerm(searchTerm);
    setDropdownVisible(true);
    if (searchTerm === '') {
      setFilter(searchableOptions);
      return;
    } else {
      setDropdownVisible(false)
    }
    setFilter(searchableOptions.filter(({ searchPattern }) => searchPattern.includes(searchTerm.toLowerCase())))
  }
  const onPressEnter = (evt) => {
    const searchTerm = evt.target.value;
    setFilter(searchableOptions);
    setDropdownSearchTerm('');
    setDropdownVisible(searchTerm === '' ? true : false);

    if (searchTerm === '') {
      return;
    }
    const isExist = searchableOptions.find(({ searchPattern }) => searchPattern.find(sp => sp === searchTerm.toLowerCase()));
    if (!isExist) {
      const uf = {
        id: Math.floor(Math.random() * 99999),
        label: `Custom: ${searchTerm}`,
        value: searchTerm,
        searchPattern: [],
        isCustom: true,
      };

      setUserFilters([uf]);
    }
    const newSelected = !isExist ? searchTerm : isExist.value;
    if (!selectedFilter.includes(newSelected)) {
      onSelectTag(newSelected);
    }

  }
  const onSelectTag = (value) => {
    if (!selectedFilter.includes(value)) {
      setSelectedFilter(old => [...old, value]);
    } else {
      onRemoveTag(value);
    }
  };

  const onRemoveTag = (value) => {
    setSelectedFilter(old => old.filter(o => o !== value));
  };

  const toggleDropdownVisible = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const menu = () => (
    <Menu className="p-4">
      {filters.map((item, index) => {
        const isSelected = selectedFilter.indexOf(item.value) > -1;
        if (item.isCustom) return null;
        return (
          <CustomTag
            key={index}
            onClick={() => {
              onSelectTag(item.value);
              // onSubmit(selectedFilter);
            }}
            selected={isSelected}

          >
            {item.label}
          </CustomTag>
        );
      })}
      {selectedFilter && !isEmpty(selectedFilter) && (
        <>
          <Divider className="my-3" />
          <div className="w-full flex items-center">
            <BodyText className="mr-4">Selected Filters</BodyText>
            <div className="">
              {selectedFilter.map((item) => {
                const sFilter = searchableOptions.find(f => f.value === item);
                if (!sFilter) return null;
                return (
                  <CustomTag
                    closable
                    key={sFilter.value}
                    onClose={() => {
                      var filters = selectedFilter.filter(o => o !== sFilter.value);
                      setSelectedFilter(filters);
                      // onSubmit(filters);
                    }}
                  >{sFilter.label}</CustomTag>
                );
              })}
            </div>
          </div>
        </>
      )}
    </Menu>
  );

  return (
    <div id="PaymentDropdownFilter">
      <Dropdown
        overlay={menu()}
        trigger={["click"]}
        visible={dropdownVisible}
        onVisibleChange={() => {
          // onSubmit(selectedFilter);
          setDropdownVisible(!dropdownVisible);
          setFilter(searchableOptions);
        }}
        placement="bottomCenter"
        getPopupContainer={() => document.getElementById('PaymentDropdownFilter')}
      >
        <div
          {...ButtonStylings}
          className="flex justify-between items-center px-3 py-1.5 mt-3"
          role="button"
          onClick={toggleDropdownVisible}
        >
          <Input
            className="flex items-center select-none"
            prefix={(<SearchOutlined className="mr-3" />)}
            suffix={(<DownOutlined />)}
            placeholder={`Search / Filter ${title}`}
            bordered={false}
            onPressEnter={onPressEnter}
            onChange={onDropdownSearchTermChange}
            value={dropdownSearchTerm}
          />
        </div>
      </Dropdown>
      {selectedFilter && !isEmpty(selectedFilter) && (
        <div className="w-full flex items-center py-3">
          <BodyText className="mr-4">Selected Filters</BodyText>
          <div className="">
            {selectedFilter.map((item) => {
              const sFilter = searchableOptions.find(f => f.value === item);
              if (!sFilter) return null;
              return (
                <CustomTag
                  closable
                  key={sFilter.value}
                  onClose={() => {
                    var filters = selectedFilter.filter(o => o !== sFilter.value);
                    setSelectedFilter(filters);
                    // onSubmit(filters);
                  }}
                >{sFilter.label}</CustomTag>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchDropdownFilter;
