import { Button, Col, Form, Input, Row, DatePicker, Select } from "antd";
import { Section } from "admiral";
import { Flex } from "antd";
import { useNavigate } from "react-router";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

export const FormKurs = ({ formProps, error, loading, isEdit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Section title="Exchange Rate Information">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nilai Kurs (USD ke IDR)"
                name="nilai_kurs"
                rules={[
                  {
                    required: true,
                    message: "Nilai kurs is required",
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: "Nilai kurs must contain only numbers",
                  },
                ]}
              >
                <Input placeholder="Enter exchange rate value (e.g. 15250)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tanggal"
                name="tanggal"
                rules={[
                  {
                    required: true,
                    message: "Tanggal is required",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} placeholder="Select date" />
              </Form.Item>
            </Col>
            {isEdit && (
              <Col span={12}>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[
                    {
                      required: true,
                      message: "Status is required",
                    },
                  ]}
                >
                  <Select placeholder="Select status">
                    <Select.Option value="Active">Active</Select.Option>
                    <Select.Option value="Inactive">Inactive</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            )}
          </Row>
        </Section>
      </Section>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={() => navigate("/master-data/kurs")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};
