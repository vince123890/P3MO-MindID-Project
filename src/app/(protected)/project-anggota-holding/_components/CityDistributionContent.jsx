import { useEffect, useState } from "react";
import { Card, Row, Col, Statistic, Typography, Space, Progress, Tag } from "antd";
import { ProjectOutlined, DollarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { projectsData } from "../_data";

const { Title, Text } = Typography;

const CityDistributionContent = () => {
  const [cityStats, setCityStats] = useState([]);
  const [totalStats, setTotalStats] = useState({});

  useEffect(() => {
    const projects = projectsData.data.items;
    
    // Group projects by city
    const cityGroups = projects.reduce((acc, project) => {
      if (!acc[project.location]) {
        acc[project.location] = [];
      }
      acc[project.location].push(project);
      return acc;
    }, {});

    // Calculate statistics for each city
    const cityStatistics = Object.entries(cityGroups).map(([city, cityProjects]) => {
      const totalBudget = cityProjects.reduce((sum, project) => sum + project.budget, 0);
      const averageProgress = cityProjects.reduce((sum, project) => sum + project.progress, 0) / cityProjects.length;
      const activeProjects = cityProjects.filter(project => project.status === "In Progress").length;
      const planningProjects = cityProjects.filter(project => project.status === "Planning").length;

      return {
        city,
        projectCount: cityProjects.length,
        totalBudget,
        averageProgress: Math.round(averageProgress),
        activeProjects,
        planningProjects,
        projects: cityProjects
      };
    });

    // Sort by total budget (descending)
    cityStatistics.sort((a, b) => b.totalBudget - a.totalBudget);

    // Calculate overall totals
    const totals = {
      totalProjects: projects.length,
      totalBudget: projects.reduce((sum, project) => sum + project.budget, 0),
      totalCities: Object.keys(cityGroups).length,
      overallProgress: Math.round(projects.reduce((sum, project) => sum + project.progress, 0) / projects.length)
    };

    setCityStats(cityStatistics);
    setTotalStats(totals);
  }, []);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format currency in billions
  const formatBillions = (value) => {
    const billions = value / 1000000000;
    return `${billions.toFixed(1)}T`;
  };

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      {/* Overall Summary */}
      <Card title="Ringkasan Total Sebaran Project">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Statistic
              title="Total Project"
              value={totalStats.totalProjects}
              prefix={<ProjectOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="Total Kota"
              value={totalStats.totalCities}
              prefix={<EnvironmentOutlined />}
              valueStyle={{ color: "#52c41a" }}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="Total Budget"
              value={formatBillions(totalStats.totalBudget)}
              prefix={<DollarOutlined />}
              valueStyle={{ color: "#fa8c16" }}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic
              title="Progress Rata-rata"
              value={totalStats.overallProgress}
              suffix="%"
              valueStyle={{ color: "#722ed1" }}
            />
          </Col>
        </Row>
      </Card>

      {/* City Distribution */}
      <Card title="Sebaran Project per Kota">
        <Row gutter={[16, 16]}>
          {cityStats.map((city) => (
            <Col xs={24} sm={12} lg={6} key={city.city}>
              <Card
                size="small"
                style={{
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                }}
              >
                <Space direction="vertical" size="small" style={{ width: "100%" }}>
                  <div style={{ textAlign: "center" }}>
                    <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
                      {city.city}
                    </Title>
                  </div>
                  
                  <div style={{ textAlign: "center" }}>
                    <Statistic
                      title="Jumlah Project"
                      value={city.projectCount}
                      valueStyle={{ fontSize: "24px", fontWeight: "bold" }}
                    />
                  </div>

                  <div>
                    <Text strong>Total Budget:</Text>
                    <br />
                    <Text style={{ color: "#fa8c16", fontWeight: "bold" }}>
                      {formatCurrency(city.totalBudget)}
                    </Text>
                  </div>

                  <div>
                    <Text strong>Progress Rata-rata:</Text>
                    <Progress 
                      percent={city.averageProgress} 
                      size="small" 
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                    />
                  </div>

                  <div>
                    <Text strong>Status Project:</Text>
                    <br />
                    <Space size="small">
                      {city.activeProjects > 0 && (
                        <Tag color="blue">
                          In Progress: {city.activeProjects}
                        </Tag>
                      )}
                      {city.planningProjects > 0 && (
                        <Tag color="orange">
                          Planning: {city.planningProjects}
                        </Tag>
                      )}
                    </Space>
                  </div>

                  <div>
                    <Text strong>Daftar Project:</Text>
                    <ul style={{ margin: "4px 0", paddingLeft: "16px" }}>
                      {city.projects.map((project) => (
                        <li key={project.id} style={{ fontSize: "12px", marginBottom: "2px" }}>
                          <Text style={{ fontSize: "12px" }}>{project.name}</Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>
    </Space>
  );
};

export default CityDistributionContent;
