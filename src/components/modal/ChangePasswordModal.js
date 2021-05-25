import React from "react";
import { Form, message } from "antd";
import { useRecoilState } from "recoil";

import CustomModal from "components/custom/CustomModal";
import CustomInput from "styled/CustomInput";
import CustomButton from "styled/CustomButton";
import {
  CustomerAuthentication,
  UpdateNewPassword,
} from "services/CustomerService";
import { Subtitle } from "styled/Typography";
import { userDataState } from "recoil/user";

export const ChangePasswordModal = ({ visible, setVisible }) => {
  const [form] = Form.useForm();
  const [userState] = useRecoilState(userDataState);

  const onFinish = async (values) => {
    const { user } = userState;
    const { email, userId } = user;
    const { confirm, current_password, password } = values;
    const passwordMatched = await CustomerAuthentication({
      username: email,
      password: current_password,
    });
    if (passwordMatched.data.token.length > 0 && confirm === password) {
      const request_data = {
        currentPassword: current_password,
        password: confirm,
        password2: password,
      };
      UpdateNewPassword(request_data, userId)
        .then(() => {
          form.resetFields();
          message.success("Update new password successful!");
          setVisible(false);
        })
        .catch(() => {
          message.error("Error when update a new password. Please try again.");
        });
    } else {
      // wrong current password
      message.error("Wrong your current password. Please try again");
    }
  };

  return (
    <CustomModal
      visible={visible}
      onCancel={() => setVisible(false)}
      heading="Change password"
    >
      <Form
        form={form}
        name="change_password"
        onFinish={onFinish}
        scrollToFirstError
        className="text-center"
      >
        <div className="w-full flex items-center justify-center flex-col">
          <div className="w-9/12 mx-auto">
            <Subtitle className="w-full block my-2 text-center bold mb-4">
              Confirm current password
            </Subtitle>
            <Form.Item
              name="current_password"
              className="full"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <CustomInput
                type="password"
                placeholder="Current password"
                size="large"
                className="w-full"
              />
            </Form.Item>
            <Subtitle className="text-center block mt-4 bold mb-2">
              Enter new password
            </Subtitle>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <CustomInput
                type="password"
                placeholder="New password"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      "The two passwords that you entered do not match!"
                    );
                  },
                }),
              ]}
            >
              <CustomInput
                type="password"
                placeholder="Confirm new password"
                size="large"
              />
            </Form.Item>
            <Form.Item className="mt-8">
              <CustomButton
                type="primary"
                size="large"
                htmlType="submit"
                className="uppercase"
              >
                Change Password
              </CustomButton>
            </Form.Item>
          </div>
        </div>
      </Form>
    </CustomModal>
  );
};
