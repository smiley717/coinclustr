import React, { useState } from "react";
import { Input, Form, message, Collapse } from "antd";
import get from "lodash/get";

import CustomModal from "../../styled/CustomModal";
import CustomButton from "../../styled/CustomButton";

import { UpdateUserProfile } from "../../services/CustomerService";

const { Panel } = Collapse;

export const EditProfileModal = ({
  editProfileModalVisible,
  setEditProfileModalVisible,
  callbackUpdateProfile,
  profile,
  user,
}) => {
  const [form] = Form.useForm();
  const [newPasswordState, setNewPasswordState] = useState("");
  const [confirmNewPasswordState, setConfirmNewPasswordState] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeNewPassword = (event) =>
    setNewPasswordState(event.target.value);
  const onChangeConfirmNewPassword = (event) =>
    setConfirmNewPasswordState(event.target.value);

  const onUpdateProfile = (values) => {
    setIsSubmitting(true);
    const userId = get(user, "user.userId", "");
    const { name, confirmNewPassword = "", newPassword = "" } = values;
    let data = {};
    Object.assign(
      data,
      newPassword.length > 0 ? { password: newPassword } : null,
      confirmNewPassword.length > 0 ? { password2: confirmNewPassword } : null,
      name ? { fullname: name } : null
    );
    UpdateUserProfile(userId, data)
      .then(() => {
        message.success("Update successful!");
        setEditProfileModalVisible(false);
        // reset all fields after done
        form.resetFields();
        callbackUpdateProfile();
        setIsSubmitting(false);
      })
      .catch(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <CustomModal
      title="Update profile"
      centered
      destroyOnClose
      visible={editProfileModalVisible}
      onCancel={() => setEditProfileModalVisible(false)}
      footer={
        <div className="flex justify-start items-center">
          <CustomButton
            form="edit_profile_form"
            key="submit"
            htmlType="submit"
            type="primary"
            size="large"
            loading={isSubmitting}
          >
            Update your profile
          </CustomButton>
          <CustomButton
            onClick={() => setEditProfileModalVisible(false)}
            type="primary"
            size="large"
            loading={isSubmitting}
            ghost
          >
            Cancel
          </CustomButton>
        </div>
      }
    >
      <Form
        name="edit_profile_form"
        id="edit_profile_form"
        layout="vertical"
        form={form}
        style={{
          width: "100%",
        }}
        initialValues={{
          name: profile.fullname,
        }}
        onFinish={onUpdateProfile}
      >
        <Form.Item
          label="New Full Name"
          name="name"
          rules={[
            {
              required:
                confirmNewPasswordState.length === 0 &&
                newPasswordState.length === 0,
              message: "This field is required.",
            },
          ]}
        >
          <Input
            type="text"
            size="large"
            style={{ width: "100%" }}
            placeholder="Your name"
          />
        </Form.Item>
        <Collapse defaultActiveKey={[]} ghost>
          <Panel header="Update and change the password" key="1">
            <Form.Item
              rules={[
                {
                  required: confirmNewPasswordState.length > 0,
                  message: "This field is required.",
                },
              ]}
              name="newPassword"
              label="Password"
              hasFeedback
            >
              <Input.Password onChange={onChangeNewPassword} />
            </Form.Item>
            <Form.Item
              name="confirmNewPassword"
              label="Confirm Password"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: newPasswordState.length > 0,
                  message: "This field is required.",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <Input.Password onChange={onChangeConfirmNewPassword} />
            </Form.Item>
          </Panel>
        </Collapse>
      </Form>
    </CustomModal>
  );
};
