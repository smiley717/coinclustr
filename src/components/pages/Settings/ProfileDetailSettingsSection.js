import React from "react";
import { Col, Divider, Row } from "antd";
import get from "lodash/get";

import CustomCard from "styled/CustomCard";
import CustomButton from "styled/CustomButton";
import { H3, LabelLarge, BodyText } from "styled/Typography";

import { ReactComponent as CheckedIcon } from "img/icons/checked.svg";

const ProfileDetailSettingsSection = ({
  profileState,
  setEditProfileModalVisible,
}) => {
  return (
    <section className="w-full mb-10">
      <div className="w-full flex">
        <H3>Profile</H3>
      </div>
      <div className="mb-6">
        <div className="w-full">
          <CustomCard>
            <div className="flex flex-col w-full">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-start sm:items-center flex-col justify-start sm:flex-row mb-4 sm:mb-0">
                  <LabelLarge className="mr-8 block sm:block md:flex">
                    Display name
                  </LabelLarge>
                  <BodyText className="block sm:flex">
                    {get(profileState, "fullname", "")}
                  </BodyText>
                </div>
                <CustomButton
                  size="large"
                  type="default"
                  className="outline"
                  onClick={() => setEditProfileModalVisible(true)}
                >
                  EDIT
                </CustomButton>
              </div>
              <Divider className="my-4" />
              <Row className="w-full">
                <Col xs={24} sm={20} md={20} lg={20} xl={20} className="flex items-start sm:items-center flex-col justify-start sm:flex-row mb-4 sm:mb-0">
                  <LabelLarge className="mr-8 block sm:block md:flex">
                    Email address
                  </LabelLarge>
                  <BodyText className="block sm:flex">
                    {get(profileState, "email", "")}
                  </BodyText>
                </Col>

                <Col xs={24} sm={4} md={4} lg={4} xl={4} className="flex items-center justify-end mb-4 sm:mb-0">
                  <CheckedIcon className="mr-2" />
                  <BodyText className="text-coinclustr-green">
                    Verified
                  </BodyText>
                </Col>
              </Row>
            </div>
          </CustomCard>
        </div>
      </div>
    </section>
  );
};

export default ProfileDetailSettingsSection;
