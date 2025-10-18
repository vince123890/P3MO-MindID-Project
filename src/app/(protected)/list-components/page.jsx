import { CopyOutlined, EyeOutlined } from "@ant-design/icons";
import { Page, Section } from "admiral";
import { Card, Col, Row, Typography, Button, Space, Tag } from "antd";
import { Link } from "react-router";

const Components = () => {
  const components = [
    {
      name: "PDFViewer",
      description: "PDF viewer component with zoom controls, download, and fullscreen capabilities (toolbar hidden)",
      category: "Media",
      path: "src/app/_components/ui/pdf-viewer",
      prompt: "Create a PDF viewer component that can display PDF files with zoom controls, download button, fullscreen mode, and error handling. Should hide the iframe toolbar for a clean viewing experience. Should accept pdfUrl prop with default to /lorem.pdf.",
      detailPath: "/list-components/pdf-preview"
    }
  ];

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here
    console.log(`${type} copied to clipboard:`, text);
  };

  return (
    <Page
      title="UI Components"
      topActions={<Typography.Text strong>Component Library Showcase</Typography.Text>}
      noStyle
    >
      <Section title="Available Components">
        <Row gutter={[16, 16]}>
          {components.map((component, index) => (
            <Col xs={8} key={index}>
              <Card
                hoverable
                actions={[
                  <Button
                    key="copy-prompt"
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={() => copyToClipboard(component.prompt, 'Prompt')}
                    size="small"
                  >
                    Copy Prompt
                  </Button>,
                  <Button
                    key="copy-path"
                    type="text"
                    icon={<CopyOutlined />}
                    onClick={() => copyToClipboard(component.path, 'Path')}
                    size="small"
                  >
                    Copy Path
                  </Button>,
                  <Link to={component.detailPath} key="detail">
                    <Button type="text" icon={<EyeOutlined />} size="small">
                      Detail
                    </Button>
                  </Link>
                ]}
              >
                <Card.Meta
                  title={
                    <Space direction="vertical" size="small" style={{ width: "100%" }}>
                      <Typography.Title level={4} style={{ margin: 0 }}>
                        {component.name}
                      </Typography.Title>
                      <Tag color="blue">{component.category}</Tag>
                    </Space>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: false }}
                      style={{ margin: 0 }}
                    >
                      {component.description}
                    </Typography.Paragraph>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Section>
    </Page>
  );
};

export default Components;
