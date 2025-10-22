import { Button, Col, Form, Input, Row, DatePicker, Select, message, Space, Flex } from "antd";
import { Section } from "admiral";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

export const IssueForm = ({ 
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
  const wbsOptions = [
    { label: "1.1.1", value: "1.1.1" },
    { label: "1.1.2", value: "1.1.2" },
    { label: "1.2.1", value: "1.2.1" },
    { label: "1.2.2", value: "1.2.2" },
    { label: "1.2.3", value: "1.2.3" },
    { label: "1.3.1", value: "1.3.1" },
    { label: "1.3.2", value: "1.3.2" },
    { label: "1.3.3", value: "1.3.3" },
    { label: "1.3.4", value: "1.3.4" },
    { label: "1.3.5", value: "1.3.5" },
    { label: "2.1.1", value: "2.1.1" },
    { label: "2.1.2", value: "2.1.2" },
    { label: "2.1.3", value: "2.1.3" },
    { label: "2.2.1", value: "2.2.1" },
    { label: "2.2.2", value: "2.2.2" },
    { label: "3.1.1", value: "3.1.1" },
    { label: "3.1.2", value: "3.1.2" },
    { label: "3.2.1", value: "3.2.1" },
    { label: "3.2.2", value: "3.2.2" },
    { label: "3.3.1", value: "3.3.1" },
    { label: "3.3.2", value: "3.3.2" },
  ];

  const kategoriIssueOptions = [
    { label: "Technical", value: "Technical" },
    { label: "Logistical", value: "Logistical" },
    { label: "Environmental", value: "Environmental" },
    { label: "Resource", value: "Resource" },
    { label: "Safety", value: "Safety" },
    { label: "Financial", value: "Financial" },
    { label: "Regulatory", value: "Regulatory" },
  ];

  const statusIssueOptions = [
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Resolved", value: "Resolved" },
    { label: "Closed", value: "Closed" },
    { label: "On Hold", value: "On Hold" },
  ];

  const picOptions = [
    { label: "John Doe", value: "John Doe" },
    { label: "Jane Smith", value: "Jane Smith" },
    { label: "Mike Johnson", value: "Mike Johnson" },
    { label: "Alice Brown", value: "Alice Brown" },
    { label: "Bob Wilson", value: "Bob Wilson" },
    { label: "Carol Davis", value: "Carol Davis" },
    { label: "David Miller", value: "David Miller" },
    { label: "Eva White", value: "Eva White" },
  ];

  const prioritasOptions = [
    { label: "Low", value: "Low" },
    { label: "Medium", value: "Medium" },
    { label: "High", value: "High" },
    { label: "Critical", value: "Critical" },
  ];

  const tipeIssueOptions = [
    { label: "Design Conflict", value: "Design Conflict" },
    { label: "Supplier Delay", value: "Supplier Delay" },
    { label: "Regulatory Compliance", value: "Regulatory Compliance" },
    { label: "Manpower Shortage", value: "Manpower Shortage" },
    { label: "Training Delay", value: "Training Delay" },
    { label: "Budget Issue", value: "Budget Issue" },
    { label: "Quality Issue", value: "Quality Issue" },
    { label: "Schedule Delay", value: "Schedule Delay" },
  ];

  const handleFinish = (values) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      message.success(isEdit ? "Issue updated successfully" : "Issue created successfully");
      navigate(-1);
    }
  };

  const getAktivitasByWbs = (wbsId) => {
    const aktivitasMap = {
      "1.1.1": "Site Preparation and Ground Clearing",
      "1.1.2": "Site Survey and Measurement",
      "1.2.1": "Equipment Specification",
      "1.2.2": "Vendor Evaluation",
      "1.2.3": "Equipment Procurement and Delivery",
      "1.3.1": "Safety Plan Development",
      "1.3.2": "Safety Training Program",
      "1.3.3": "Safety Equipment Procurement",
      "1.3.4": "Safety Certification",
      "1.3.5": "Safety Training and Certification",
      "2.1.1": "Soil Testing and Analysis",
      "2.1.2": "Foundation Work",
      "2.1.3": "Structural Framework",
      "2.2.1": "Building Construction",
      "2.2.2": "Interior Finishing",
      "3.1.1": "Electrical Design",
      "3.1.2": "Electrical Installation",
      "3.2.1": "Mechanical Installation",
      "3.2.2": "HVAC System",
      "3.3.1": "System Testing",
      "3.3.2": "Commissioning",
    };
    return aktivitasMap[wbsId] || "";
  };

  return (
    <Form 
      {...formProps} 
      form={form} 
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        ...initialData,
        tanggal_issue: initialData?.tanggal_issue ? dayjs(initialData.tanggal_issue) : dayjs(),
        deadline_resolution: initialData?.deadline_resolution ? dayjs(initialData.deadline_resolution) : null,
        tanggal_update_terkini: initialData?.tanggal_update_terkini ? dayjs(initialData.tanggal_update_terkini) : dayjs(),
        deadline: initialData?.deadline ? dayjs(initialData.deadline) : null,
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Issue Information Section */}
        <Section>
          <Section title="Issue Information">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nomor Issue/Task ID"
                  name="wbs_task_id"
                  rules={[
                    {
                      required: true,
                      message: "WBS/Task ID is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select WBS/Task ID"
                    options={wbsOptions}
                    disabled={isView}
                    onChange={(value) => {
                      form.setFieldsValue({
                        aktivitas_master_schedule: getAktivitasByWbs(value)
                      });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Aktivitas di Master Schedule"
                  name="aktivitas_master_schedule"
                >
                  <Input 
                    placeholder="Aktivitas will be auto-filled based on WBS"
                    disabled={true}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tanggal Issue"
                  name="tanggal_issue"
                  rules={[
                    {
                      required: true,
                      message: "Issue date is required",
                    },
                  ]}
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select issue date"
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Kategori Issue"
                  name="kategori_issue"
                  rules={[
                    {
                      required: true,
                      message: "Issue category is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select issue category"
                    options={kategoriIssueOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Status Issue"
                  name="status_issue"
                  rules={[
                    {
                      required: true,
                      message: "Issue status is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select issue status"
                    options={statusIssueOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Tipe Issue"
                  name="tipe_issue"
                  rules={[
                    {
                      required: true,
                      message: "Issue type is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select issue type"
                    options={tipeIssueOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Issue Details Section */}
        <Section>
          <Section title="Issue Details">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Deskripsi Issue"
                  name="deskripsi_issue"
                  rules={[
                    {
                      required: true,
                      message: "Issue description is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter issue description"
                    rows={4}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Dampak Issue"
                  name="dampak_issue"
                  rules={[
                    {
                      required: true,
                      message: "Issue impact is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter issue impact"
                    rows={3}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="PIC"
                  name="pic"
                  rules={[
                    {
                      required: true,
                      message: "PIC is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select PIC"
                    options={picOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Prioritas Issue"
                  name="prioritas_issue"
                  rules={[
                    {
                      required: true,
                      message: "Issue priority is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select issue priority"
                    options={prioritasOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Resolution Section */}
        <Section>
          <Section title="Resolution Information">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Resolution"
                  name="resolution"
                >
                  <Input.TextArea 
                    placeholder="Enter resolution details"
                    rows={4}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Deadline Resolution"
                  name="deadline_resolution"
                  rules={[
                    {
                      required: true,
                      message: "Resolution deadline is required",
                    },
                  ]}
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select resolution deadline"
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Deadline"
                  name="deadline"
                  rules={[
                    {
                      required: true,
                      message: "Deadline is required",
                    },
                  ]}
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select deadline"
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
                  label="Issue Update"
                  name="issue_update"
                  rules={[
                    {
                      required: true,
                      message: "Issue update is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter issue update"
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
                  label="Progress Update"
                  name="progress_update"
                >
                  <Input 
                    placeholder="Enter progress update"
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
              {isEdit ? "Save Changes" : "Create Issue"}
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
