import { Typography, Card, Row, Col, Space, Alert, Input, Button } from "antd";
import { 
  WarningOutlined, 
  FallOutlined, 
  FilterOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TextArea } = Input;

const FinancialPerformanceContent = ({ project }) => {
  // Financial metrics data
  const alertMetrics = [
    {
      icon: <WarningOutlined style={{ color: "#faad14" }} />,
      text: "Q2 Cost $850K (Plan: $750K)",
      type: "warning"
    },
    {
      icon: <FallOutlined style={{ color: "#ff4d4f" }} />,
      text: "NPV: $2.8M (-8% vs Baseline)",
      type: "danger"
    },
    {
      icon: <WarningOutlined style={{ color: "#faad14" }} />,
      text: "IRR: 11.5% (Hurdle: 14%)",
      type: "warning"
    },
    {
      icon: <WarningOutlined style={{ color: "#faad14" }} />,
      text: "DER: 2.7 (Threshold: 2.5)",
      type: "warning"
    }
  ];

  const financialMetrics = [
    {
      title: "NPV",
      currentValue: "$3.2M",
      fidValue: "$3.5M",
      change: "8.6%",
      changeType: "decrease",
      color: "#ff4d4f"
    },
    {
      title: "IRR",
      currentValue: "12.8%",
      fidValue: "14.2%",
      change: "1.4%",
      changeType: "decrease",
      color: "#ff4d4f"
    },
    {
      title: "EXCHANGE RATE",
      currentValue: "IDR 15,250",
      fidValue: "IDR 14,800",
      change: "3.0%",
      changeType: "increase",
      color: "#ff4d4f"
    },
    {
      title: "COMMODITY PRICE",
      currentValue: "$85/bbl",
      fidValue: "$78/bbl",
      change: "9.0%",
      changeType: "increase",
      color: "#52c41a"
    },
    {
      title: "DER",
      currentValue: "2.4x",
      fidValue: "2.1x",
      change: "14.3%",
      changeType: "increase",
      color: "#ff4d4f"
    }
  ];

  return (
    <div style={{ padding: "8px", backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Top Row */}
        <Row gutter={16}>
          {/* Distribution */}
          <Col span={4}>
            <Card
              size="small"
              style={{ 
                minHeight: "200px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              bodyStyle={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                height: "100%"
              }}
            >
              <Title level={5} style={{ margin: 0, color: "#666" }}>
                Distribution
              </Title>
            </Card>
          </Col>

          {/* Spending Timeline */}
          <Col span={12}>
            <Card
              size="small"
              style={{ 
                minHeight: "200px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
              bodyStyle={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                height: "100%"
              }}
            >
              <Title level={4} style={{ margin: 0, color: "#333" }}>
                Spending Timeline
              </Title>
            </Card>
          </Col>

          {/* Alert Section */}
          <Col span={8}>
            <Card
              title={
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Alert</span>
                  <FilterOutlined style={{ color: "#666", fontSize: "14px" }} />
                </div>
              }
              size="small"
              style={{ minHeight: "200px" }}
              bodyStyle={{ padding: "16px" }}
            >
              <Space direction="vertical" size="small" style={{ width: "100%" }}>
                {alertMetrics.map((metric, index) => (
                  <div key={index} style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "8px",
                    fontSize: "13px"
                  }}>
                    {metric.icon}
                    <span>{metric.text}</span>
                  </div>
                ))}
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Bottom Row */}
        <Row gutter={16}>
          {/* Financial Metrics Cards */}
          <Col span={24}>
            <Row gutter={[16, 16]}>
              {financialMetrics.map((metric, index) => (
                <Col span={index < 2 ? 12 : 8} key={index}>
                  <Card
                    size="small"
                    style={{ 
                      textAlign: "center",
                      minHeight: "120px"
                    }}
                    bodyStyle={{ padding: "16px" }}
                  >
                    <div style={{ 
                      fontSize: "16px", 
                      fontWeight: "bold", 
                      marginBottom: "8px",
                      color: "#333"
                    }}>
                      {metric.currentValue}
                    </div>
                    <div style={{ 
                      fontSize: "12px", 
                      color: "#666",
                      marginBottom: "4px"
                    }}>
                      {metric.title}
                    </div>
                    <div style={{ 
                      fontSize: "11px", 
                      color: "#999",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "4px"
                    }}>
                      <span>FID: {metric.fidValue}</span>
                      <span>|</span>
                      <span style={{ color: metric.color, display: "flex", alignItems: "center", gap: "2px" }}>
                        {metric.changeType === "increase" ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                        {metric.change}
                      </span>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Space>
    </div>
  );
};

export default FinancialPerformanceContent;
