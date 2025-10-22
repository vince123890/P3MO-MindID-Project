import { Button, Col, Form, Input, Row, Select, Space, Typography, Tabs } from "antd";
import { Section } from "admiral";
import { Flex } from "antd";
import { useNavigate } from "react-router";
import { useState } from "react";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";
import { listUsers } from "../../user-management/_data";
import { allTemplateMessagings } from "../../master-data/template-messaging/_data";

const { TextArea } = Input;

export const FormMessaging = ({ formProps, error, loading, isEdit }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [bodyContent, setBodyContent] = useState("");
  const [activePreviewTab, setActivePreviewTab] = useState("edit");

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  // Get user options for To and CC fields
  const userOptions = listUsers.data.items
    .filter(user => user.status === "Active")
    .map((user) => ({
      label: user.nama_user,
      value: user.nama_user,
    }));

  // Get template options
  const templateOptions = allTemplateMessagings.data.items
    .filter(template => template.status === "Active")
    .map((template) => ({
      label: template.nama_template,
      value: template.id,
      body: template.body,
    }));

  // Handle template selection
  const handleTemplateSelect = (templateId) => {
    if (templateId) {
      const selectedTemplate = allTemplateMessagings.data.items.find(
        template => template.id === templateId
      );
      if (selectedTemplate) {
        form.setFieldsValue({
          body: selectedTemplate.body
        });
        setBodyContent(selectedTemplate.body);
        setSelectedTemplate(selectedTemplate);
      }
    } else {
      setSelectedTemplate(null);
    }
  };

  // Handle body content changes
  const handleBodyChange = (e) => {
    const value = e.target.value;
    setBodyContent(value);
    form.setFieldsValue({ body: value });
  };

  // Process placeholders for preview
  const processPlaceholders = (content) => {
    if (!content) return '<p style="color: #999;">No content available</p>';
    
    const sampleData = {
      '[Name]': 'John Doe',
      '[Date]': new Date().toLocaleDateString(),
      '[Project Name]': 'Sample Project',
      '[Status]': 'Active',
      '[Contact]': 'contact@example.com'
    };

    let processedContent = content;
    Object.keys(sampleData).forEach(placeholder => {
      const regex = new RegExp(placeholder.replace(/\[|\]/g, '\\$&'), 'g');
      processedContent = processedContent.replace(regex, sampleData[placeholder]);
    });

    return processedContent;
  };

  const previewTabs = [
    {
      key: 'edit',
      label: (
        <span>
          <EditOutlined />
          Edit Content
        </span>
      ),
      children: (
        <TextArea
          value={bodyContent}
          onChange={handleBodyChange}
          rows={12}
          placeholder="Enter message body content (HTML supported)&#10;&#10;Available placeholders:&#10;- [Name] - Recipient name&#10;- [Date] - Current date&#10;- [Project Name] - Project name&#10;- [Status] - Status value&#10;- [Contact] - Contact information&#10;&#10;You can also select a template above to load pre-formatted content.&#10;&#10;Example:&#10;&lt;h2&gt;Message Title&lt;/h2&gt;&#10;&lt;p&gt;Hello &lt;strong&gt;[Name]&lt;/strong&gt;,&lt;/p&gt;&#10;&lt;p&gt;Your message content here...&lt;/p&gt;"
          style={{ fontFamily: "monospace" }}
        />
      )
    },
    {
      key: 'preview',
      label: (
        <span>
          <EyeOutlined />
          HTML Preview
        </span>
      ),
      children: (
        <div style={{ 
          border: '1px solid #d9d9d9', 
          borderRadius: '6px', 
          padding: '16px',
          backgroundColor: '#fafafa',
          minHeight: '300px'
        }}>
          <Typography.Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '8px' }}>
            HTML Preview (with sample placeholder values):
          </Typography.Text>
          <div 
            style={{ 
              backgroundColor: 'white', 
              padding: '16px', 
              borderRadius: '4px',
              border: '1px solid #e8e8e8',
              minHeight: '150px'
            }}
            dangerouslySetInnerHTML={{ 
              __html: processPlaceholders(bodyContent)
            }}
          />
          
          <Typography.Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '16px', marginBottom: '8px' }}>
            Raw HTML Code:
          </Typography.Text>
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '12px', 
            borderRadius: '4px',
            fontFamily: 'monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
            maxHeight: '150px',
            overflow: 'auto',
            border: '1px solid #e8e8e8'
          }}>
            {bodyContent || 'No content available'}
          </div>
        </div>
      )
    }
  ];

  return (
    <Form {...formProps} form={form} layout="vertical">
      <Section>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Section title="Message Recipients">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="To"
                name="to"
                rules={[
                  {
                    required: true,
                    message: "At least one recipient is required",
                  },
                ]}
              >
                <Select 
                  mode="multiple"
                  placeholder="Select recipients"
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {userOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="CC"
                name="cc"
              >
                <Select 
                  mode="multiple"
                  placeholder="Select CC recipients (optional)"
                  showSearch
                  filterOption={(input, option) =>
                    option.label.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {userOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Via"
                name="via"
                rules={[
                  {
                    required: true,
                    message: "Delivery method is required",
                  },
                ]}
              >
                <Select placeholder="Select delivery method">
                  <Select.Option value="Apps">Apps</Select.Option>
                  <Select.Option value="Email">Email</Select.Option>
                  <Select.Option value="Keduanya">Keduanya</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Section>

        <Section title="Message Content">
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Subject"
                name="subject"
                rules={[
                  {
                    required: true,
                    message: "Subject is required",
                  },
                  {
                    min: 5,
                    message: "Subject must be at least 5 characters",
                  },
                ]}
              >
                <TextArea 
                  rows={2}
                  placeholder="Enter message subject"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Add Template (Optional)"
                name="template_id"
              >
                <Select 
                  placeholder="Select template to load content"
                  allowClear
                  onChange={handleTemplateSelect}
                >
                  {templateOptions.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Body"
                name="body"
                rules={[
                  {
                    required: true,
                    message: "Message body is required",
                  },
                  {
                    min: 10,
                    message: "Message body must be at least 10 characters",
                  },
                ]}
              >
                <Tabs
                  activeKey={activePreviewTab}
                  onChange={setActivePreviewTab}
                  items={previewTabs}
                  size="small"
                />
              </Form.Item>
              <div style={{ marginTop: 8, fontSize: "12px", color: "#666" }}>
                <strong>Note:</strong> This field supports HTML formatting. Use placeholders like [Name], [Date], [Project Name] for dynamic content.
                <br />
                <strong>Template Integration:</strong> Select a template above to automatically load pre-formatted content.
                <br />
                <strong>Preview:</strong> Switch to the "HTML Preview" tab to see how your content will look when rendered.
                <br />
                <strong>Future Enhancement:</strong> This will be replaced with a TinyMCE WYSIWYG editor for better content editing experience.
              </div>
            </Col>
          </Row>
        </Section>
        </Space>
      </Section>

      <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
        <Button type="text" disabled={loading} onClick={() => navigate("/messaging")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEdit ? "Update Message" : "Send Message"}
        </Button>
      </Flex>
    </Form>
  );
};
