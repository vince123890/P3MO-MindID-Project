import React, { useState } from 'react';
import { Tabs, Space, Tooltip as AntTooltip, Card, Row, Col, Typography, Tag, Button, Select, DatePicker } from 'antd';
import { InfoCircleOutlined, FullscreenOutlined, FilterOutlined, ReloadOutlined, ExpandOutlined } from '@ant-design/icons';
import { Page, Section } from 'admiral';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import projectComparisonData from './_data';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

const KomparasiProjectPage = () => {
  const [activeTab, setActiveTab] = useState('total_capex');
  const [isChartExpanded, setIsChartExpanded] = useState(false);
  const [filters, setFilters] = useState({
    company: [],
    metric: [],
    dateRange: null,
  });
  const data = projectComparisonData.data;

  // Strategic Capital Project color scheme
  const strategicColors = ["#19315a", "#c41e3a", "#2a4a7a", "#21426e", "#d14458", "#0f1e3a"];
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      company: [],
      metric: [],
      dateRange: null,
    });
  };

  const toggleChartExpansion = () => {
    setIsChartExpanded(!isChartExpanded);
  };

  // Prepare chart data for the selected tab with Strategic Capital Project colors
  const getChartData = (tabKey) => {
    const tabData = data[tabKey];
    return tabData.projects.map((project, index) => ({
      name: project.name,
      value: project.value,
      fill: strategicColors[index % strategicColors.length],
      company: project.company
    }));
  };

  // Get current tab info
  const getCurrentTabInfo = () => {
    return data[activeTab];
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const currentInfo = getCurrentTabInfo();
      const value = payload[0].value;
      const formattedValue = currentInfo.unit === '%' || currentInfo.unit === '' 
        ? `${value}${currentInfo.unit}`
        : `${currentInfo.currency}${value}${currentInfo.unit}`;
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="font-medium">{label}</p>
          <p style={{ color: payload[0].color }}>
            {currentInfo.title}: {formattedValue}
          </p>
        </div>
      );
    }
    return null;
  };

  // Tab items configuration
  const tabItems = [
    {
      key: 'total_capex',
      label: 'Total CAPEX',
    },
    {
      key: 'duration',
      label: 'Duration',
    },
    {
      key: 'progress_fisik_r',
      label: '%Progress Fisik R',
    },
    {
      key: 'progress_fisik_a',
      label: '%Progress Fisik A',
    },
    {
      key: 'anggaran_terserap_r',
      label: 'Anggaran Terserap R',
    },
    {
      key: 'anggaran_terserap_a',
      label: 'Anggaran Terserap A',
    },
    {
      key: 'spi',
      label: 'SPI',
    },
  ];

  // Calculate statistics for current data
  const getCurrentStatistics = () => {
    const currentInfo = getCurrentTabInfo();
    const values = currentInfo.projects.map(p => p.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    
    return { max, min, avg: avg.toFixed(2) };
  };

  // Get performance indicator based on metric type
  const getPerformanceIndicator = (value, metric) => {
    if (metric === 'spi') {
      if (value >= 1.1) return { status: 'success', text: 'Ahead of Schedule' };
      if (value >= 0.9) return { status: 'warning', text: 'On Track' };
      return { status: 'error', text: 'Behind Schedule' };
    }
    return null;
  };

  return (
    <Page
      breadcrumbs={[
        { label: "Komparasi Project", path: "" },
      ]}
      title="Dashboard - Komparasi Project"
      noStyle
    >
      <Section loading={false}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Filters Section */}
          <Section title="Filters">
            <Row gutter={[16, 16]} align="top">
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
                      { label: "PT Aneka Tambang Tbk (ANTAM)", value: "PT Aneka Tambang Tbk (ANTAM)" },
                      { label: "PT Bukit Asam Tbk", value: "PT Bukit Asam Tbk" },
                      { label: "PT Freeport Indonesia", value: "PT Freeport Indonesia" },
                      { label: "PT Indonesia Asahan Aluminium (INALUM)", value: "PT Indonesia Asahan Aluminium (INALUM)" },
                      { label: "PT Timah Tbk", value: "PT Timah Tbk" },
                      { label: "PT Vale Indonesia Tbk", value: "PT Vale Indonesia Tbk" },
                    ]}
                  />
                </Space>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Space direction="vertical" size={2} style={{ width: "100%" }}>
                  <Text strong>Metric Type</Text>
                  <Select
                    mode="multiple"
                    placeholder="Select metrics"
                    style={{ width: "100%" }}
                    value={filters.metric}
                    onChange={(value) => handleFilterChange('metric', value)}
                    options={[
                      { label: "Total CAPEX", value: "total_capex" },
                      { label: "Duration", value: "duration" },
                      { label: "Progress Fisik R", value: "progress_fisik_r" },
                      { label: "Progress Fisik A", value: "progress_fisik_a" },
                      { label: "Anggaran Terserap R", value: "anggaran_terserap_r" },
                      { label: "Anggaran Terserap A", value: "anggaran_terserap_a" },
                      { label: "SPI", value: "spi" },
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
              <Col xs={24} sm={12} md={6}>
                <Space direction="vertical" size={2} style={{ width: "100%" }}>
                  <Text strong style={{ opacity: 0 }}>Actions</Text>
                  <Space style={{ width: "100%", justifyContent: "flex-end" }}>
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
                </Space>
              </Col>
            </Row>
          </Section>

          {/* Summary Information */}
          <Section title="Summary Information">
            <Text type="secondary">
              Showing {getCurrentTabInfo().projects.length} project initiatives from {
                [...new Set(getCurrentTabInfo().projects.map(p => p.company))].length
              } companies
            </Text>
          </Section>

          {/* Total CAPEX Overview and Statistics Combined */}
          <Section title="Total CAPEX Overview">
            <Row gutter={[16, 16]}>
              {/* Metric Info Card */}
              <Col xs={24}>
                <Card style={{ marginBottom: '16px' }}>
                  <Row gutter={16} align="middle">
                    <Col flex="auto">
                      <Title level={4} style={{ margin: 0, color: '#19315a' }}>
                        {getCurrentTabInfo().title}
                        <AntTooltip title={getCurrentTabInfo().description}>
                          <InfoCircleOutlined style={{ marginLeft: '8px', fontSize: '16px', color: '#666' }} />
                        </AntTooltip>
                      </Title>
                      <Text type="secondary">{getCurrentTabInfo().description}</Text>
                    </Col>
                    <Col>
                      <Button 
                        icon={isChartExpanded ? <InfoCircleOutlined /> : <ExpandOutlined />} 
                        type="text" 
                        title={isChartExpanded ? "Collapse Chart View" : "Expand Chart View"}
                        onClick={toggleChartExpansion}
                      >
                        {isChartExpanded ? "Collapse" : "Expand"}
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>

              {/* Statistics Cards */}
              <Col xs={24} sm={6}>
                <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f0f5ff', border: '1px solid #19315a' }}>
                  <Text type="secondary">Total Projects</Text>
                  <Title level={3} style={{ margin: 0, color: '#19315a' }}>
                    {getCurrentTabInfo().projects.length}
                  </Title>
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card size="small" style={{ textAlign: 'center', backgroundColor: '#fff2f0', border: '1px solid #c41e3a' }}>
                  <Text type="secondary">Highest Value</Text>
                  <Title level={3} style={{ margin: 0, color: '#c41e3a' }}>
                    {(() => {
                      const stats = getCurrentStatistics();
                      const info = getCurrentTabInfo();
                      return info.unit === '%' || info.unit === '' 
                        ? `${stats.max}${info.unit}`
                        : `${info.currency}${stats.max}${info.unit}`;
                    })()}
                  </Title>
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f0f5ff', border: '1px solid #2a4a7a' }}>
                  <Text type="secondary">Average Value</Text>
                  <Title level={3} style={{ margin: 0, color: '#2a4a7a' }}>
                    {(() => {
                      const stats = getCurrentStatistics();
                      const info = getCurrentTabInfo();
                      return info.unit === '%' || info.unit === '' 
                        ? `${stats.avg}${info.unit}`
                        : `${info.currency}${stats.avg}${info.unit}`;
                    })()}
                  </Title>
                </Card>
              </Col>
              <Col xs={24} sm={6}>
                <Card size="small" style={{ textAlign: 'center', backgroundColor: '#f9f0ff', border: '1px solid #21426e' }}>
                  <Text type="secondary">Lowest Value</Text>
                  <Title level={3} style={{ margin: 0, color: '#21426e' }}>
                    {(() => {
                      const stats = getCurrentStatistics();
                      const info = getCurrentTabInfo();
                      return info.unit === '%' || info.unit === '' 
                        ? `${stats.min}${info.unit}`
                        : `${info.currency}${stats.min}${info.unit}`;
                    })()}
                  </Title>
                </Card>
              </Col>
            </Row>
          </Section>

          {/* Tabs and Chart Combined */}
          <Section title="Comparative Analysis">
            <Card>
              {/* Tab Navigation */}
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                type="card"
                size="large"
                items={tabItems.map(item => ({
                  ...item,
                  label: (
                    <AntTooltip title={data[item.key]?.description}>
                      {item.label}
                    </AntTooltip>
                  )
                }))}
                style={{ marginBottom: '24px' }}
              />

              {/* Chart Section */}
              <div style={{ padding: isChartExpanded ? '0' : '24px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <Title level={4} style={{ margin: 0, color: '#19315a' }}>
                      {getCurrentTabInfo().title} Comparison
                    </Title>
                    <Text type="secondary">
                      Comparative analysis across {getCurrentTabInfo().projects.length} project initiatives
                    </Text>
                  </div>
                  {activeTab === 'spi' && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <Tag color="green">≥1.1 Ahead</Tag>
                      <Tag color="orange">0.9-1.1 On Track</Tag>
                      <Tag color="red">&lt;0.9 Behind</Tag>
                    </div>
                  )}
                </div>
                
                <div style={{ width: '100%', height: isChartExpanded ? '800px' : '600px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={getChartData(activeTab)}
                      margin={{ top: 20, right: 30, left: 40, bottom: 120 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={120}
                        interval={0}
                        tick={{ fontSize: 11 }}
                        stroke="#666"
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="#666"
                        label={{ 
                          value: (() => {
                            const info = getCurrentTabInfo();
                            return info.unit === '%' || info.unit === '' 
                              ? `${info.title} ${info.unit}`
                              : `${info.title} (${info.currency}${info.unit})`;
                          })(), 
                          angle: -90, 
                          position: 'insideLeft',
                          style: { textAnchor: 'middle' }
                        }}
                      />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            const currentInfo = getCurrentTabInfo();
                            const value = payload[0].value;
                            const formattedValue = currentInfo.unit === '%' || currentInfo.unit === '' 
                              ? `${value}${currentInfo.unit}`
                              : `${currentInfo.currency}${value}${currentInfo.unit}`;
                            
                            const project = currentInfo.projects.find(p => p.name === label);
                            const indicator = getPerformanceIndicator(value, activeTab);
                            
                            return (
                              <Card size="small" style={{ minWidth: '300px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                                <Title level={5} style={{ margin: '0 0 8px 0', color: payload[0].color }}>
                                  {project?.company}
                                </Title>
                                <Text strong>{label}</Text>
                                <div style={{ margin: '8px 0' }}>
                                  <Text type="secondary">{currentInfo.title}: </Text>
                                  <Text strong style={{ color: payload[0].color }}>
                                    {formattedValue}
                                  </Text>
                                </div>
                                {indicator && (
                                  <Tag color={indicator.status}>{indicator.text}</Tag>
                                )}
                              </Card>
                            );
                          }
                          return null;
                        }} 
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[6, 6, 0, 0]}
                        stroke="#fff"
                        strokeWidth={2}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </Section>

          {/* Performance Summary */}
          {activeTab === 'spi' && (
            <Card title="Schedule Performance Summary" style={{ marginTop: '16px' }}>
              <Row gutter={16}>
                {(() => {
                  const projects = getCurrentTabInfo().projects;
                  const ahead = projects.filter(p => p.value >= 1.1).length;
                  const onTrack = projects.filter(p => p.value >= 0.9 && p.value < 1.1).length;
                  const behind = projects.filter(p => p.value < 0.9).length;
                  
                  return (
                    <>
                      <Col xs={24} sm={8}>
                        <Card size="small" style={{ backgroundColor: '#f6ffed', border: '1px solid #b7eb8f' }}>
                          <div style={{ textAlign: 'center' }}>
                            <Title level={2} style={{ margin: 0, color: '#52c41a' }}>{ahead}</Title>
                            <Text>Projects Ahead of Schedule</Text>
                          </div>
                        </Card>
                      </Col>
                      <Col xs={24} sm={8}>
                        <Card size="small" style={{ backgroundColor: '#fff7e6', border: '1px solid #ffd591' }}>
                          <div style={{ textAlign: 'center' }}>
                            <Title level={2} style={{ margin: 0, color: '#fa8c16' }}>{onTrack}</Title>
                            <Text>Projects On Track</Text>
                          </div>
                        </Card>
                      </Col>
                      <Col xs={24} sm={8}>
                        <Card size="small" style={{ backgroundColor: '#fff2f0', border: '1px solid #ffb3b3' }}>
                          <div style={{ textAlign: 'center' }}>
                            <Title level={2} style={{ margin: 0, color: '#f5222d' }}>{behind}</Title>
                            <Text>Projects Behind Schedule</Text>
                          </div>
                        </Card>
                      </Col>
                    </>
                  );
                })()}
              </Row>
            </Card>
          )}
        </Space>
      </Section>
    </Page>
  );
};

export default KomparasiProjectPage;
