import { Button, Col, Form, Input, Row, Select } from "antd";
import { Section } from "admiral";
import { Flex } from "antd";
import { useNavigate } from "react-router";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

export const FormIssueRisk = ({ formProps, error, loading, isEdit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Section title="Issue/Risk Information">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Kode Issue/Resiko"
                name="kode_issue_risk"
                rules={[
                  {
                    required: true,
                    message: "Kode Issue/Resiko is required",
                  },
                  {
                    min: 1,
                    message: "Kode Issue/Resiko must be at least 1 character",
                  },
                ]}
              >
                <Input placeholder="Enter issue/risk code (e.g. IR001)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Tipe Resiko/Issue"
                name="tipe_issue_risk"
                rules={[
                  {
                    required: true,
                    message: "Tipe Resiko/Issue is required",
                  },
                ]}
              >
                <Select placeholder="Select issue/risk type">
                  <Select.Option value="Technical Risk">Technical Risk</Select.Option>
                  <Select.Option value="Budget Risk">Budget Risk</Select.Option>
                  <Select.Option value="Schedule Risk">Schedule Risk</Select.Option>
                  <Select.Option value="Resource Risk">Resource Risk</Select.Option>
                  <Select.Option value="Quality Issue">Quality Issue</Select.Option>
                  <Select.Option value="Scope Issue">Scope Issue</Select.Option>
                  <Select.Option value="Communication Risk">Communication Risk</Select.Option>
                  <Select.Option value="Stakeholder Risk">Stakeholder Risk</Select.Option>
                  <Select.Option value="External Risk">External Risk</Select.Option>
                  <Select.Option value="Compliance Issue">Compliance Issue</Select.Option>
                </Select>
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
        <Button type="text" disabled={loading} onClick={() => navigate("/master-data/issue-risks")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};
