import { Typography, Card, Row, Col, Space, Table } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { Pie, Column } from '@ant-design/plots';

const { Title, Text } = Typography;

const RiskIssueContent = ({ project }) => {
  // Risk Category data
  const riskCategories = [
    { title: "Low Impact", count: 22, color: "#52c41a" },
    { title: "Moderate Impact", count: 18, color: "#1890ff" },
    { title: "High Impact", count: 8, color: "#ff4d4f" },
    { title: "Outdated", count: 3, color: "#8c8c8c" }
  ];

  // Risk Taxonomy pie chart data
  const riskTaxonomyData = [
    { type: 'Technical', value: 25 },
    { type: 'Environmental', value: 20 },
    { type: 'Financial', value: 18 },
    { type: 'Regulatory', value: 15 },
    { type: 'Safety', value: 12 },
    { type: 'Market', value: 10 }
  ];

  // Risk Status data
  const riskStatusData = [
    { status: 'Open', count: 15 },
    { status: 'Ongoing', count: 8 },
    { status: 'Closed', count: 12 }
  ];

  // Issue Taxonomy pie chart data
  const issueTaxonomyData = [
    { type: 'Schedule', value: 30 },
    { type: 'Quality', value: 25 },
    { type: 'Resource', value: 20 },
    { type: 'Communication', value: 15 },
    { type: 'Technical', value: 10 }
  ];

  // Issue Status data
  const issueStatusData = [
    { status: 'Open', count: 14 },
    { status: 'Ongoing', count: 8 },
    { status: 'Closed', count: 10 }
  ];

  // Risk table data
  const riskTableData = [
    {
      key: '1',
      score: 'High',
      taxonomy: 'Environmental',
      activity: 'Site Preparation',
      pic: 'John Smith',
      date: '2024-12-15',
      scoreColor: '#ff4d4f'
    },
    {
      key: '2',
      score: 'High',
      taxonomy: 'Safety',
      activity: 'Equipment Installation',
      pic: 'Sarah Johnson',
      date: '2024-12-10',
      scoreColor: '#ff4d4f'
    },
    {
      key: '3',
      score: 'Medium',
      taxonomy: 'Financial',
      activity: 'Budget Planning',
      pic: 'Mike Wilson',
      date: '2024-12-08',
      scoreColor: '#faad14'
    },
    {
      key: '4',
      score: 'Low',
      taxonomy: 'Technical',
      activity: 'System Testing',
      pic: 'Lisa Davis',
      date: '2024-12-05',
      scoreColor: '#52c41a'
    }
  ];

  // Issue table data
  const issueTableData = [
    {
      key: '1',
      activity: 'Project Scheduling Delays',
      taxonomy: 'Schedule',
      description: 'Critical path activities behind schedule',
      progressUpdate: 'Recovery plan implemented',
      deadline: '2024-12-20',
      status: 'Open',
      statusColor: '#ff4d4f'
    },
    {
      key: '2',
      activity: 'Equipment Quality Issues',
      taxonomy: 'Quality',
      description: 'Equipment not meeting specifications',
      progressUpdate: 'Vendor coordination ongoing',
      deadline: '2024-12-18',
      status: 'Ongoing',
      statusColor: '#faad14'
    },
    {
      key: '3',
      activity: 'Resource Allocation Problems',
      taxonomy: 'Resource',
      description: 'Insufficient skilled workers available',
      progressUpdate: 'Additional hiring in progress',
      deadline: '2024-12-15',
      status: 'Ongoing',
      statusColor: '#faad14'
    }
  ];

  // Risk table columns
  const riskColumns = [
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (text, record) => (
        <span style={{ color: record.scoreColor, fontWeight: 'bold' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Taxonomy',
      dataIndex: 'taxonomy',
      key: 'taxonomy',
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'PIC',
      dataIndex: 'pic',
      key: 'pic',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  // Issue table columns
  const issueColumns = [
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
      width: '20%',
    },
    {
      title: 'Taxonomy',
      dataIndex: 'taxonomy',
      key: 'taxonomy',
      width: '15%',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: '25%',
    },
    {
      title: 'Progress Update',
      dataIndex: 'progressUpdate',
      key: 'progressUpdate',
      width: '20%',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      width: '15%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '5%',
      render: (text, record) => (
        <div 
          style={{ 
            backgroundColor: record.statusColor, 
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            textAlign: 'center',
            fontSize: '11px'
          }}
        >
          {text}
        </div>
      ),
    },
  ];

  // Risk Heatmap component
  const RiskHeatmap = () => {
    const heatmapData = [];
    const likelihoods = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
    const impacts = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
    
    likelihoods.forEach((likelihood, i) => {
      impacts.forEach((impact, j) => {
        const riskLevel = i + j;
        let color = '#52c41a'; // Low risk (green)
        let riskCount = Math.floor(Math.random() * 5);
        
        if (riskLevel >= 6) color = '#ff4d4f'; // High risk (red)
        else if (riskLevel >= 4) color = '#faad14'; // Medium risk (orange)
        else if (riskLevel >= 2) color = '#ffc107'; // Low-medium risk (yellow)
        
        heatmapData.push({
          likelihood: i,
          impact: j,
          color,
          count: riskCount > 0 ? riskCount : null
        });
      });
    });

    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%', 
        height: '250px',
        position: 'relative'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          marginTop: '10px'
        }}>
          {/* Likelihood label */}
          <div style={{ 
            fontSize: '12px',
            fontWeight: 'bold',
            writingMode: 'vertical-lr',
            textOrientation: 'mixed',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            Likelihood
          </div>
          
          {/* Heatmap grid */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(5, 1fr)', 
            gridTemplateRows: 'repeat(5, 1fr)',
            gap: '2px',
            width: '200px',
            height: '200px'
          }}>
            {heatmapData.map((cell, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: cell.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px',
                  fontWeight: 'bold',
                  color: cell.color === '#52c41a' ? '#000' : '#fff',
                  border: '1px solid #ddd'
                }}
              >
                {cell.count}
              </div>
            ))}
          </div>
        </div>
        
        {/* Impact label */}
        <div style={{ 
          fontSize: '12px',
          fontWeight: 'bold',
          marginTop: '8px'
        }}>
          Impact
        </div>
      </div>
    );
  };

  const pieConfig = {
    appendPadding: 10,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    legend: { position: 'bottom' },
    height: 200,
  };

  const columnConfig = {
    xField: 'status',
    yField: 'count',
    color: ({ status }) => {
      switch(status) {
        case 'Open': return '#1890ff';
        case 'Ongoing': return '#faad14';
        case 'Closed': return '#8c8c8c';
        default: return '#1890ff';
      }
    },
    height: 150,
  };

  return (
    <div style={{ padding: "8px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* RISK SECTION */}
        <div style={{ 
          backgroundColor: "#fff", 
          padding: "24px", 
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
        }}>
          {/* Risk Section Header */}
          <div style={{ 
            marginBottom: "24px",
            borderBottom: "2px solid #ff4d4f",
            paddingBottom: "12px"
          }}>
            <Title level={3} style={{ 
              margin: 0, 
              color: "#ff4d4f",
              fontSize: "20px",
              fontWeight: "bold"
            }}>
              RISK MANAGEMENT
            </Title>
          </div>

          {/* Risk Category Cards */}
          <Row gutter={16} style={{ marginBottom: 16 }}>
            {riskCategories.map((category, index) => (
              <Col span={6} key={index}>
                <Card
                  size="small"
                  style={{ 
                    textAlign: "center",
                    minHeight: "80px"
                  }}
                  bodyStyle={{ padding: "16px" }}
                >
                  <div style={{ 
                    fontSize: "24px", 
                    fontWeight: "bold", 
                    color: category.color,
                    marginBottom: "4px"
                  }}>
                    {category.count}
                  </div>
                  <div style={{ 
                    fontSize: "12px", 
                    color: "#666"
                  }}>
                    {category.title}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Risk Charts and Heatmap */}
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={6}>
              <Card
                title="Risk Taxonomy"
                size="small"
                style={{ minHeight: 250 }}
              >
                <Pie {...pieConfig} data={riskTaxonomyData} />
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title={
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span>Risk Status</span>
                    <FilterOutlined style={{ fontSize: "14px" }} />
                  </div>
                }
                size="small"
                style={{ minHeight: 250 }}
              >
                <Column {...columnConfig} data={riskStatusData} />
              </Card>
            </Col>
            <Col span={10}>
              <Card
                title="Risk Heatmap"
                size="small"
                style={{ minHeight: 250 }}
              >
                <RiskHeatmap />
              </Card>
            </Col>
          </Row>

          {/* Risk Table */}
          <Card size="small">
            <Table
              dataSource={riskTableData}
              columns={riskColumns}
              pagination={false}
              size="small"
            />
          </Card>
        </div>

        {/* ISSUE SECTION */}
        <div style={{ 
          backgroundColor: "#fff", 
          padding: "24px", 
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
        }}>
          {/* Issue Section Header */}
          <div style={{ 
            marginBottom: "24px",
            borderBottom: "2px solid #faad14",
            paddingBottom: "12px"
          }}>
            <Title level={3} style={{ 
              margin: 0, 
              color: "#faad14",
              fontSize: "20px",
              fontWeight: "bold"
            }}>
              ISSUE MANAGEMENT
            </Title>
          </div>

          {/* Issue Charts and Outdated Card */}
          <Row gutter={16} style={{ marginBottom: 16 }}>
            <Col span={6}>
              <Card
                title="Issue Taxonomy"
                size="small"
                style={{ minHeight: 250 }}
              >
                <Pie {...pieConfig} data={issueTaxonomyData} />
              </Card>
            </Col>
            <Col span={10}>
              <Card
                title="Issue Status"
                size="small"
                style={{ minHeight: 250 }}
              >
                <Column {...columnConfig} data={issueStatusData} />
              </Card>
            </Col>
            <Col span={8}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <Card
                  title={
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span>Outdated Issue</span>
                      <FilterOutlined style={{ fontSize: "14px" }} />
                    </div>
                  }
                  size="small"
                  style={{ flex: 1 }}
                >
                  <div style={{ 
                    textAlign: 'center',
                    padding: '40px 0'
                  }}>
                    <div style={{ 
                      fontSize: "36px", 
                      fontWeight: "bold", 
                      color: "#666",
                      marginBottom: "8px"
                    }}>
                      3
                    </div>
                    <div style={{ 
                      fontSize: "14px", 
                      color: "#999"
                    }}>
                      Outdated
                    </div>
                  </div>
                </Card>
              </div>
            </Col>
          </Row>

          {/* Issue Table */}
          <Card size="small">
            <Table
              dataSource={issueTableData}
              columns={issueColumns}
              pagination={false}
              size="small"
            />
          </Card>
        </div>
      </Space>
    </div>
  );
};

export default RiskIssueContent;
