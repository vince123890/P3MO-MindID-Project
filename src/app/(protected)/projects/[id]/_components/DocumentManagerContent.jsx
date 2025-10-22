import { useState } from "react";
import { Space, Button, Modal, Avatar, Typography, Divider, Input, message, Tooltip, Popover, Table } from "antd";
import { Section } from "admiral";
import { MessageOutlined, DownloadOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { documentData } from "../_data/documents";

const { Text, Title } = Typography;
const { TextArea } = Input;

const DocumentManagerContent = () => {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [newComment, setNewComment] = useState("");

  const handleCommentClick = (record) => {
    setSelectedDocument(record);
    setIsCommentModalVisible(true);
  };

  const handleDetailClick = (record) => {
    setSelectedDocument(record);
    setIsDetailModalVisible(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalVisible(false);
    setSelectedDocument(null);
    setNewComment("");
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalVisible(false);
    setSelectedDocument(null);
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      message.success("Comment submitted successfully");
      setNewComment("");
      handleCloseCommentModal();
    } else {
      message.warning("Please enter a comment");
    }
  };

  const columns = [
    {
      title: "Stage",
      dataIndex: "stage",
      key: "stage",
      width: 150,
      sorter: true,
    },
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
      sorter: true,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: 120,
      sorter: true,
    },
    {
      title: "Chapter",
      dataIndex: "chapter",
      key: "chapter",
      width: 120,
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      width: 130,
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleDetailClick(record)}
            title="View Detail"
          />
          <Button
            type="text"
            icon={<MessageOutlined />}
            onClick={() => handleCommentClick(record)}
            title="View Comments"
          />
          <Button
            type="text"
            icon={<DownloadOutlined />}
            title="Download Document"
          />
        </Space>
      ),
    },
    {
      title: "Comment",
      key: "comment",
      width: 120,
      render: (_, record) => {
        const commentsCount = record.comments?.length || 0;
        
        if (commentsCount === 0) {
          return (
            <Button
              type="link"
              onClick={() => handleCommentClick(record)}
              style={{ padding: 0 }}
            >
              0 Comments
            </Button>
          );
        }

        const previewContent = (
          <div style={{ maxWidth: 350 }}>
            <div style={{ marginBottom: 12, fontWeight: 'bold' }}>
              Recent Comments ({commentsCount})
            </div>
            {record.comments?.slice(0, 2).map((comment) => (
              <div key={comment.id} style={{ marginBottom: 12 }}>
                <Space align="start" size={8}>
                  <Avatar size={24} style={{ backgroundColor: "#1890ff" }}>
                    {comment.user?.charAt(0)}
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: 4 }}>
                      <Text strong style={{ fontSize: 12 }}>{comment.user}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {comment.date}
                      </Text>
                    </div>
                    <div style={{ 
                      backgroundColor: "#f9f9f9", 
                      padding: 8, 
                      borderRadius: 6,
                      fontSize: 12,
                      border: "1px solid #e8e8e8"
                    }}>
                      <Text style={{ fontSize: 12 }}>
                        {comment.content.length > 100 
                          ? `${comment.content.substring(0, 100)}...` 
                          : comment.content
                        }
                      </Text>
                    </div>
                  </div>
                </Space>
              </div>
            ))}
            {commentsCount > 2 && (
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <Text type="secondary" style={{ fontSize: 11 }}>
                  +{commentsCount - 2} more comments
                </Text>
              </div>
            )}
            <Divider style={{ margin: "8px 0" }} />
            <div style={{ textAlign: 'center' }}>
              <Button 
                type="primary" 
                size="small"
                onClick={() => handleCommentClick(record)}
              >
                View All Comments
              </Button>
            </div>
          </div>
        );

        return (
          <Popover
            content={previewContent}
            title={null}
            trigger="hover"
            placement="left"
            overlayStyle={{ maxWidth: 380 }}
          >
            <Button
              type="link"
              onClick={() => handleCommentClick(record)}
              style={{ padding: 0 }}
            >
              {commentsCount} Comments
            </Button>
          </Popover>
        );
      },
    },
  ];

  const filters = [
    {
      label: "Stage",
      name: "stage",
      type: "Select",
      placeholder: "Select stage",
      options: [
        { label: "Commissioning", value: "Commissioning" },
        { label: "Construction", value: "Construction" },
        { label: "Detail Engineering", value: "Detail Engineering" },
        { label: "Operate & Optimize", value: "Operate & Optimize" },
      ],
    },
    {
      label: "Type",
      name: "type",
      type: "Select",
      placeholder: "Select type",
      options: [
        { label: "Project Docs.", value: "Project Docs." },
        { label: "Contract", value: "Contract" },
        { label: "Permit", value: "Permit" },
        { label: "Commercial", value: "Commercial" },
        { label: "Technical Manual", value: "Technical Manual" },
      ],
    },
    {
      label: "Chapter",
      name: "chapter",
      type: "Select",
      placeholder: "Select chapter",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Quality Assurance", value: "Quality Assurance" },
        { label: "Procurement", value: "Procurement" },
        { label: "Installation", value: "Installation" },
        { label: "Operations", value: "Operations" },
        { label: "Project Management", value: "Project Management" },
        { label: "Risk Management", value: "Risk Management" },
        { label: "Testing", value: "Testing" },
      ],
    },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      <Section>
        <Section 
          title="Document Manager"
          actions={[
            <Button key="create" type="primary" icon={<PlusOutlined />}>
              Create New
            </Button>
          ]}
        >
          <div style={{ marginBottom: 16 }}>
            <Text>Total Documents: {documentData?.data?.items?.length || 0}</Text>
          </div>
          
          <Table
            columns={columns}
            dataSource={documentData?.data?.items || []}
            pagination={{
              current: documentData?.data?.meta?.page || 1,
              pageSize: documentData?.data?.meta?.per_page || 10,
              total: documentData?.data?.meta?.total || 0,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            rowKey="id"
            scroll={{ x: 1000 }}
          />
        </Section>
      </Section>

      {/* Comment Modal */}
      <Modal
        title={`Comment - ${selectedDocument?.document || "Document"}`}
        open={isCommentModalVisible}
        onCancel={handleCloseCommentModal}
        footer={[
          <Button key="submit" type="primary" onClick={handleSubmitComment}>
            Submit
          </Button>
        ]}
        width={600}
      >
        {selectedDocument && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* Existing Comments */}
            <div>
              {selectedDocument.comments?.map((comment, index) => (
                <div key={comment.id}>
                  <Space align="start" style={{ width: "100%", marginBottom: 16 }}>
                    <Avatar
                      src={comment.avatar}
                      size={40}
                      style={{ backgroundColor: "#1890ff" }}
                    >
                      {comment.user?.charAt(0)}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <div style={{ marginBottom: 4 }}>
                        <Text strong>{comment.user}</Text>
                        <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                          {comment.date}
                        </Text>
                      </div>
                      <div style={{ 
                        backgroundColor: "#f5f5f5", 
                        padding: 12, 
                        borderRadius: 8,
                        border: "1px solid #e8e8e8"
                      }}>
                        <Text>{comment.content}</Text>
                      </div>
                    </div>
                  </Space>
                  {index < selectedDocument.comments.length - 1 && <Divider />}
                </div>
              ))}
            </div>

            {/* New Comment Input */}
            <div>
              <Text strong style={{ display: "block", marginBottom: 8 }}>
                Add Comment:
              </Text>
              <TextArea
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Enter your comment here..."
              />
            </div>
          </Space>
        )}
      </Modal>

      {/* Detail Modal */}
      <Modal
        title={`Document Detail - ${selectedDocument?.document || "Document"}`}
        open={isDetailModalVisible}
        onCancel={handleCloseDetailModal}
        footer={[
          <Button key="close" onClick={handleCloseDetailModal}>
            Close
          </Button>
        ]}
        width={700}
      >
        {selectedDocument && (
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <div>
                  <Text strong>Document Name:</Text>
                  <br />
                  <Text style={{ fontSize: 16 }}>{selectedDocument.document}</Text>
                </div>
                
                <Divider />
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <Text strong>Stage:</Text>
                    <br />
                    <Text>{selectedDocument.stage}</Text>
                  </div>
                  <div>
                    <Text strong>Type:</Text>
                    <br />
                    <Text>{selectedDocument.type}</Text>
                  </div>
                  <div>
                    <Text strong>Chapter:</Text>
                    <br />
                    <Text>{selectedDocument.chapter}</Text>
                  </div>
                  <div>
                    <Text strong>Total Comments:</Text>
                    <br />
                    <Text>{selectedDocument.comments?.length || 0}</Text>
                  </div>
                </div>

                <Divider />

                <div>
                  <Text strong>Recent Comments:</Text>
                  <div style={{ marginTop: 12 }}>
                    {selectedDocument.comments?.slice(0, 3).map((comment, index) => (
                      <div key={comment.id} style={{ 
                        marginBottom: 12, 
                        padding: 12, 
                        backgroundColor: "#fafafa", 
                        borderRadius: 8,
                        border: "1px solid #e8e8e8"
                      }}>
                        <Space align="start">
                          <Avatar size={32} style={{ backgroundColor: "#1890ff" }}>
                            {comment.user?.charAt(0)}
                          </Avatar>
                          <div style={{ flex: 1 }}>
                            <div style={{ marginBottom: 4 }}>
                              <Text strong>{comment.user}</Text>
                              <Text type="secondary" style={{ marginLeft: 8, fontSize: 12 }}>
                                {comment.date}
                              </Text>
                            </div>
                            <Text>{comment.content}</Text>
                          </div>
                        </Space>
                      </div>
                    ))}
                    {selectedDocument.comments?.length > 3 && (
                      <div style={{ textAlign: 'center', marginTop: 8 }}>
                        <Button 
                          type="link" 
                          onClick={() => {
                            handleCloseDetailModal();
                            handleCommentClick(selectedDocument);
                          }}
                        >
                          View All {selectedDocument.comments.length} Comments
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </Space>
            </div>
          </Space>
        )}
      </Modal>
    </Space>
  );
};

export default DocumentManagerContent;
