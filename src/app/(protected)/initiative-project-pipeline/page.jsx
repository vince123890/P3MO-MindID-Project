import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Tag, Space, Spin, Tooltip, Progress, Alert, Divider } from "antd";
import { InfoCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Section } from "admiral";
import { getInitiativeProjectPipelineData } from "./_data";

const { Title, Text } = Typography;

// Mining business color scheme - consistent with brand guidelines
const brandColors = ["#19315a", "#c41e3a", "#2a4a7a", "#21426e", "#d14458", "#0f1e3a"];

// Mining commodity colors
const commodityColors = {
  "Gold": "#FFD700",
  "Copper": "#CD7F32", 
  "Nickel": "#c41e3a",
  "Coal": "#2a4a7a",
  "Tin": "#21426e",
  "Bauxite": "#d14458",
  "Aluminum": "#0f1e3a"
};

// Pipeline Stage Component
const PipelineStage = ({ stage, stageInfo }) => {
  const getProjectSize = (size) => {
    switch (size) {
      case "small":
        return { width: 35, height: 35 };
      case "medium":
        return { width: 50, height: 50 };
      case "large":
        return { width: 65, height: 65 };
      default:
        return { width: 45, height: 45 };
    }
  };

  const getStageWidth = () => {
    return "13.5%";
  };

  const stageHeight = Math.max(160, stage.projects.length * 20 + 120);

  // Get stage color from brand colors based on stage index
  const getStageColor = (stageId) => {
    const stageIndex = ["in_hpo", "fid", "detail_engineering", "construction", "commissioning", "operate_optimize", "ore_processing"].indexOf(stageId);
    return brandColors[stageIndex % brandColors.length];
  };

  const stageColor = getStageColor(stage.id);

  return (
    <div
      style={{
        position: "relative",
        background: `linear-gradient(135deg, ${stageColor} 0%, ${stageColor}cc 100%)`,
        borderRadius: "12px",
        padding: "16px",
        minHeight: stageHeight,
        width: getStageWidth(),
        minWidth: "140px",
        margin: "0 4px",
        flex: "1 1 auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
        border: "2px solid rgba(255,255,255,0.2)",
      }}
    >
      {/* Stage Header */}
      <div
        style={{
          width: "100%",
          textAlign: "center",
          marginBottom: "12px",
          padding: "8px",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "8px",
          backdropFilter: "blur(10px)",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: "13px", display: "block" }}>
          {stage.name}
        </Text>
        <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px", display: "block", marginTop: "2px" }}>
          {stage.projects.length} project{stage.projects.length !== 1 ? 's' : ''}
        </Text>
      </div>

      {/* Projects */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          width: "100%",
          flex: 1,
        }}
      >
        {stage.projects.map((project, index) => {
          const size = getProjectSize(project.size);
          const projectColor = commodityColors[project.type] || brandColors[index % brandColors.length];
          
          return (
            <Tooltip
              key={project.id}
              title={
                <div style={{ 
                  background: 'white', 
                  padding: '16px', 
                  borderRadius: '8px', 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  maxWidth: '320px'
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ 
                      color: projectColor, 
                      fontWeight: 'bold', 
                      fontSize: '14px',
                      marginBottom: '4px'
                    }}>
                      {project.company}
                    </div>
                    <div style={{ 
                      fontWeight: 'bold', 
                      fontSize: '16px',
                      color: '#333'
                    }}>
                      {project.name}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Budget:</div>
                      <div style={{ 
                        fontWeight: 'bold', 
                        color: projectColor, 
                        fontSize: '14px' 
                      }}>
                        ${project.budget}M USD
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#666' }}>Commodity:</div>
                      <div style={{ 
                        background: projectColor,
                        color: 'white',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        display: 'inline-block',
                        marginTop: '2px'
                      }}>
                        {project.type}
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>Progress:</div>
                    <div style={{ 
                      width: '100%', 
                      height: '6px', 
                      background: '#f0f0f0', 
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${project.progress}%`,
                        height: '100%',
                        background: projectColor,
                        borderRadius: '3px'
                      }} />
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: projectColor, 
                      fontWeight: 'bold',
                      marginTop: '2px'
                    }}>
                      {project.progress}%
                    </div>
                  </div>
                  <div style={{ 
                    borderTop: '1px solid #f0f0f0', 
                    paddingTop: '8px',
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}>
                    <span style={{ 
                      background: 'rgba(0,0,0,0.05)', 
                      border: 'none', 
                      color: '#666',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px'
                    }}>
                      Stage: {stage.name}
                    </span>
                    <span style={{ 
                      background: stageColor, 
                      color: 'white', 
                      border: 'none',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 'bold'
                    }}>
                      {typeof project.priority === 'string' ? project.priority : `Priority ${project.priority}`}
                    </span>
                  </div>
                </div>
              }
              placement="top"
              overlayStyle={{ zIndex: 1000 }}
              mouseEnterDelay={0.3}
              mouseLeaveDelay={0.1}
            >
              <div
                style={{
                  width: size.width,
                  height: size.height,
                  backgroundColor: projectColor,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: typeof project.priority === "string" ? "9px" : "14px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  border: "3px solid rgba(255,255,255,0.4)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textAlign: "center",
                  padding: "2px",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.15)";
                  e.target.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
                }}
              >
                {typeof project.priority === "string" ? (
                  <span style={{ fontSize: "8px", lineHeight: "1", wordBreak: "break-word" }}>
                    {project.priority.replace(/\s+/g, '\n')}
                  </span>
                ) : (
                  project.priority
                )}
              </div>
            </Tooltip>
          );
        })}
      </div>

      {/* Stage Description Info Icon */}
      <Tooltip 
        title={stageInfo?.description} 
        placement="bottom"
        overlayStyle={{ zIndex: 999, maxWidth: '300px' }}
        mouseEnterDelay={0.5}
        mouseLeaveDelay={0.1}
      >
        <InfoCircleOutlined 
          style={{ 
            position: "absolute", 
            top: "8px", 
            right: "8px", 
            color: "rgba(255,255,255,0.8)",
            fontSize: "16px",
            cursor: "pointer",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            padding: "4px",
            backdropFilter: "blur(5px)"
          }} 
        />
      </Tooltip>
    </div>
  );
};

// Phase Card Component
const PhaseCard = ({ phase, phaseKey }) => {
  const getTypeColor = (type) => {
    return commodityColors[type] || brandColors[0];
  };

  const getPhaseGradient = (phaseKey) => {
    switch (phaseKey) {
      case "initiation":
        return `linear-gradient(135deg, ${brandColors[0]} 0%, ${brandColors[1]} 100%)`;
      case "planning":
        return `linear-gradient(135deg, ${brandColors[1]} 0%, ${brandColors[2]} 100%)`;
      case "execution":
        return `linear-gradient(135deg, ${brandColors[2]} 0%, ${brandColors[3]} 100%)`;
      default:
        return `linear-gradient(135deg, ${brandColors[0]} 0%, ${brandColors[1]} 100%)`;
    }
  };

  return (
    <div
      style={{
        background: getPhaseGradient(phaseKey),
        borderRadius: "12px",
        padding: "20px",
        color: "white",
        minHeight: "240px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
        position: "relative",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "120px",
          height: "120px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "50%",
          transform: "translate(40px, -40px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "90px",
          height: "90px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
          transform: "translate(-25px, 25px)",
        }}
      />

      {/* Phase Title */}
      <Title level={4} style={{ color: "white", marginBottom: "16px", fontWeight: "600", position: "relative", zIndex: 1 }}>
        {phase.title}
      </Title>

      {/* Projects by Type */}
      <Space direction="vertical" size="middle" style={{ width: "100%", position: "relative", zIndex: 1 }}>
        {Object.entries(
          phase.projects.reduce((acc, project) => {
            if (!acc[project.type]) acc[project.type] = [];
            acc[project.type].push(project);
            return acc;
          }, {})
        ).map(([type, projects]) => (
          <div key={type}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "10px",
                padding: "10px 14px",
                background: "rgba(255,255,255,0.18)",
                borderRadius: "24px",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: getTypeColor(type),
                  borderRadius: "50%",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                  border: "2px solid rgba(255,255,255,0.4)",
                }}
              />
              <Text strong style={{ color: "white", fontSize: "15px" }}>
                {type} Mining
              </Text>
              <Tag
                style={{
                  marginLeft: "auto",
                  background: "rgba(255,255,255,0.25)",
                  color: "white",
                  border: "none",
                  borderRadius: "14px",
                  fontWeight: "500",
                }}
              >
                {projects.length} {projects.length === 1 ? 'project' : 'projects'}
              </Tag>
            </div>
            <div style={{ paddingLeft: "20px" }}>
              {projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    padding: "8px 14px",
                    background: "rgba(255,255,255,0.12)",
                    borderRadius: "10px",
                    marginBottom: "6px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <Text style={{ color: "rgba(255,255,255,0.95)", fontSize: "14px", fontWeight: "500" }}>
                    {project.name}
                  </Text>
                  <Tag
                    style={{
                      background: getTypeColor(project.type),
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "12px",
                      padding: "4px 8px",
                      fontWeight: "600",
                    }}
                  >
                    #{project.priority}
                  </Tag>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Space>
    </div>
  );
};

// Mining Pipeline Stage Information
const pipelineStageInfo = {
  "in_hpo": {
    description: "High Priority Opportunities - Early concept stage where mining opportunities are identified and prioritized based on geological potential, market conditions, and strategic fit."
  },
  "fid": {
    description: "Final Investment Decision - Detailed feasibility studies completed. Management approves capital allocation for mine development with confirmed reserves and economics."
  },
  "detail_engineering": {
    description: "Detailed Engineering - Comprehensive design phase including mine planning, processing facilities, infrastructure, and environmental impact assessments."
  },
  "construction": {
    description: "Construction - Physical development of mining infrastructure, processing plants, access roads, and supporting facilities."
  },
  "commissioning": {
    description: "Commissioning - Testing and optimization of all mining equipment, processing systems, and safety protocols before full production begins."
  },
  "operate_optimize": {
    description: "Operate & Optimize - Full production phase with continuous improvement in mining efficiency, cost optimization, and environmental compliance."
  },
  "ore_processing": {
    description: "Ore Processing - Advanced mineral processing to extract valuable commodities from raw ore, including concentration, smelting, and refining operations."
  }
};

// Main Component
const InitiativeProjectPipelinePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getInitiativeProjectPipelineData();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "16px" }}>
      <Title level={2} style={{ marginBottom: "16px", color: brandColors[0] }}>
        Dashboard - Initiative Project Pipeline
      </Title>
      
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Chart Reading Guide */}
        <Section title="Panduan Membaca Chart" loading={false}>
          <Alert
            message="Cara Membaca Mining Project Pipeline"
            description={
              <div>
                <Title level={5} style={{ marginTop: "12px", color: brandColors[0] }}>
                  Ukuran Lingkaran (Circle Size):
                </Title>
                <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
                  <li><strong>Lingkaran Kecil:</strong> Proyek dengan investasi &lt; $300M USD (Small Scale Mining)</li>
                  <li><strong>Lingkaran Sedang:</strong> Proyek dengan investasi $300M - $600M USD (Medium Scale Mining)</li>
                  <li><strong>Lingkaran Besar:</strong> Proyek dengan investasi &gt; $600M USD (Large Scale Mining)</li>
                </ul>
                
                <Title level={5} style={{ color: brandColors[0] }}>
                  Warna Lingkaran (Circle Color):
                </Title>
                <ul style={{ paddingLeft: "20px", marginBottom: "12px" }}>
                  <li><strong>Emas (Gold):</strong> Proyek pertambangan emas dan pengolahan emas</li>
                  <li><strong>Tembaga (Copper):</strong> Proyek pertambangan tembaga, smelter, dan konsentrat</li>
                  <li><strong>Merah (Nickel):</strong> Proyek pertambangan nikel dan feronikel</li>
                  <li><strong>Biru Gelap (Coal):</strong> Proyek pertambangan batubara dan gasifikasi</li>
                  <li><strong>Biru Tua (Tin):</strong> Proyek pertambangan timah dan processing</li>
                  <li><strong>Merah Muda (Bauxite):</strong> Proyek pertambangan bauksit</li>
                </ul>
                
                <Title level={5} style={{ color: brandColors[0] }}>
                  Tahapan Pipeline Mining Business:
                </Title>
                <Row gutter={[16, 8]} style={{ marginTop: "12px" }}>
                  <Col span={12}>
                    <Text strong>1. In HPO:</Text> Identifikasi peluang berdasarkan potensi geologi
                  </Col>
                  <Col span={12}>
                    <Text strong>2. FID:</Text> Keputusan investasi final setelah studi kelayakan
                  </Col>
                  <Col span={12}>
                    <Text strong>3. Detail Engineering:</Text> Desain teknis tambang dan fasilitas
                  </Col>
                  <Col span={12}>
                    <Text strong>4. Construction:</Text> Pembangunan infrastruktur pertambangan
                  </Col>
                  <Col span={12}>
                    <Text strong>5. Commissioning:</Text> Testing dan optimasi peralatan
                  </Col>
                  <Col span={12}>
                    <Text strong>6. Operate Optimize:</Text> Produksi penuh dan optimasi
                  </Col>
                  <Col span={24}>
                    <Text strong>7. Ore Processing:</Text> Pengolahan mineral advanced dan refining
                  </Col>
                </Row>
              </div>
            }
            type="info"
            showIcon
            icon={<InfoCircleOutlined />}
            style={{ marginBottom: "16px" }}
          />
        </Section>

        {/* Pipeline Visualization */}
        <Section title="Mining Project Pipeline Stages" loading={false}>
          <Card style={{ padding: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                padding: "24px",
                minHeight: "320px",
                background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
                borderRadius: "12px",
                width: "100%",
                gap: "6px",
                overflowX: "auto",
                border: `2px solid ${brandColors[0]}20`,
              }}
            >
              {data?.pipeline?.stages?.map((stage) => (
                <PipelineStage 
                  key={stage.id} 
                  stage={stage} 
                  stageInfo={pipelineStageInfo[stage.id]}
                />
              ))}
            </div>
          </Card>
        </Section>

        {/* Project Phases */}
        <Section title="Mining Project Development Phases" loading={false}>
          <Row gutter={[16, 16]}>
            {Object.entries(data?.phases || {}).map(([key, phase]) => (
              <Col xs={24} md={8} key={key}>
                <PhaseCard phase={phase} phaseKey={key} />
              </Col>
            ))}
          </Row>
        </Section>

        {/* Comprehensive Legend */}
        <Section title="Legend & Mining Business Context" loading={false}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Mining Commodity Types" style={{ height: "100%" }}>
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                  {Object.entries(commodityColors).map(([commodity, color]) => (
                    <div key={commodity} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "24px",
                          height: "24px",
                          backgroundColor: color,
                          borderRadius: "50%",
                          border: "2px solid rgba(255,255,255,0.5)",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                        }}
                      />
                      <Text strong>{commodity}</Text>
                      <Text type="secondary">
                        {commodity === "Gold" && "Precious Metal Mining"}
                        {commodity === "Copper" && "Base Metal & Infrastructure"}
                        {commodity === "Nickel" && "Stainless Steel & EV Battery"}
                        {commodity === "Coal" && "Energy & Steel Production"}
                        {commodity === "Tin" && "Electronics & Packaging"}
                        {commodity === "Bauxite" && "Aluminum Production"}
                        {commodity === "Aluminum" && "Transportation & Construction"}
                      </Text>
                    </div>
                  ))}
                </Space>
              </Card>
            </Col>
            
            <Col xs={24} md={12}>
              <Card title="Project Investment Scale" style={{ height: "100%" }}>
                <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                  <div>
                    <Text strong>Ukuran Investasi Proyek Tambang:</Text>
                    <div style={{ marginTop: "12px" }}>
                      <Space direction="vertical" size="small">
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div
                            style={{
                              width: "35px",
                              height: "35px",
                              backgroundColor: brandColors[2],
                              borderRadius: "50%",
                              border: "2px solid rgba(255,255,255,0.5)",
                            }}
                          />
                          <div>
                            <Text strong>Small Project (&lt; $300M)</Text>
                            <br />
                            <Text type="secondary">Regional mining operations, processing upgrades</Text>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div
                            style={{
                              width: "50px",
                              height: "50px",
                              backgroundColor: brandColors[2],
                              borderRadius: "50%",
                              border: "2px solid rgba(255,255,255,0.5)",
                            }}
                          />
                          <div>
                            <Text strong>Medium Project ($300M - $600M)</Text>
                            <br />
                            <Text type="secondary">New mine development, major expansions</Text>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div
                            style={{
                              width: "65px",
                              height: "65px",
                              backgroundColor: brandColors[2],
                              borderRadius: "50%",
                              border: "2px solid rgba(255,255,255,0.5)",
                            }}
                          />
                          <div>
                            <Text strong>Large Project (&gt; $600M)</Text>
                            <br />
                            <Text type="secondary">Mega projects, integrated mining complexes</Text>
                          </div>
                        </div>
                      </Space>
                    </div>
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </Section>

        {/* Mining Industry Insights */}
        <Section title="Mining Industry Insights" loading={false}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card>
                <div style={{ textAlign: "center" }}>
                  <Title level={2} style={{ margin: 0, color: brandColors[0] }}>
                    {data?.pipeline?.stages?.reduce((total, stage) => total + stage.projects.length, 0)}
                  </Title>
                  <Text type="secondary">Total Active Mining Projects</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <div style={{ textAlign: "center" }}>
                  <Title level={2} style={{ margin: 0, color: brandColors[1] }}>
                    ${data?.pipeline?.stages?.reduce((total, stage) => 
                      total + stage.projects.reduce((stageTotal, project) => stageTotal + project.budget, 0), 0
                    )}M
                  </Title>
                  <Text type="secondary">Total Investment Pipeline</Text>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <div style={{ textAlign: "center" }}>
                  <Title level={2} style={{ margin: 0, color: brandColors[2] }}>
                    {Object.keys(commodityColors).length}
                  </Title>
                  <Text type="secondary">Mining Commodity Types</Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Section>
      </Space>
    </div>
  );
};

export default InitiativeProjectPipelinePage;
