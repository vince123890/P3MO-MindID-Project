import { FileExclamationOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { Typography } from "antd";

const SummaryCard = () => {
  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "8px",
        border: "1px solid rgba(0, 0, 0, 0.06)",
      }}
    >
      <Space size="middle" style={{ width: "100%" }}>
        <div
          style={{
            position: "relative",
            width: "32px",
            height: "32px",
            backgroundColor: "#FFF1F0",
            borderRadius: "8px",
          }}
        >
          <FileExclamationOutlined
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#CF1322",
              fontSize: "14px",
            }}
          />
        </div>
        <Space direction="vertical" size="small">
          <Typography.Text strong>Non PO Transaction</Typography.Text>
          <Typography.Text type="secondary">2 Transaction</Typography.Text>
        </Space>
      </Space>
    </div>
  );
};

export default SummaryCard;
