import { Space, Table } from "antd";
import { FileOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Section } from "admiral";
import dayjs from "dayjs";

const FeasibilityContent = ({ project }) => {
  // Add null check for project
  if (!project) {
    return <div>Loading project data...</div>;
  }

  // Format currency for display
  const formatCurrency = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return "Rp 0";
    }
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  // Document table columns
  const documentColumns = [
    {
      title: "Document Name",
      dataIndex: "document_name",
      key: "document_name",
      render: (text) => (
        <Space>
          <FileOutlined style={{ color: "#1890ff" }} />
          {text}
        </Space>
      ),
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size",
    },
    {
      title: "Upload Date",
      dataIndex: "upload_date",
      key: "upload_date",
      render: (date) => date ? dayjs(date).format("DD/MM/YYYY HH:mm") : "-",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button 
          type="link" 
          icon={<DownloadOutlined />} 
          size="small"
        >
          Download
        </Button>
      ),
    },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Basic Information Section */}
      <Section>
        <Section title="Basic Information">
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Investment Name</label>
                <div style={{ 
                  padding: "8px 12px", 
                  border: "1px solid #d9d9d9", 
                  borderRadius: "6px", 
                  backgroundColor: "#f5f5f5" 
                }}>
                  {project?.business_initiative_name || "-"}
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Company</label>
                <div style={{ 
                  padding: "8px 12px", 
                  border: "1px solid #d9d9d9", 
                  borderRadius: "6px", 
                  backgroundColor: "#f5f5f5" 
                }}>
                  {project?.company || "-"}
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Investment Code</label>
                <div style={{ 
                  padding: "8px 12px", 
                  border: "1px solid #d9d9d9", 
                  borderRadius: "6px", 
                  backgroundColor: "#f5f5f5" 
                }}>
                  {project?.project_code || "-"}
                </div>
              </div>
            </div>
          </Space>
        </Section>
      </Section>

      {/* Financial Estimates Section */}
      <Section>
        <Section title="Financial Estimates">
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>CAPEX (nominal)</label>
                <div style={{ 
                  padding: "8px 12px", 
                  border: "1px solid #d9d9d9", 
                  borderRadius: "6px", 
                  backgroundColor: "#f5f5f5" 
                }}>
                  {formatCurrency(project?.capex_estimate)}
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>OPEX (Nominal)</label>
                <div style={{ 
                  padding: "8px 12px", 
                  border: "1px solid #d9d9d9", 
                  borderRadius: "6px", 
                  backgroundColor: "#f5f5f5" 
                }}>
                  {formatCurrency(project?.opex_estimate_yearly)}
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>NPV</label>
                <div style={{ 
                  padding: "8px 12px", 
                  border: "1px solid #d9d9d9", 
                  borderRadius: "6px", 
                  backgroundColor: "#f5f5f5" 
                }}>
                  {formatCurrency(project?.npv_estimate)}
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>IRR</label>
                <div style={{ 
                  padding: "8px 12px", 
                  border: "1px solid #d9d9d9", 
                  borderRadius: "6px", 
                  backgroundColor: "#f5f5f5" 
                }}>
                  {project?.irr_estimate || 0}%
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Currency</label>
                <div style={{ 
                  padding: "8px 12px", 
                  border: "1px solid #d9d9d9", 
                  borderRadius: "6px", 
                  backgroundColor: "#f5f5f5" 
                }}>
                  {project?.currency || "-"}
                </div>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Discount Rate</label>
                <div style={{ 
                  padding: "8px 12px", 
                  border: "1px solid #d9d9d9", 
                  borderRadius: "6px", 
                  backgroundColor: "#f5f5f5" 
                }}>
                  {project?.discount_rate || 0}%
                </div>
              </div>
            </div>
          </Space>
        </Section>
      </Section>

      {/* Business Partners Section */}
      <Section>
        <Section title="Business Partners">
          <Space direction="vertical" size="small" style={{ width: "100%" }}>
            <div>
              <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Teknologi Lisensor</label>
              <div style={{ 
                padding: "8px 12px", 
                border: "1px solid #d9d9d9", 
                borderRadius: "6px", 
                backgroundColor: "#f5f5f5" 
              }}>
                {project?.technology_licensor || "-"}
              </div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Raw Material Supplier</label>
              <div style={{ 
                padding: "8px 12px", 
                border: "1px solid #d9d9d9", 
                borderRadius: "6px", 
                backgroundColor: "#f5f5f5" 
              }}>
                {project?.raw_material_suppliers || "-"}
              </div>
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Offtaker</label>
              <div style={{ 
                padding: "8px 12px", 
                border: "1px solid #d9d9d9", 
                borderRadius: "6px", 
                backgroundColor: "#f5f5f5" 
              }}>
                {project?.offtaker || "-"}
              </div>
            </div>
          </Space>
        </Section>
      </Section>

      {/* Project Objectives Section */}
      <Section>
        <Section title="Project Objectives">
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Sasaran (penjelasan)</label>
            <div style={{ 
              padding: "8px 12px", 
              border: "1px solid #d9d9d9", 
              borderRadius: "6px", 
              backgroundColor: "#f5f5f5",
              minHeight: "80px",
              whiteSpace: "pre-wrap"
            }}>
              {project?.sasaran_penjelasan || "-"}
            </div>
          </div>
        </Section>
      </Section>

      {/* Supporting Documents Section */}
      <Section>
        <Section title="Dokumen Pendukung">
          <Table
            columns={documentColumns}
            dataSource={project?.dokumen_pendukung || []}
            pagination={false}
            size="small"
            locale={{ emptyText: "No documents uploaded" }}
          />
        </Section>
      </Section>

      {/* Remarks Section */}
      <Section>
        <Section title="Keterangan">
          <div>
            <label style={{ display: "block", marginBottom: "4px", fontWeight: "bold" }}>Keterangan</label>
            <div style={{ 
              padding: "8px 12px", 
              border: "1px solid #d9d9d9", 
              borderRadius: "6px", 
              backgroundColor: "#f5f5f5",
              minHeight: "80px",
              whiteSpace: "pre-wrap"
            }}>
              {project?.keterangan || "No remarks provided"}
            </div>
          </div>
        </Section>
      </Section>
    </Space>
  );
};

export default FeasibilityContent;
