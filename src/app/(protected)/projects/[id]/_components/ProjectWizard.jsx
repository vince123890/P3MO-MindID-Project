import { useState } from "react";
import { Space, Row, Col, Typography, Button } from "antd";
import { 
  TrophyOutlined, 
  ExclamationCircleOutlined, 
  BarChartOutlined, 
  DollarOutlined, 
  BugOutlined, 
  ProjectOutlined,
  CheckOutlined,
  CloseOutlined
} from "@ant-design/icons";
import { Tabs } from "admiral";

// Import all wizard content components
import HighlightProjectContent from './HighlightProjectContent.jsx';
import CriticalTaskContent from './CriticalTaskContent.jsx';
import SCurveEVMContent from './SCurveEVMContent.jsx';
import FinancialPerformanceContent from './FinancialPerformanceContent.jsx';
import RiskIssueContent from './RiskIssueContent.jsx';

const { Title, Text } = Typography;

const ProjectWizard = ({ project, existingTabItems, handleSubmit, handleApproval }) => {
  const [currentStep, setCurrentStep] = useState(5); // Default to "Project" tab (index 5)

  const wizardSteps = [
    {
      title: 'Highlight Project',
      icon: <TrophyOutlined />,
      content: <HighlightProjectContent project={project} />
    },
    {
      title: 'Critical Task',
      icon: <ExclamationCircleOutlined />,
      content: <CriticalTaskContent project={project} />
    },
    {
      title: 'SCurve & EVM',
      icon: <BarChartOutlined />,
      content: <SCurveEVMContent project={project} />
    },
    {
      title: 'Financial Performance',
      icon: <DollarOutlined />,
      content: <FinancialPerformanceContent project={project} />
    },
    {
      title: 'Risk & Issue',
      icon: <BugOutlined />,
      content: <RiskIssueContent project={project} />
    },
    {
      title: 'Project',
      icon: <ProjectOutlined />,
      content: (
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Project Header with Title and Action Buttons */}
          <Row justify="space-between" align="middle" style={{ 
            padding: "16px 0", 
            borderBottom: "1px solid #f0f0f0" 
          }}>
            <Col>
              <Title level={4} style={{ margin: 0 }}>
                {project?.business_initiative_name || "Project Detail"}
              </Title>
              <Text type="secondary">
                {project?.project_code} • {project?.company}
              </Text>
            </Col>
            <Col>
              <Space>
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
                <Button 
                  type="primary" 
                  icon={<CheckOutlined />}
                  style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                  onClick={() => handleApproval('approve')}
                >
                  Approve
                </Button>
                <Button 
                  danger 
                  icon={<CloseOutlined />}
                  onClick={() => handleApproval('reject')}
                >
                  Reject
                </Button>
              </Space>
            </Col>
          </Row>

          {/* Project Content Tabs */}
          <Tabs
            type="bordered-card"
            defaultActiveKey="data-input"
            items={existingTabItems}
          />
        </Space>
      )
    }
  ];

  const wizardTabItems = wizardSteps.map((step, index) => ({
    key: index.toString(),
    label: (
      <Space>
        {step.icon}
        {step.title}
      </Space>
    ),
    children: (
      <div style={{ minHeight: '400px' }}>
        {step.content}
      </div>
    ),
  }));

  return (
    <Tabs
      type="card"
      activeKey={currentStep.toString()}
      onChange={(key) => setCurrentStep(parseInt(key))}
      items={wizardTabItems}
      tabBarStyle={{ 
        marginBottom: '16px',
        backgroundColor: '#e6f7ff',
        borderRadius: '8px',
        padding: '8px',
        border: '1px solid #91d5ff'
      }}
      style={{
        '--tab-bg': '#e6f7ff',
        '--tab-active-bg': '#1890ff',
        '--tab-active-color': '#ffffff',
        '--tab-hover-bg': '#bae7ff',
      }}
    />
  );
};

export default ProjectWizard;
