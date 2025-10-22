import { useState } from "react";
import { Form, Select, DatePicker, Button, message, Space, Card, Typography } from "antd";
import { FileTextOutlined, DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Section } from "admiral";

import { allProjects } from "../../projects/_data";
import { generateReportPreview, getMonthName } from "../_data";
import { PDFViewer } from "@/app/_components/ui/pdf-viewer";

const { RangePicker } = DatePicker;
const { Title, Text } = Typography;

export default function ReportForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const projectOptions = allProjects.data.items.map(project => ({
    value: project.id,
    label: `${project.project_code} - ${project.business_initiative_name}`,
    project: project
  }));

  const handleGenerateReport = async (values) => {
    setLoading(true);
    
    try {
      const { project_id, date_range } = values;
      const [startDate, endDate] = date_range;
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const reportData = generateReportPreview(
        project_id,
        startDate.format('YYYY-MM-DD'),
        endDate.format('YYYY-MM-DD')
      );
      
      setGeneratedReport(reportData.data);
      setShowPreview(true);
      
      message.success('Laporan berhasil di-generate!');
    } catch (error) {
      message.error('Gagal generate laporan');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    if (generatedReport) {
      const startDate = new Date(generatedReport.period_start);
      const endDate = new Date(generatedReport.period_end);
      const monthName = getMonthName(startDate.getMonth() + 1);
      const year = startDate.getFullYear();
      
      // Simulate print action
      message.success(`Laporan periode ${monthName} ${year} berhasil dicetak`);
      
      // In real implementation, this would trigger actual print
      if (generatedReport.file_path) {
        const printWindow = window.open(generatedReport.file_path);
        if (printWindow) {
          printWindow.addEventListener("load", () => {
            printWindow.print();
          });
        }
      }
    }
  };

  const handleDownload = () => {
    if (generatedReport && generatedReport.file_path) {
      const link = document.createElement("a");
      link.href = generatedReport.file_path;
      link.download = `${generatedReport.file_name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      message.success('Laporan berhasil didownload!');
    }
  };

  const resetForm = () => {
    form.resetFields();
    setGeneratedReport(null);
    setShowPreview(false);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Section title="Generate Laporan Bulanan" loading={false}>
        <Card>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleGenerateReport}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="Pilih Project"
              name="project_id"
              rules={[
                { required: true, message: "Silakan pilih project!" }
              ]}
            >
              <Select
                placeholder="Pilih project yang akan dilaporkan"
                showSearch
                optionFilterProp="label"
                options={projectOptions}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Periode Laporan"
              name="date_range"
              rules={[
                { required: true, message: "Silakan pilih periode laporan!" }
              ]}
            >
              <RangePicker
                style={{ width: "100%" }}
                size="large"
                format="DD/MM/YYYY"
                placeholder={["Tanggal Mulai", "Tanggal Selesai"]}
              />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<FileTextOutlined />}
                  loading={loading}
                  size="large"
                >
                  {loading ? "Generating..." : "Generate Laporan"}
                </Button>
                
                <Button
                  onClick={resetForm}
                  size="large"
                >
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </Section>

      {showPreview && generatedReport && (
        <Section title="Preview Laporan" loading={false}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Card size="small">
              <Space direction="vertical" size="small">
                <Title level={4} style={{ margin: 0 }}>
                  {generatedReport.file_name}
                </Title>
                <Text type="secondary">
                  Periode: {dayjs(generatedReport.period_start).format('DD/MM/YYYY')} - {dayjs(generatedReport.period_end).format('DD/MM/YYYY')}
                </Text>
                <Text type="secondary">
                  Generated: {dayjs(generatedReport.generated_at).format('DD/MM/YYYY HH:mm')}
                </Text>
              </Space>
              
              <Space style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  icon={<PrinterOutlined />}
                  onClick={handlePrint}
                >
                  Print Laporan
                </Button>
                
                <Button
                  icon={<DownloadOutlined />}
                  onClick={handleDownload}
                >
                  Download PDF
                </Button>
              </Space>
            </Card>

            <Card>
              <PDFViewer
                filePath={generatedReport.file_path}
                fileName={generatedReport.file_name}
                height="700px"
                width="100%"
              />
            </Card>
          </Space>
        </Section>
      )}
    </Space>
  );
}
