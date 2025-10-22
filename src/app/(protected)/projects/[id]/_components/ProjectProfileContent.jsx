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
  Select,
  DatePicker,
  message
} from "antd";
import { 
  EditOutlined, 
  PlusOutlined, 
  DownOutlined 
} from "@ant-design/icons";
import { Section } from "admiral";

const { TextArea } = Input;
const { Text } = Typography;
const { Option } = Select;

const ProjectProfileContent = ({ project }) => {
  const [form] = Form.useForm();
  const [selectedAmendment, setSelectedAmendment] = useState("amendment-1");
  const [isEditing, setIsEditing] = useState(false);

  // Sample data for existing amendments
  const amendmentData = {
    "amendment-1": {
      amendment_number: 1,
      company: "PT. Antam",
      others: "",
      project_name: "Nickel Processing Plant",
      pmo_in_charge: "Ahmad Supardi",
      project_manager: "Budi Santoso",
      project_sponsor: "Direktur Operasi",
      fase_proyek: "Pelaksanaan",
      kode_inisiatif_proyek: "NIC-2025-001",
      steering_komite: "Komite Antam",
      tipe_proyek: "Infrastructure Development",
      tahun_mulai_proyek: 2025,
      tahun_target_selesai: 2027,
      main_contractor: "PT Konstruksi Indonesia",
      capacity: "100000",
      unit: "Ton/Year",
      product: "Nickel Matte",
      lokasi_proyek: "Sulawesi Tenggara",
      longitudinal: "122.5000",
      latitude: "-4.0000",
      success_criteria: "Complete project on time with 95% quality standard and within budget allocation",
      latest_modified: "2025-01-15",
    },
    "amendment-2": {
      amendment_number: 2,
      company: "PT. Antam",
      others: "",
      project_name: "Nickel Processing Plant",
      pmo_in_charge: "Ahmad Supardi",
      project_manager: "Budi Santoso", 
      project_sponsor: "Direktur Operasi",
      fase_proyek: "Pelaksanaan",
      kode_inisiatif_proyek: "NIC-2025-001",
      steering_komite: "Komite Antam",
      tipe_proyek: "Infrastructure Development",
      tahun_mulai_proyek: 2025,
      tahun_target_selesai: 2027,
      main_contractor: "PT Konstruksi Indonesia",
      capacity: "120000",
      unit: "Ton/Year",
      product: "Nickel Matte",
      lokasi_proyek: "Sulawesi Tenggara",
      longitudinal: "122.5000",
      latitude: "-4.0000", 
      success_criteria: "Complete project on time with 95% quality standard and within budget allocation with increased capacity",
      latest_modified: "2025-02-01",
    },
    "amendment-3": {
      amendment_number: 3,
      company: "",
      others: "",
      project_name: "",
      pmo_in_charge: "",
      project_manager: "",
      project_sponsor: "",
      fase_proyek: "",
      kode_inisiatif_proyek: "",
      steering_komite: "",
      tipe_proyek: "",
      tahun_mulai_proyek: "",
      tahun_target_selesai: "",
      main_contractor: "",
      capacity: "",
      unit: "",
      product: "",
      lokasi_proyek: "",
      longitudinal: "",
      latitude: "",
      success_criteria: "",
      latest_modified: new Date().toISOString().split('T')[0],
    }
  };

  const currentData = amendmentData[selectedAmendment];

  // Initialize form with current data
  React.useEffect(() => {
    form.setFieldsValue(currentData);
  }, [selectedAmendment, form]);

  const handleAmendmentChange = (key) => {
    setSelectedAmendment(key);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Saving project profile data:", values);
      message.success("Project profile data saved successfully!");
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
    setSelectedAmendment("amendment-3");
    setIsEditing(true);
    form.setFieldsValue({
      ...amendmentData["amendment-3"],
      amendment_number: 3
    });
  };

  const dropdownItems = [
    {
      key: 'amendment-1',
      label: 'Amendment 1',
    },
    {
      key: 'amendment-2', 
      label: 'Amendment 2',
    }
  ];

  const createDropdownItems = [
    {
      key: 'amendment-3',
      label: 'Amendment 3',
    }
  ];

  return (
    <Section loading={false}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header with Amendment Selection and Actions */}
        <Row justify="space-between" align="middle">
          <Col>
            <Space size="middle">
              <Text strong style={{ fontSize: "16px" }}>
                Current: {selectedAmendment === "amendment-1" ? "Amendment 1" : 
                         selectedAmendment === "amendment-2" ? "Amendment 2" : "Amendment 3"}
              </Text>
              {selectedAmendment === "amendment-2" && (
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
                  onClick: ({ key }) => handleAmendmentChange(key)
                }}
                trigger={['click']}
              >
                <Button>
                  Select Amendment <DownOutlined />
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
                  Add New Amendment <DownOutlined />
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
            disabled={!isEditing && selectedAmendment !== "amendment-3"}
          >
            <Row gutter={[24, 16]}>
              {/* Amendment Number */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Amendment Number"
                  name="amendment_number"
                  rules={[{ required: true, message: "Please input amendment number!" }]}
                >
                  <InputNumber 
                    min={1} 
                    max={10} 
                    placeholder="3"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              {/* Others */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Others"
                  name="others"
                >
                  <Input placeholder="Enter other information" />
                </Form.Item>
              </Col>

              {/* Company */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Company"
                  name="company"
                  rules={[{ required: true, message: "Please select company!" }]}
                >
                  <Select placeholder="Select company">
                    <Option value="PT. Antam">PT. Antam</Option>
                    <Option value="PT. Bukit Asam">PT. Bukit Asam</Option>
                    <Option value="PT. Inalum">PT. Inalum</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* PMO In Charge */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="PMO In Charge"
                  name="pmo_in_charge"
                  rules={[{ required: true, message: "Please select PMO in charge!" }]}
                >
                  <Select placeholder="Select PMO in charge">
                    <Option value="Ahmad Supardi">Ahmad Supardi</Option>
                    <Option value="Siti Rahayu">Siti Rahayu</Option>
                    <Option value="Budi Hartono">Budi Hartono</Option>
                    <Option value="Indira Sari">Indira Sari</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Project Name */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Project Name"
                  name="project_name"
                  rules={[{ required: true, message: "Please select project name!" }]}
                >
                  <Select placeholder="Select project name">
                    <Option value="Nickel Processing Plant">Nickel Processing Plant</Option>
                    <Option value="Coal Mining Expansion">Coal Mining Expansion</Option>
                    <Option value="Aluminum Smelter">Aluminum Smelter</Option>
                    <Option value="Green Energy Initiative">Green Energy Initiative</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Project Manager */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Project Manager"
                  name="project_manager"
                  rules={[{ required: true, message: "Please select project manager!" }]}
                >
                  <Select placeholder="Select project manager">
                    <Option value="Budi Santoso">Budi Santoso</Option>
                    <Option value="Dewi Kusuma">Dewi Kusuma</Option>
                    <Option value="Rudi Wijaya">Rudi Wijaya</Option>
                    <Option value="Maya Sari">Maya Sari</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Project Sponsor */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Project Sponsor"
                  name="project_sponsor"
                  rules={[{ required: true, message: "Please input project sponsor!" }]}
                >
                  <Input placeholder="Enter project sponsor" />
                </Form.Item>
              </Col>

              {/* Fase Proyek */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Fase Proyek"
                  name="fase_proyek"
                  rules={[{ required: true, message: "Please select project phase!" }]}
                >
                  <Select placeholder="Select project phase">
                    <Option value="Persiapan">Persiapan</Option>
                    <Option value="Pelaksanaan">Pelaksanaan</Option>
                    <Option value="InHPO">InHPO</Option>
                    <Option value="FID">FID</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Kode Inisiatif Proyek */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Kode Inisiatif Proyek"
                  name="kode_inisiatif_proyek"
                  rules={[{ required: true, message: "Please select project initiative code!" }]}
                >
                  <Select placeholder="Select project initiative code">
                    <Option value="NIC-2025-001">NIC-2025-001</Option>
                    <Option value="COAL-2025-002">COAL-2025-002</Option>
                    <Option value="ALU-2025-003">ALU-2025-003</Option>
                    <Option value="GREEN-2025-004">GREEN-2025-004</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Steering Komite */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Steering Komite"
                  name="steering_komite"
                  rules={[{ required: true, message: "Please select steering committee!" }]}
                >
                  <Select placeholder="Select steering committee">
                    <Option value="Komite Antam">Komite Antam</Option>
                    <Option value="Komite Bukit Asam">Komite Bukit Asam</Option>
                    <Option value="Komite Inalum">Komite Inalum</Option>
                  </Select>
                </Form.Item>
              </Col>

              {/* Tipe Proyek */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tipe Proyek"
                  name="tipe_proyek"
                  rules={[{ required: true, message: "Please input project type!" }]}
                >
                  <Input placeholder="Enter project type" />
                </Form.Item>
              </Col>

              {/* Tahun Mulai Proyek */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tahun Mulai Proyek"
                  name="tahun_mulai_proyek"
                  rules={[{ required: true, message: "Please input project start year!" }]}
                >
                  <InputNumber 
                    min={2020} 
                    max={2050} 
                    placeholder="2025"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              {/* Tahun Target Selesai */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tahun Target Selesai"
                  name="tahun_target_selesai"
                  rules={[{ required: true, message: "Please input project target completion year!" }]}
                >
                  <InputNumber 
                    min={2020} 
                    max={2050} 
                    placeholder="2027"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>

              {/* Main Kontraktor */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Main Kontraktor"
                  name="main_contractor"
                  rules={[{ required: true, message: "Please input main contractor!" }]}
                >
                  <Input placeholder="Enter main contractor" />
                </Form.Item>
              </Col>

              {/* Capacity */}
              <Col xs={24} md={8}>
                <Form.Item
                  label="Capacity"
                  name="capacity"
                  rules={[{ required: true, message: "Please input capacity!" }]}
                >
                  <Input placeholder="Enter capacity" />
                </Form.Item>
              </Col>

              {/* Unit */}
              <Col xs={24} md={8}>
                <Form.Item
                  label="Unit"
                  name="unit"
                  rules={[{ required: true, message: "Please input unit!" }]}
                >
                  <Input placeholder="Enter unit" />
                </Form.Item>
              </Col>

              {/* Product */}
              <Col xs={24} md={8}>
                <Form.Item
                  label="Product"
                  name="product"
                  rules={[{ required: true, message: "Please input product!" }]}
                >
                  <Input placeholder="Enter product" />
                </Form.Item>
              </Col>

              {/* Lokasi Proyek */}
              <Col xs={24}>
                <Form.Item
                  label="Lokasi Proyek"
                  name="lokasi_proyek"
                  rules={[{ required: true, message: "Please input project location!" }]}
                >
                  <Input placeholder="Enter project location" />
                </Form.Item>
              </Col>

              {/* Longitudinal */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Longitudinal"
                  name="longitudinal"
                  rules={[{ required: true, message: "Please input longitude!" }]}
                >
                  <Input placeholder="Enter longitude coordinate" />
                </Form.Item>
              </Col>

              {/* Latitude */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Latitude"
                  name="latitude"
                  rules={[{ required: true, message: "Please input latitude!" }]}
                >
                  <Input placeholder="Enter latitude coordinate" />
                </Form.Item>
              </Col>

              {/* Success Criteria */}
              <Col xs={24}>
                <Form.Item
                  label="Success Criteria"
                  name="success_criteria"
                  rules={[{ required: true, message: "Please input success criteria!" }]}
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Enter project success criteria"
                  />
                </Form.Item>
              </Col>

              {/* Latest Modified */}
              <Col xs={24} md={12}>
                <Form.Item
                  label="Latest Modified"
                  name="latest_modified"
                >
                  <Input 
                    placeholder="YYYY-MM-DD"
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Action Buttons */}
            {(isEditing || selectedAmendment === "amendment-3") && (
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

export default ProjectProfileContent;
