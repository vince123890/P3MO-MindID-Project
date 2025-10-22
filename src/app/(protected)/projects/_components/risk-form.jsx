import { Button, Col, Form, Input, Row, DatePicker, Select, message, Space, Flex } from "antd";
import { Section } from "admiral";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

export const RiskForm = ({ 
  formProps, 
  error, 
  loading, 
  isEdit = false, 
  isView = false,
  initialData = null,
  onSubmit 
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useFormErrorHandling(error, ({ key, message }) =>
    form.setFields([{ name: key, errors: [message] }]),
  );

  // Form field options
  const kategoriResikoOptions = [
    { label: "Technical", value: "Technical" },
    { label: "Financial", value: "Financial" },
    { label: "Operational", value: "Operational" },
    { label: "Environmental", value: "Environmental" },
    { label: "Safety", value: "Safety" },
    { label: "Regulatory", value: "Regulatory" },
    { label: "Strategic", value: "Strategic" },
    { label: "Reputational", value: "Reputational" },
  ];

  const probabilitasResikoOptions = [
    { label: "Very Low", value: "Very Low" },
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Very High", value: "Very High" },
  ];

  const tingkatDampakOptions = [
    { label: "Very Low", value: "Very Low" },
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Critical", value: "Critical" },
  ];

  const prioritasResikoOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Critical", value: "Critical" },
  ];

  const statusMitigasiOptions = [
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Resolved", value: "Resolved" },
    { label: "Closed", value: "Closed" },
    { label: "On Hold", value: "On Hold" },
  ];

  const handleFinish = (values) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      message.success(isEdit ? "Risk updated successfully" : "Risk created successfully");
      navigate(-1);
    }
  };

  // Calculate risk score based on probability and impact (1-10 scale)
  const calculateRiskScore = (probability, impact) => {
    const probabilityMap = {
      "Very Low": 1,
      "Low": 2,
      "Medium": 3,
      "High": 4,
      "Very High": 5,
    };
    
    const impactMap = {
      "Very Low": 1,
      "Low": 2,
      "Medium": 3,
      "High": 4,
      "Critical": 5,
    };
    
    const probScore = probabilityMap[probability] || 1;
    const impactScore = impactMap[impact] || 1;
    
    // Convert to 1-10 scale (average of probability and impact, scaled)
    const rawScore = (probScore + impactScore) / 2;
    const scaledScore = Math.round(rawScore * 2); // Scale to 1-10
    
    return Math.min(Math.max(scaledScore, 1), 10); // Ensure it's within 1-10
  };

  // Update risk score when probability or impact changes
  const handleFieldChange = (changedFields) => {
    const formValues = form.getFieldsValue();
    const updatedValues = { ...formValues, ...changedFields };
    
    if (changedFields.probabilitas_resiko || changedFields.tingkat_dampak) {
      const riskScore = calculateRiskScore(
        updatedValues.probabilitas_resiko,
        updatedValues.tingkat_dampak
      );
      
      // Determine priority based on risk score (1-10 scale)
      let priority = "Low";
      if (riskScore >= 8) priority = "Critical";
      else if (riskScore >= 6) priority = "High";
      else if (riskScore >= 4) priority = "Medium";
      
      form.setFieldsValue({
        skor_resiko: riskScore,
        prioritas_resiko: priority,
      });
    }
  };

  return (
    <Form 
      {...formProps} 
      form={form} 
      layout="vertical"
      onFinish={handleFinish}
      onFieldsChange={handleFieldChange}
      initialValues={{
        ...initialData,
        tanggal_identifikasi_resiko: initialData?.tanggal_identifikasi_resiko ? dayjs(initialData.tanggal_identifikasi_resiko) : dayjs(),
        deadline_mitigasi: initialData?.deadline_mitigasi ? dayjs(initialData.deadline_mitigasi) : null,
        tanggal_update_terkini: initialData?.tanggal_update_terkini ? dayjs(initialData.tanggal_update_terkini) : dayjs(),
        skor_resiko: initialData?.skor_resiko || 1,
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Risk Identification Section */}
        <Section>
          <Section title="Risk Identification">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nomor Resiko"
                  name="nomor_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk number is required",
                    },
                  ]}
                >
                  <Input 
                    placeholder="RSK-001"
                    disabled={isView || isEdit}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tanggal Identifikasi Resiko"
                  name="tanggal_identifikasi_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk identification date is required",
                    },
                  ]}
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select identification date"
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Kategori Resiko"
                  name="kategori_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk category is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select risk category"
                    options={kategoriResikoOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Probabilitas Resiko"
                  name="probabilitas_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk probability is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select risk probability"
                    options={probabilitasResikoOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Risk Description Section */}
        <Section>
          <Section title="Risk Description">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Deskripsi Resiko"
                  name="deskripsi_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk description is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter detailed risk description"
                    rows={4}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Dampak Resiko"
                  name="dampak_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk impact is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter potential impact of the risk"
                    rows={3}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tingkat Dampak"
                  name="tingkat_dampak"
                  rules={[
                    {
                      required: true,
                      message: "Impact level is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select impact level"
                    options={tingkatDampakOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Skor Resiko"
                  name="skor_resiko"
                >
                  <Input 
                    placeholder="Risk score (calculated automatically)"
                    disabled={true}
                    addonAfter="/10"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Prioritas Resiko"
                  name="prioritas_resiko"
                  rules={[
                    {
                      required: true,
                      message: "Risk priority is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select risk priority"
                    options={prioritasResikoOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Mitigation Plan Section */}
        <Section>
          <Section title="Mitigation Plan">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Rencana Mitigasi"
                  name="rencana_mitigasi"
                  rules={[
                    {
                      required: true,
                      message: "Mitigation plan is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter detailed mitigation plan"
                    rows={4}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Status Mitigasi"
                  name="status_mitigasi"
                  rules={[
                    {
                      required: true,
                      message: "Mitigation status is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select mitigation status"
                    options={statusMitigasiOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Deadline Mitigasi"
                  name="deadline_mitigasi"
                  rules={[
                    {
                      required: true,
                      message: "Mitigation deadline is required",
                    },
                  ]}
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select mitigation deadline"
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Update Information Section */}
        <Section>
          <Section title="Update Information">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Update Mitigasi"
                  name="update_mitigasi"
                  rules={[
                    {
                      required: true,
                      message: "Mitigation update is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter latest mitigation update"
                    rows={3}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tanggal Update Terkini"
                  name="tanggal_update_terkini"
                  rules={[
                    {
                      required: true,
                      message: "Last update date is required",
                    },
                  ]}
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select last update date"
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="PIC"
                  name="pic"
                >
                  <Input 
                    placeholder="Enter person in charge"
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Keterangan"
                  name="keterangan"
                >
                  <Input.TextArea 
                    placeholder="Enter additional remarks"
                    rows={3}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Action Buttons */}
        {!isView && (
          <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
            <Button 
              type="text" 
              disabled={loading} 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
            >
              {isEdit ? "Save Changes" : "Create Risk"}
            </Button>
          </Flex>
        )}

        {/* View Mode Close Button */}
        {isView && (
          <Flex justify="flex-end" gap={16} style={{ marginTop: 24 }}>
            <Button 
              type="primary" 
              onClick={() => navigate(-1)}
            >
              Close
            </Button>
          </Flex>
        )}
      </Space>
    </Form>
  );
};
