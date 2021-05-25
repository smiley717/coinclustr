import React, { useState } from "react";
import { Input, Modal, Form } from "antd";

import CustomButton from "../../styled/CustomButton";

import { DeactiveUserProfile } from "../../services/CustomerService";

import { VALIDATE_MESSAGE } from "../../utils/Constant";

export const DeactivateModal = ({
  deactivateModalVisible,
  setDeactivateModalVisible,
  profile,
}) => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState("");
  const onDeactiveAccount = (values) => {
    // TODO: need to change into the actually values from input later
    // const { email } = values;
    DeactiveUserProfile().then((res) => {
      form.resetFields();
      setDeactivateModalVisible(false);
      message.success("Deactivated your acccount!");
      window.location.href = "/auth/signin";
    });
  };

  const handleChangeMessageValue = (event) => {
    setMessage(event.target.value);
  };

  return (
    <Modal
      title="Deactive Account"
      centered
      visible={deactivateModalVisible}
      onCancel={() => setDeactivateModalVisible(false)}
      footer={
        <div className="flex justify-start items-center">
          <CustomButton
            form="deactivate_account_form"
            key="submit"
            htmlType="submit"
            type="danger"
            size="large"
            disabled={message !== VALIDATE_MESSAGE}
          >
            Deactive your account
          </CustomButton>
          <CustomButton
            onClick={() => setDeactivateModalVisible(false)}
            type="primary"
            size="large"
            ghost
          >
            Cancel
          </CustomButton>
        </div>
      }
    >
      <Form
        name="deactivate_account_form"
        id="deactivate_account_form"
        layout="vertical"
        form={form}
        style={{
          width: "100%",
        }}
        onFinish={onDeactiveAccount}
      >
        <Form.Item name="message">
          <p>
            You are about to permanently delete your account and all its
            contents. You will not be able to recover this account. This
            operation cannot be undone type{" "}
            <strong>"{`${VALIDATE_MESSAGE}`}"</strong> to confirm
          </p>
          <Input
            type="text"
            size="large"
            style={{ width: "100%" }}
            placeholder="Message"
            onChange={handleChangeMessageValue}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
