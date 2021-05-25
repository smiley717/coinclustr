import React, { useEffect } from "react";
import { Form, Select, Input, InputNumber } from "antd";
import get from "lodash/get";

import { PostTopupAddress } from "../../services/BillingServices";
const { Option } = Select;

const TopUpForm = ({ amountValue, setAmountValue }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    handleChangeAmount(5);
  }, []);

  const handleChangeAmount = (value) => {
    setAmountValue(parseInt(value));
    const selectedAmount = parseInt(value);
    PostTopupAddress(selectedAmount).then((res) => {
      const data = get(res, "data[0]");
      const { sendToAddress, amount } = data;
      form.setFieldsValue({
        wallet: sendToAddress,
        btc: amount * (selectedAmount / 5),
      });
    });
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      form={form}
      id="get_topup_form"
      initialValues={{
        amount: 5,
      }}
      style={{
        width: "100%",
      }}
    >
      <Form.Item label="Your amount (USD)" name="amount">
        <Select style={{ width: 120 }} onChange={handleChangeAmount}>
          <Option value="5">5</Option>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="30">30</Option>
          <Option value="40">40</Option>
          <Option value="50">50</Option>
          <Option value="60">60</Option>
          <Option value="70">70</Option>
          <Option value="80">80</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Send to address" name="wallet">
        <Input
          type="text"
          disabled
          size="large"
          style={{ width: "100%" }}
          placeholder="Your wallet address"
        />
      </Form.Item>
      <Form.Item label="Amount with BTC" name="btc">
        <InputNumber style={{ width: "100%" }} disabled min={0} />
      </Form.Item>
      <p>
        Please make exact payment to the unique address above to credit your
        account
      </p>
    </Form>
  );
};

export default TopUpForm;
