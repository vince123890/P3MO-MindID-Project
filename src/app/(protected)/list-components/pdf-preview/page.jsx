import { CopyOutlined } from "@ant-design/icons";
import { Page, Section } from "admiral";
import { Button, Space } from "antd";
import { useNavigate } from "react-router";
import { PDFViewer } from "../../../_components/ui/pdf-viewer";

const PDFPreviewPage = () => {
  const navigate = useNavigate()
  const componentData = {
    path: "src/app/_components/ui/pdf-viewer",
    prompt: "Create a PDF viewer component that can display PDF files with zoom controls, download button, fullscreen mode, and error handling. Should hide the iframe toolbar for a clean viewing experience. Should accept pdfUrl prop with default to /lorem.pdf."
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    console.log(`${type} copied to clipboard:`, text);
  };

  return (
    <Page
      title="PDF Viewer Component"
      topActions={
        <Space>
          <Button
            icon={<CopyOutlined />}
            onClick={() => copyToClipboard(componentData.path, 'Component Path')}
          >
            Copy Component Path
          </Button>
          <Button
            icon={<CopyOutlined />}
            onClick={() => copyToClipboard(componentData.prompt, 'Prompt')}
          >
            Copy Prompt
          </Button>
        </Space>
      }
      goBack={() =>navigate(-1)}
      noStyle
    >
      <Section title="PDF Viewer Demo">
        <PDFViewer
          pdfUrl="/lorem.pdf"
          title="Sample PDF Document"
          height="700px"
        />
      </Section>
    </Page>
  );
};

export default PDFPreviewPage;
