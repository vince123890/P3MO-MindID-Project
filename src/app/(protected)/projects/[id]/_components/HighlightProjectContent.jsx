import { Row, Col, Typography, Card, Space, Button, Image } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Title, Text, Paragraph } = Typography;

const HighlightProjectContent = ({ project }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Dummy project photos data
  const projectPhotos = [
    {
      id: 1,
      url: "https://via.placeholder.com/600x400/1890ff/ffffff?text=Construction+Site+Overview",
      date: "December 15, 2024",
      description: "Overview of the main construction site showing foundation work in progress. Current workforce: 150 laborers, 25 engineers. Site capacity: 500 workers. Total project area: 25 hectares. Foundation completion rate: 85%."
    },
    {
      id: 2,
      url: "https://via.placeholder.com/600x400/28a745/ffffff?text=Equipment+Installation",
      date: "January 8, 2025",
      description: "Heavy machinery installation phase with crane operations. Equipment installed: 12 major units. Installation crew: 45 specialists. Working capacity: 24/7 operations. Area coverage: Processing plant section - 8 hectares."
    },
    {
      id: 3,
      url: "https://via.placeholder.com/600x400/dc3545/ffffff?text=Safety+Inspection",
      date: "January 20, 2025",
      description: "Safety inspection and quality control procedures. Safety team: 15 inspectors. Zero incident record maintained. Compliance rate: 100%. Area inspected: All operational zones covering 20 hectares of active construction."
    }
  ];

  // Dummy project data
  const projectData = {
    name: "Gold Mountain Mining Operation Development",
    description: "A comprehensive mining development project focused on establishing a state-of-the-art gold extraction facility. The project includes infrastructure development, processing plant construction, environmental compliance systems, and community development programs. This initiative will create sustainable employment opportunities while maintaining the highest environmental and safety standards.",
    projectProgress: "68%",
    plannedProgress: "72%",
    milestones: [
      { text: "FID Approved", completed: true },
      { text: "Construction Start", completed: true },
      { text: "Mechanical Completion", completed: false },
      { text: "First Ore Production", completed: false }
    ]
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === 0 ? projectPhotos.length - 1 : prev - 1
    );
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => 
      prev === projectPhotos.length - 1 ? 0 : prev + 1
    );
  };

  const currentPhoto = projectPhotos[currentPhotoIndex];

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Row gutter={24}>
        {/* Left Column */}
        <Col span={12}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {/* Project Name */}
            <Card size="small" style={{ textAlign: "center", minHeight: 60 }}>
              <Title level={4} style={{ margin: 0, color: "#595959" }}>
                {projectData.name}
              </Title>
            </Card>

            {/* Project Description */}
            <Card size="small" style={{ minHeight: 140 }}>
              <div style={{ padding: "8px 0" }}>
                <Title level={5} style={{ textAlign: "center", marginBottom: 16, color: "#595959" }}>
                  Project Description
                </Title>
                <Paragraph style={{ margin: 0, textAlign: "justify", lineHeight: 1.6 }}>
                  {projectData.description}
                </Paragraph>
              </div>
            </Card>

            {/* Progress Row */}
            <Row gutter={16}>
              <Col span={12}>
                <Card size="small" style={{ textAlign: "center", minHeight: 80 }}>
                  <Title level={5} style={{ margin: 0, color: "#595959" }}>
                    Project Progress
                  </Title>
                  <Title level={3} style={{ margin: "8px 0 0 0", color: "#1890ff" }}>
                    {projectData.projectProgress}
                  </Title>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" style={{ textAlign: "center", minHeight: 80 }}>
                  <Title level={5} style={{ margin: 0, color: "#595959" }}>
                    Planned Progress
                  </Title>
                  <Title level={3} style={{ margin: "8px 0 0 0", color: "#52c41a" }}>
                    {projectData.plannedProgress}
                  </Title>
                </Card>
              </Col>
            </Row>

            {/* Milestone */}
            <Card size="small" style={{ minHeight: 160 }}>
              <Title level={5} style={{ marginBottom: 16, color: "#595959" }}>
                Milestone
              </Title>
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
                {projectData.milestones.map((milestone, index) => (
                  <div key={index} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div 
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: milestone.completed ? "#52c41a" : "#d9d9d9",
                        flexShrink: 0
                      }}
                    />
                    <Text style={{ 
                      color: milestone.completed ? "#000" : "#8c8c8c",
                      fontWeight: milestone.completed ? 500 : 400
                    }}>
                      {milestone.text}
                    </Text>
                  </div>
                ))}
              </Space>
            </Card>
          </Space>
        </Col>

        {/* Right Column */}
        <Col span={12}>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            {/* Photo Section with Carousel */}
            <Card 
              size="small" 
              style={{ minHeight: 320, position: "relative" }}
              bodyStyle={{ padding: 0, position: "relative" }}
            >
              <div style={{ 
                textAlign: "center", 
                padding: "16px", 
                fontSize: "18px", 
                fontWeight: 500, 
                color: "#595959",
                borderBottom: "1px solid #f0f0f0"
              }}>
                Project Photo
              </div>
              
              <div style={{ position: "relative", height: 250 }}>
                <Image
                  src={currentPhoto.url}
                  alt="Project Photo"
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover" 
                  }}
                  preview={false}
                />
                
                {/* Date overlay */}
                <div style={{
                  position: "absolute",
                  bottom: 8,
                  right: 8,
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 4,
                  fontSize: "12px"
                }}>
                  Date of Photo: {currentPhoto.date}
                </div>

                {/* Navigation Arrows */}
                <Button
                  type="primary"
                  shape="circle"
                  icon={<LeftOutlined />}
                  size="large"
                  onClick={handlePrevPhoto}
                  style={{
                    position: "absolute",
                    left: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderColor: "transparent",
                    zIndex: 10
                  }}
                />
                
                <Button
                  type="primary"
                  shape="circle"
                  icon={<RightOutlined />}
                  size="large"
                  onClick={handleNextPhoto}
                  style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: "translateY(-50%)",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    borderColor: "transparent",
                    zIndex: 10
                  }}
                />
              </div>
            </Card>

            {/* Photo Description */}
            <Card size="small" style={{ minHeight: 140 }}>
              <div style={{ padding: "8px 0" }}>
                <Title level={5} style={{ marginBottom: 12, color: "#595959" }}>
                  Photo Description + Information about the project (Labor, Capacity, Area, etc.)
                </Title>
                <Paragraph style={{ margin: 0, textAlign: "justify", lineHeight: 1.6 }}>
                  {currentPhoto.description}
                </Paragraph>
              </div>
            </Card>

            {/* Photo indicator dots */}
            <div style={{ textAlign: "center", padding: "8px 0" }}>
              <Space size="small">
                {projectPhotos.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: index === currentPhotoIndex ? "#1890ff" : "#d9d9d9",
                      cursor: "pointer",
                      transition: "background-color 0.3s"
                    }}
                    onClick={() => setCurrentPhotoIndex(index)}
                  />
                ))}
              </Space>
            </div>
          </Space>
        </Col>
      </Row>

      {/* Latest Update Footer */}
      <div style={{ textAlign: "right", color: "#8c8c8c", fontSize: "12px" }}>
        Latest Update: {currentPhoto.date}
      </div>
    </Space>
  );
};

export default HighlightProjectContent;
