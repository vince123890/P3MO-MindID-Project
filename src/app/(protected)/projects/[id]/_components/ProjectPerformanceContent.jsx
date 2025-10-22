import React, { useState } from "react";
import {
  Form,
  Button,
  Space,
  Row,
  Col,
  Typography,
  Card,
  message,
  Upload,
  Table,
  Modal,
  Input,
  DatePicker,
  Image,
  Popconfirm,
  Tag
} from "antd";
import {
  EditOutlined,
  UploadOutlined,
  DownloadOutlined,
  EyeOutlined,
  PlusOutlined,
  DeleteOutlined,
  CameraOutlined
} from "@ant-design/icons";
import { Section } from "admiral";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Text } = Typography;

const ProjectPerformanceContent = ({ project }) => {
  const [form] = Form.useForm();
  const [photoForm] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);
  const [isPhotoDetailModalVisible, setIsPhotoDetailModalVisible] = useState(false);
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [viewingPhoto, setViewingPhoto] = useState(null);
  const [photos, setPhotos] = useState([
    {
      id: 1,
      foto_proyek: "project_photo_1.jpg",
      tanggal_proyek: "2025-01-15",
      keterangan_foto: "Progress pembangunan pondasi utama gedung",
      preview_url: "https://via.placeholder.com/300x200/1890ff/ffffff?text=Project+Photo+1"
    },
    {
      id: 2,
      foto_proyek: "project_photo_2.jpg",
      tanggal_proyek: "2025-01-20",
      keterangan_foto: "Instalasi struktur baja lantai 2",
      preview_url: "https://via.placeholder.com/300x200/52c41a/ffffff?text=Project+Photo+2"
    }
  ]);

  // Sample performance data
  const [performanceData, setPerformanceData] = useState({
    project_schedule_actual: "schedule_actual_2025.xlsx",
    project_cost_actual: "cost_actual_2025.xlsx",
    last_updated: "2025-01-20"
  });

  React.useEffect(() => {
    form.setFieldsValue(performanceData);
  }, [form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      console.log("Saving performance data:", values);
      setPerformanceData(values);
      message.success("Performance data saved successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue(performanceData);
    setIsEditing(false);
  };

  const handleFileAction = (action, fileType) => {
    message.info(`${action} ${fileType}`);
  };

  // Photo Management Functions
  const handleAddPhoto = () => {
    setEditingPhoto(null);
    photoForm.resetFields();
    setIsPhotoModalVisible(true);
  };

  const handleEditPhoto = (photo) => {
    setEditingPhoto(photo);
    photoForm.setFieldsValue({
      foto_proyek: photo.foto_proyek,
      tanggal_proyek: dayjs(photo.tanggal_proyek),
      keterangan_foto: photo.keterangan_foto
    });
    setIsPhotoModalVisible(true);
  };

  const handleViewPhoto = (photo) => {
    setViewingPhoto(photo);
    setIsPhotoDetailModalVisible(true);
  };

  const handleDeletePhoto = (photoId) => {
    setPhotos(photos.filter(photo => photo.id !== photoId));
    message.success("Photo deleted successfully!");
  };

  const handlePhotoModalSave = async () => {
    try {
      const values = await photoForm.validateFields();
      
      if (editingPhoto) {
        // Update existing photo
        setPhotos(photos.map(photo => 
          photo.id === editingPhoto.id 
            ? {
                ...photo,
                foto_proyek: values.foto_proyek,
                tanggal_proyek: values.tanggal_proyek.format('YYYY-MM-DD'),
                keterangan_foto: values.keterangan_foto
              }
            : photo
        ));
        message.success("Photo updated successfully!");
      } else {
        // Add new photo
        const newPhoto = {
          id: Math.max(...photos.map(p => p.id), 0) + 1,
          foto_proyek: values.foto_proyek,
          tanggal_proyek: values.tanggal_proyek.format('YYYY-MM-DD'),
          keterangan_foto: values.keterangan_foto,
          preview_url: `https://via.placeholder.com/300x200/1890ff/ffffff?text=Project+Photo+${Math.max(...photos.map(p => p.id), 0) + 1}`
        };
        setPhotos([...photos, newPhoto]);
        message.success("Photo added successfully!");
      }
      
      setIsPhotoModalVisible(false);
      photoForm.resetFields();
      setEditingPhoto(null);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handlePhotoModalCancel = () => {
    setIsPhotoModalVisible(false);
    photoForm.resetFields();
    setEditingPhoto(null);
  };

  // Photo table columns
  const photoColumns = [
    {
      title: "Foto Proyek",
      dataIndex: "foto_proyek",
      key: "foto_proyek",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image
            width={40}
            height={40}
            src={record.preview_url}
            style={{ borderRadius: "4px", objectFit: "cover" }}
          />
          <Text>{text}</Text>
        </div>
      ),
    },
    {
      title: "Tanggal Proyek",
      dataIndex: "tanggal_proyek",
      key: "tanggal_proyek",
      render: (text) => dayjs(text).format('DD/MM/YYYY'),
    },
    {
      title: "Keterangan Foto",
      dataIndex: "keterangan_foto",
      key: "keterangan_foto",
      render: (text) => (
        <Text ellipsis={{ tooltip: text }} style={{ maxWidth: 200 }}>
          {text}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewPhoto(record)}
            size="small"
          >
            View
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditPhoto(record)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this photo?"
            onConfirm={() => handleDeletePhoto(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Section loading={false}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Header with Edit Button */}
        <Row justify="space-between" align="middle">
          <Col>
            <Text strong style={{ fontSize: "16px" }}>
              Project Performance Tracking
            </Text>
          </Col>
          <Col>
            <Button
              icon={<EditOutlined />}
              onClick={handleEdit}
              disabled={isEditing}
            >
              Edit
            </Button>
          </Col>
        </Row>

        {/* Performance Data Form */}
        <Card title="Performance Data">
          <Form
            form={form}
            layout="vertical"
            initialValues={performanceData}
            disabled={!isEditing}
          >
            <Row gutter={[24, 16]}>
              {/* Project Schedule Actual */}
              <Col xs={24}>
                <Form.Item label="Project Schedule Actual">
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
                      {performanceData.project_schedule_actual ? (
                        <a 
                          href={`/files/${performanceData.project_schedule_actual}`}
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
                            handleFileAction("View/Download", performanceData.project_schedule_actual);
                          }}
                        >
                          <EyeOutlined />
                          {performanceData.project_schedule_actual}
                        </a>
                      ) : (
                        <span style={{ color: "#999" }}>No file uploaded</span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <Button
                      icon={<UploadOutlined />}
                      onClick={() => handleFileAction("Upload", "Project Schedule Actual")}
                      disabled={!isEditing}
                    >
                      Upload
                    </Button>
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={() => handleFileAction("Download Template", "Project Schedule Actual")}
                    >
                      Download
                    </Button>
                  </div>
                </Form.Item>
              </Col>

              {/* Project Cost Actual */}
              <Col xs={24}>
                <Form.Item label="Project Cost Actual">
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
                      {performanceData.project_cost_actual ? (
                        <a 
                          href={`/files/${performanceData.project_cost_actual}`}
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
                            handleFileAction("View/Download", performanceData.project_cost_actual);
                          }}
                        >
                          <EyeOutlined />
                          {performanceData.project_cost_actual}
                        </a>
                      ) : (
                        <span style={{ color: "#999" }}>No file uploaded</span>
                      )}
                    </div>
                    
                    {/* Action Buttons */}
                    <Button
                      icon={<UploadOutlined />}
                      onClick={() => handleFileAction("Upload", "Project Cost Actual")}
                      disabled={!isEditing}
                    >
                      Upload
                    </Button>
                    <Button
                      icon={<DownloadOutlined />}
                      onClick={() => handleFileAction("Download Template", "Project Cost Actual")}
                    >
                      Download
                    </Button>
                  </div>
                </Form.Item>
              </Col>
            </Row>

            {/* Action Buttons */}
            {isEditing && (
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

        {/* Project Photos Section */}
        <Card
          title="Project Photos"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddPhoto}
            >
              Add Photo
            </Button>
          }
        >
          <Table
            columns={photoColumns}
            dataSource={photos}
            rowKey="id"
            pagination={{
              pageSize: 5,
              showSizeChanger: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Card>

        {/* Add/Edit Photo Modal */}
        <Modal
          title={editingPhoto ? "Edit Photo" : "Add Photo"}
          open={isPhotoModalVisible}
          onOk={handlePhotoModalSave}
          onCancel={handlePhotoModalCancel}
          width={600}
        >
          <Form
            form={photoForm}
            layout="vertical"
          >
            <Form.Item
              label="Foto Proyek"
              name="foto_proyek"
              rules={[{ required: true, message: "Please input photo name!" }]}
            >
              <Input 
                placeholder="Enter photo filename"
                addonBefore={<CameraOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Tanggal Proyek"
              name="tanggal_proyek"
              rules={[{ required: true, message: "Please select project date!" }]}
            >
              <DatePicker 
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                placeholder="Select project date"
              />
            </Form.Item>

            <Form.Item
              label="Keterangan Foto"
              name="keterangan_foto"
              rules={[{ required: true, message: "Please input photo description!" }]}
            >
              <TextArea 
                rows={4}
                placeholder="Enter photo description"
              />
            </Form.Item>
          </Form>
        </Modal>

        {/* Photo Detail Modal */}
        <Modal
          title="Photo Detail"
          open={isPhotoDetailModalVisible}
          onCancel={() => setIsPhotoDetailModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setIsPhotoDetailModalVisible(false)}>
              Close
            </Button>
          ]}
          width={700}
        >
          {viewingPhoto && (
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <Image
                  src={viewingPhoto.preview_url}
                  style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "8px" }}
                />
              </div>
              
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Text strong>Filename: </Text>
                  <Tag color="blue">{viewingPhoto.foto_proyek}</Tag>
                </Col>
                <Col span={24}>
                  <Text strong>Project Date: </Text>
                  <Tag color="green">{dayjs(viewingPhoto.tanggal_proyek).format('DD/MM/YYYY')}</Tag>
                </Col>
                <Col span={24}>
                  <Text strong>Description:</Text>
                  <div style={{ 
                    marginTop: "8px", 
                    padding: "12px", 
                    backgroundColor: "#fafafa", 
                    borderRadius: "6px" 
                  }}>
                    {viewingPhoto.keterangan_foto}
                  </div>
                </Col>
              </Row>
            </Space>
          )}
        </Modal>
      </Space>
    </Section>
  );
};

export default ProjectPerformanceContent;
