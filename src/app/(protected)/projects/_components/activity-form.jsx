import { Button, Col, Form, Input, Row, DatePicker, Select, message, Space, Flex, Upload, Checkbox } from "antd";
import { Section } from "admiral";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { PlusOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";

import { useFormErrorHandling } from "@/app/_hooks/form/use-form-error-handling";

export const ActivityForm = ({ 
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
  const faseOptions = [
    { label: "Perencanaan", value: "Perencanaan" },
    { label: "Pengembangan", value: "Pengembangan" },
    { label: "In HPO", value: "In HPO" },
    { label: "FID", value: "FID" },
  ];

  const statusOptions = [
    { label: "Not Started", value: "Not Started" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "On Hold", value: "On Hold" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  const picOptions = [
    { label: "John Doe", value: "John Doe" },
    { label: "Jane Smith", value: "Jane Smith" },
    { label: "Mike Johnson", value: "Mike Johnson" },
    { label: "Alice Brown", value: "Alice Brown" },
    { label: "Bob Wilson", value: "Bob Wilson" },
    { label: "Carol Davis", value: "Carol Davis" },
  ];

  const handleFinish = (values) => {
    if (onSubmit) {
      onSubmit(values);
    } else {
      message.success(isEdit ? "Activity updated successfully" : "Activity created successfully");
      navigate(-1);
    }
  };

  // Handle file upload for photos
  const handlePhotoUpload = (file) => {
    return false; // Prevent auto upload
  };

  // Handle photo list change
  const handlePhotoListChange = ({ fileList }) => {
    form.setFieldsValue({ foto: fileList });
  };

  return (
    <Form 
      {...formProps} 
      form={form} 
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        ...initialData,
        bulan_pelaporan_start: initialData?.bulan_pelaporan_start ? dayjs(initialData.bulan_pelaporan_start) : null,
        bulan_pelaporan_end: initialData?.bulan_pelaporan_end ? dayjs(initialData.bulan_pelaporan_end) : null,
        tanggal_aktivitas: initialData?.tanggal_aktivitas ? dayjs(initialData.tanggal_aktivitas) : dayjs(),
        latest_modified: initialData?.latest_modified ? dayjs(initialData.latest_modified) : dayjs(),
        milestone: initialData?.milestone || false,
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        {/* Basic Information Section */}
        <Section>
          <Section title="Basic Information">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Task ID"
                  name="task_id"
                  rules={[
                    {
                      required: true,
                      message: "Task ID is required",
                    },
                  ]}
                >
                  <Input 
                    placeholder="TASK-001"
                    disabled={isView || isEdit}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Fase"
                  name="fase"
                  rules={[
                    {
                      required: true,
                      message: "Fase is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select fase"
                    options={faseOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Bulan Pelaporan (Start)"
                  name="bulan_pelaporan_start"
                  rules={[
                    {
                      required: true,
                      message: "Start date is required",
                    },
                  ]}
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select start date"
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Bulan Pelaporan (End)"
                  name="bulan_pelaporan_end"
                  rules={[
                    {
                      required: true,
                      message: "End date is required",
                    },
                  ]}
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select end date"
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Activity Progress Section */}
        <Section>
          <Section title="Activity Progress">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Aktivitas Bulan Sebelumnya"
                  name="aktivitas_bulan_sebelumnya"
                  rules={[
                    {
                      required: true,
                      message: "Previous month activity is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter previous month activity description"
                    rows={3}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Status Bulan Sebelumnya"
                  name="status_bulan_sebelumnya"
                  rules={[
                    {
                      required: true,
                      message: "Previous month status is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select status"
                    options={statusOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Aktivitas Bulan Berjalan"
                  name="aktivitas_bulan_berjalan"
                  rules={[
                    {
                      required: true,
                      message: "Current month activity is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter current month activity description"
                    rows={3}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Status Bulan Berjalan"
                  name="status_bulan_berjalan"
                  rules={[
                    {
                      required: true,
                      message: "Current month status is required",
                    },
                  ]}
                >
                  <Select 
                    placeholder="Select status"
                    options={statusOptions}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Activity Details Section */}
        <Section>
          <Section title="Activity Details">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="PIC Aktivitas"
                  name="pic_aktivitas"
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
                  label="Tanggal Aktivitas"
                  name="tanggal_aktivitas"
                  rules={[
                    {
                      required: true,
                      message: "Activity date is required",
                    },
                  ]}
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select activity date"
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Aktivitas"
                  name="aktivitas"
                  rules={[
                    {
                      required: true,
                      message: "Activity description is required",
                    },
                  ]}
                >
                  <Input.TextArea 
                    placeholder="Enter detailed activity description"
                    rows={4}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Milestone"
                  name="milestone"
                  valuePropName="checked"
                >
                  <Checkbox disabled={isView}>
                    Mark as milestone
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Latest Modified"
                  name="latest_modified"
                  rules={[
                    {
                      required: true,
                      message: "Latest modified date is required",
                    },
                  ]}
                >
                  <DatePicker 
                    style={{ width: "100%" }} 
                    placeholder="Select modified date"
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Photo Documentation Section */}
        <Section>
          <Section title="Photo Documentation">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Foto"
                  name="foto"
                >
                  <Upload
                    multiple
                    accept="image/*"
                    beforeUpload={handlePhotoUpload}
                    onChange={handlePhotoListChange}
                    disabled={isView}
                    fileList={form.getFieldValue('foto') || []}
                  >
                    <Button 
                      icon={<UploadOutlined />} 
                      disabled={isView}
                    >
                      Upload Photos
                    </Button>
                  </Upload>
                  <div style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
                    Multiple photos can be uploaded
                  </div>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Keterangan Foto"
                  name="keterangan_foto"
                >
                  <Input.TextArea 
                    placeholder="Enter photo description"
                    rows={3}
                    disabled={isView}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Section>
        </Section>

        {/* Remarks Section */}
        <Section>
          <Section title="Remarks">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  label="Keterangan"
                  name="keterangan"
                >
                  <Input.TextArea 
                    placeholder="Enter additional remarks"
                    rows={4}
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
              {isEdit ? "Save Changes" : "Create Activity"}
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
