import { Button, Col, Form, Input, Row, DatePicker } from "antd";
import { Section } from "admiral";
import { Flex } from "antd";
import { useNavigate } from "react-router";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

export const FormBook = ({ formProps, error, loading, isEdit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Section title="Book Information">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Title is required",
                  },
                ]}
              >
                <Input placeholder="Enter book title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Author"
                name="author"
                rules={[
                  {
                    required: true,
                    message: "Author is required",
                  },
                ]}
              >
                <Input placeholder="Enter author name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Publication Date"
                name="publicationDate"
                rules={[
                  {
                    required: true,
                    message: "Publication date is required",
                  },
                ]}
              >
                <DatePicker style={{ width: "100%" }} placeholder="Select publication date" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Total Copies"
                name="totalCopies"
                rules={[
                  {
                    required: true,
                    message: "Total copies is required",
                  },
                  {
                    type: "number",
                    min: 0,
                    message: "Total copies must be a non-negative number",
                  },
                ]}
              >
                <Input type="number" placeholder="Enter total copies" />
              </Form.Item>
            </Col>
          </Row>
        </Section>
      </Section>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={() => navigate("/examples/books")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Save Changes" : "Submit"}
        </Button>
      </Flex>
    </Form>
  );
};
