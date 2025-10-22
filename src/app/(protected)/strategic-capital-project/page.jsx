import { useState, useEffect } from "react";
import { Row, Col, Card, Statistic, Space, Typography, Spin, Select, DatePicker, Button } from "antd";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { Page, Section } from "admiral";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getStrategicCapitalProjectData } from "./_data/index";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

export default function StrategicCapitalProjectPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    company: [],
    phase: [],
    commodity: [],
    dateRange: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getStrategicCapitalProjectData();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      company: [],
      phase: [],
      commodity: [],
      dateRange: null,
    });
  };

  if (loading) {
    return (
      <Section>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <Spin size="large" />
        </div>
      </Section>
    );
  }

  const totalInvestmentData = [
    { name: "Upstream", value: data?.total_investment?.upstream || 0 },
    { name: "Midstream", value: data?.total_investment?.midstream || 0 },
    { name: "Downstream", value: data?.total_investment?.downstream || 0 },
  ];

  const COLORS = {
    upstream: "#19315a",
    midstream: "#c41e3a",
    downstream: "#2a4a7a",
  };

  const projectPhaseColors = [
    "#19315a",
    "#c41e3a",
    "#2a4a7a",
    "#21426e",
    "#d14458",
    "#0f1e3a",
  ];

  const projectTypeColors = ["#19315a", "#c41e3a", "#2a4a7a", "#21426e", "#d14458"];

  const commodityColors = ["#19315a", "#c41e3a", "#2a4a7a", "#21426e", "#d14458"];

  return (
    <Page
      breadcrumbs={[
        { label: "Strategic Capital Project Dashboard", path: "" },
      ]}
      title="Strategic Capital Project Dashboard"
      noStyle
    >
      <Section loading={loading}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Filters Section */}
        <Section title="Filters">
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={6}>
              <Space direction="vertical" size={2} style={{ width: "100%" }}>
                <Text strong>Company</Text>
                <Select
                  mode="multiple"
                  placeholder="Select companies"
                  style={{ width: "100%" }}
                  value={filters.company}
                  onChange={(value) => handleFilterChange('company', value)}
                  options={[
                    { label: "PTFI", value: "PTFI" },
                    { label: "PTBA", value: "PTBA" },
                    { label: "Inalum", value: "Inalum" },
                    { label: "Antam", value: "Antam" },
                    { label: "Vale", value: "Vale" },
                    { label: "Timah", value: "Timah" },
                  ]}
                />
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Space direction="vertical" size={2} style={{ width: "100%" }}>
                <Text strong>Project Phase</Text>
                <Select
                  mode="multiple"
                  placeholder="Select phases"
                  style={{ width: "100%" }}
                  value={filters.phase}
                  onChange={(value) => handleFilterChange('phase', value)}
                  options={[
                    { label: "FEL 2", value: "FEL 2" },
                    { label: "FEL 3", value: "FEL 3" },
                    { label: "Detail Engineering", value: "Detail Engineering" },
                    { label: "Construction", value: "Construction" },
                    { label: "Commissioning", value: "Commissioning" },
                    { label: "Operate Optimize", value: "Operate Optimize" },
                  ]}
                />
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Space direction="vertical" size={2} style={{ width: "100%" }}>
                <Text strong>Commodity</Text>
                <Select
                  mode="multiple"
                  placeholder="Select commodities"
                  style={{ width: "100%" }}
                  value={filters.commodity}
                  onChange={(value) => handleFilterChange('commodity', value)}
                  options={[
                    { label: "Nickel", value: "Nickel" },
                    { label: "Alumunium", value: "Alumunium" },
                    { label: "Gold", value: "Gold" },
                    { label: "Tin", value: "Tin" },
                    { label: "Copper", value: "Copper" },
                  ]}
                />
              </Space>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Space direction="vertical" size={2} style={{ width: "100%" }}>
                <Text strong>Date Range</Text>
                <RangePicker
                  style={{ width: "100%" }}
                  value={filters.dateRange}
                  onChange={(dates) => handleFilterChange('dateRange', dates)}
                />
              </Space>
            </Col>
            <Col xs={24} style={{ textAlign: "right" }}>
              <Space>
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
                <Button 
                  type="primary" 
                  icon={<FilterOutlined />}
                >
                  Apply Filters
                </Button>
              </Space>
            </Col>
          </Row>
        </Section>

        {/* Summary Information */}
        <Section title="Summary Information">
          <Text type="secondary">
            Showing {data?.summary?.showing || 0} of {data?.summary?.total || 0} Projects
          </Text>
        </Section>

        {/* Investment and Performance Overview */}
        <Section title="Investment and Performance Overview">
          <Row gutter={[16, 16]}>
            {/* Total Investment Donut Chart */}
            <Col xs={24} md={12} lg={6}>
              <Card>
                <Title level={5}>Total Investment</Title>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={totalInvestmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {totalInvestmentData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.name === "Upstream"
                              ? COLORS.upstream
                              : entry.name === "Midstream"
                                ? COLORS.midstream
                                : COLORS.downstream
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Total Project Stats */}
            <Col xs={24} md={12} lg={6}>
              <Card>
                <Title level={5}>Total Project</Title>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 250,
                  }}
                >
                  <div
                    style={{
                      fontSize: "48px",
                      fontWeight: "bold",
                      color: "#19315a",
                      marginBottom: "20px",
                    }}
                  >
                    {data?.summary?.total_projects || 0}
                  </div>
                  <Space direction="vertical" size="small" style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "8px 16px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                      }}
                    >
                      <Text>SPI</Text>
                      <Text
                        style={{
                          color: data?.summary?.spi >= 1 ? "#19315a" : "#c41e3a",
                          fontWeight: "bold",
                        }}
                      >
                        {data?.summary?.spi || 0}
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "8px 16px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                      }}
                    >
                      <Text>CPI</Text>
                      <Text
                        style={{
                          color: data?.summary?.cpi >= 1 ? "#19315a" : "#c41e3a",
                          fontWeight: "bold",
                        }}
                      >
                        {data?.summary?.cpi || 0}
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "8px 16px",
                        border: "1px solid #d9d9d9",
                        borderRadius: "4px",
                      }}
                    >
                      <Text>High Risk</Text>
                      <Text style={{ color: "#c41e3a", fontWeight: "bold" }}>
                        {data?.summary?.high_risk || 0}
                      </Text>
                    </div>
                  </Space>
                </div>
              </Card>
            </Col>

            {/* Company Distribution */}
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Title level={5}>Company</Title>
                  <Text>Value</Text>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={data?.company_distribution || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {(data?.company_distribution || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={commodityColors[index % commodityColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Project Objectives */}
            <Col xs={24} md={12} lg={6}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Title level={5}>Project Objectives</Title>
                  <Text>Value</Text>
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data?.project_objectives || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name, props) => [value, props.payload.label]}
                    />
                    <Bar dataKey="value" fill="#19315a" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </Section>

        {/* Detailed Analysis */}
        <Section title="Detailed Analysis">
          <Row gutter={[16, 16]}>
            {/* Project Phase */}
            <Col xs={24} md={12} lg={8}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <Title level={5}>Project Phase</Title>
                  <Text>Quantity</Text>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data?.project_phase || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="phase" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantity">
                      {(data?.project_phase || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={projectPhaseColors[index % projectPhaseColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Commodity Distribution */}
            <Col xs={24} md={12} lg={8}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <Title level={5}>Commodity</Title>
                  <Text>Value</Text>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data?.commodity_distribution || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="commodity" 
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      interval={0}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value">
                      {(data?.commodity_distribution || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={commodityColors[index % commodityColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            {/* Project Type */}
            <Col xs={24} md={12} lg={8}>
              <Card>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <Title level={5}>Project Type</Title>
                  <Text>Quantity</Text>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data?.project_type || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="type" 
                      angle={-45}
                      textAnchor="end"
                      height={120}
                      interval={0}
                      fontSize={10}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="quantity">
                      {(data?.project_type || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={projectTypeColors[index % projectTypeColors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </Section>
      </Space>
      </Section>
    </Page>
  );
}
