import React, { useState } from "react";
import { 
  Form, 
  Input, 
  InputNumber, 
  Button, 
  Space, 
  Row, 
  Col, 
  Dropdown, 
  Typography,
  Card,
  Upload,
  message
} from "antd";
import { 
  EditOutlined, 
  PlusOutlined, 
  DownOutlined, 
  UploadOutlined, 
  DownloadOutlined,
  EyeOutlined
} from "@ant-design/icons";
import { Section } from "admiral";

const { TextArea } = Input;
const { Text } = Typography;

const ProjectBaselineContent = ({ project }) => {
  const [form] = Form.useForm();
  const [selectedBaseline, setSelectedBaseline] = useState("baseline-3");
  const [isEditing, setIsEditing] = useState(false);

  // Sample data for existing baselines
  const baselineData = {
    "baseline-1": {
      baseline_number: 1,
      tahun_mulai: "2025",
      tahun_target: "2026",
      main_contractor: "PT Konstruksi Indonesia",
      capacity: "500",
      unit: "MW",
      produk: "Renewable Energy",
      lokasi_proyek: "Batam, Kepulauan Riau",
      success_criteria: "Project completion on time and within budget with 95% quality score",
      project_schedule_plan: "schedule_baseline_1.xlsx",
      project_cost_timeline: "cost_timeline_baseline_1.xlsx",
      reason_for_change: "Initial baseline version",
      latest_modified: "2025-01-01",
    },
    "baseline-2": {
      baseline_number: 2,
      tahun_mulai: "2025",
      tahun_target: "2026",
      main_contractor: "PT Konstruksi Indonesia",
      capacity: "600",
      unit: "MW",
      produk: "Renewable Energy",
      lokasi_proyek: "Batam, Kepulauan Riau",
      success_criteria: "Project completion on time and within budget with 95% quality score and enhanced capacity",
      project_schedule_plan: "schedule_baseline_2.xlsx",
      project_cost_timeline: "cost_timeline_baseline_2.xlsx",
      reason_for_change: "Capacity increase due to market demand",
      latest_modified: "2025-01-15",
    },
    "baseline-3": {
      baseline_number: 3,
      tahun_mulai: "",
      tahun_target: "",
      main_contractor: "",
      capacity: "",
      unit: "",
      produk: "",
      lokasi_proyek: "",
      success_criteria: "",
      project_schedule_plan: "",
      project_cost_timeline: "",
      reason_for_change: "",
      latest_modified: new Date().toISOString().split('T')[0],
    }
  };

  const currentData = baselineData[selectedBaseline];

  // Initialize form with current data
  React.useEffect(() => {
    form.setFieldsValue(currentData);
  }, [selectedBaseline, form]);

  const handleBaselineChange = (key) => {
    setSelectedBaseline(key);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Saving baseline data:", values);
      message.success("Baseline data saved successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(currentData);
    setIsEditing(false);
  };

  const handleCreate = () => {
    setSelectedBaseline("baseline-3");
    setIsEditing(true);
    form.setFieldsValue({
      ...baselineData["baseline-3"],
      baseline_number: 3
    });
  };

  const handleFileAction = (action, fileType) => {
    message.info(`${action} ${fileType}`);
  };

  const dropdownItems = [
    {
      key: 'baseline-1',
      label: 'Baseline 1',
    },
    {
      key: 'baseline-2', 
      label: 'Baseline 2',
    }
  ];

  const createDropdownItems = [
    {
      key: 'baseline-3',
      label: 'Baseline 3',
    }
  ];

  return (
    <Section loading={false}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header with Baseline Selection and Actions */}
        <Row justify="space-between" align="middle">
          <Col>
            <Space size="middle">
              <Text strong style={{ fontSize: "16px" }}>
                Current: {selectedBaseline === "baseline-1" ? "Baseline 1" : 
                         selectedBaseline === "baseline-2" ? "Baseline 2" : "Baseline 3"}
              </Text>
              {selectedBaseline === "baseline-2" && (
                <Button
                  icon={<EditOutlined />}
                  onClick={handleEdit}
                  disabled={isEditing}
                >
                  Edit
                </Button>
              )}
            </Space>
          </Col>
          <Col>
            <Space>
              <Dropdown
                menu={{
                  items: dropdownItems,
                  onClick: ({ key }) => handleBaselineChange(key)
                }}
                trigger={['click']}
              >
                <Button>
                  Select Baseline <DownOutlined />
                </Button>
              </Dropdown>
              
              <Dropdown
                menu={{
                  items: createDropdownItems,
                  onClick: ({ key }) => handleCreate()
                }}
                trigger={['click']}
              >
                <Button type="primary" icon={<PlusOutlined />}>
                  Create <DownOutlined />
                </Button>
              </Dropdown>
            </Space>
          </Col>
        </Row>

        {/* Main Form */}
        <Card>
          <Form
            form={form}
            layout="vertical"
            initialValues={currentData}
            disabled={!isEditing && selectedBaseline !== "baseline-3"}
          >
            <Row gutter={[24, 16]}>
              {/* Baseline Number */}
              <Col xs={24}>
                <Form.Item
                  label="Baseline Number"
                  name="baseline_number"
                  rules={[{ required: true, message: "Please input baseline number!" }]}
                >
                  <InputNumber 
                    min={1} 
                    max={10} 
                    placeholder="3"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              {/* Project Schedule Plan */}
              <Col xs={24}>
                <Form.Item label="Project Schedule Plan">
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px",
                    flexWrap: "wrap"
                  }}>
                    {/* File Link */}
                    <div style={{ 
                      flex: 1,
                      minWidth: "200px",
                      padding: "8px 12px", 
                      border: "1px solid #d9d9d9", 
                      borderRadius: "6px",
                      backgroundColor: "#fafafa",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      {currentData.project_schedule_plan ? (
                        <a 
                          href={`/files/${currentData.project_schedule_plan}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ 
                            color: "#1890ff", 
                            textDecoration: "underline",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleFileAction("View/Download", currentData.project_schedule_plan);
                          }}
                        >
                          <EyeOutlined />
                          {currentData.project_schedule_plan}
                        </a>
                      ) : (
                        <span style={{ color: "#999" }}>No file uploaded</span>
                      )}
                    </div>
                    
                    {/* Action Buttons - Inline */}
                    <Button
                      icon={<UploadOutlined />}
                      onClick={() => handleFileAction("Upload", "Project Schedule Plan")}
                    >
                      Upload
                    </Button>
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={() => handleFileAction("Download Template", "Project Schedule Plan")}
                    >
                      Download
                    </Button>
                  </div>
                </Form.Item>
              </Col>

              {/* Project Cost Timeline Plan */}
              <Col xs={24}>
                <Form.Item label="Project Cost Timeline Plan">
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px",
                    flexWrap: "wrap"
                  }}>
                    {/* File Link */}
                    <div style={{ 
                      flex: 1,
                      minWidth: "200px",
                      padding: "8px 12px", 
                      border: "1px solid #d9d9d9", 
                      borderRadius: "6px",
                      backgroundColor: "#fafafa",
                      display: "flex",
                      alignItems: "center"
                    }}>
                      {currentData.project_cost_timeline ? (
                        <a 
                          href={`/files/${currentData.project_cost_timeline}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ 
                            color: "#1890ff", 
                            textDecoration: "underline",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleFileAction("View/Download", currentData.project_cost_timeline);
                          }}
                        >
                          <EyeOutlined />
                          {currentData.project_cost_timeline}
                        </a>
                      ) : (
                        <span style={{ color: "#999" }}>No file uploaded</span>
                      )}
                    </div>
                    
                    {/* Action Buttons - Inline */}
                    <Button
                      icon={<UploadOutlined />}
                      onClick={() => handleFileAction("Upload", "Project Cost Timeline Plan")}
                    >
                      Upload
                    </Button>
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={() => handleFileAction("Download Template", "Project Cost Timeline Plan")}
                    >
                      Download
                    </Button>
                  </div>
                </Form.Item>
              </Col>

              {/* Reason for Change */}
              <Col xs={24}>
                <Form.Item
                  label="Reason for Change"
                  name="reason_for_change"
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Enter reason for this baseline change"
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Action Buttons */}
            {(isEditing || selectedBaseline === "baseline-3") && (
              <Row justify="end" style={{ marginTop: "24px" }}>
                <Space>
                  <Button onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button type="primary" onClick={handleSave}>
                    Save
                  </Button>
                </Space>
              </Row>
            )}
          </Form>
        </Card>
      </Space>
    </Section>
  );
};

export default ProjectBaselineContent;
