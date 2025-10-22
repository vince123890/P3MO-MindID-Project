import { Space, Tag, Button, Flex } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Section, DataTable } from "admiral";
import dayjs from "dayjs";
import { message } from "antd";
import { urlParser } from "@/utils/url-parser";
import { makeSource } from "@/utils/data-table";

const ProjectRisksContent = ({ id, risksData, risksLoading, filters }) => {
  // Safe filter value extraction with error handling
  const getSearchValue = () => {
    try {
      if (!filters) return "";
      if (typeof filters.search === 'string') return filters.search;
      if (filters.search && typeof filters.search.toString === 'function') {
        return filters.search.toString();
      }
      return "";
    } catch (error) {
      console.warn("Error extracting search value:", error);
      return "";
    }
  };

  // Risks table columns
  const riskColumns = [
    {
      dataIndex: "nomor_resiko",
      key: "nomor_resiko",
      title: "Taksonomi Resiko",
      sorter: true,
      width: 150,
    },
    {
      dataIndex: "deskripsi_resiko",
      key: "deskripsi_resiko",
      title: "Deskripsi Resiko",
      sorter: true,
      ellipsis: true,
      width: 300,
    },
    {
      dataIndex: "dampak_resiko",
      key: "dampak_resiko",
      title: "Dampak Resiko",
      sorter: true,
      ellipsis: true,
      width: 250,
    },
    {
      dataIndex: "level_resiko",
      key: "level_resiko",
      title: "Level Resiko",
      sorter: true,
      width: 140,
      render: (_, record) => {
        const level = `${record.prioritas_resiko} (${record.skor_resiko}/10)`;
        const colors = {
          "Critical": "red",
          "High": "orange",
          "Medium": "gold",
          "Low": "green",
        };
        return <Tag color={colors[record.prioritas_resiko] || "default"}>{level}</Tag>;
      },
    },
    {
      dataIndex: "rencana_mitigasi",
      key: "rencana_mitigasi",
      title: "Mitigasi Resiko",
      sorter: true,
      ellipsis: true,
      width: 250,
    },
    {
      dataIndex: "deadline_mitigasi",
      key: "deadline_mitigasi",
      title: "Deadline",
      sorter: true,
      width: 140,
      render: (date) => date ? dayjs(date).format("DD/MM/YYYY") : "-",
    },
    {
      dataIndex: "pic",
      key: "pic",
      title: "PIC",
      sorter: true,
      width: 140,
    },
    {
      dataIndex: "status_mitigasi",
      key: "status_mitigasi",
      title: "Status",
      sorter: true,
      width: 120,
      render: (text) => {
        const colors = {
          "Open": "red",
          "In Progress": "blue",
          "Completed": "green",
          "On Hold": "orange",
          "Cancelled": "default",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      width: 200,
      render: (_, record) => {
        return (
          <Flex>
            <Link
              to={urlParser("/projects/:id/risks/:riskId", {
                id: id,
                riskId: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} size="small">
                View
              </Button>
            </Link>
            <Link
              to={urlParser("/projects/:id/risks/:riskId/update", {
                id: id,
                riskId: record.id,
              })}
            >
              <Button type="link" icon={<EditOutlined />} size="small">
                Edit
              </Button>
            </Link>
            <Button
              type="link"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              size="small"
              onClick={() => {
                message.success("Risk successfully deleted");
              }}
            >
              Delete
            </Button>
          </Flex>
        );
      },
    },
  ];

  return (
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
      {/* Risks List with Create Button */}
      <Section
        title="Project Risks"
        extra={
          <Link to={urlParser("/projects/:id/risks/create", { id })}>
            <Button type="primary" icon={<PlusOutlined />}>
              Create Risk
            </Button>
          </Link>
        }
      >
        <DataTable
          rowKey="id"
          loading={risksLoading || risksData.loading}
          source={makeSource(risksData.data)}
          columns={riskColumns}
          search={getSearchValue()}
          hideSearch
          showRowSelection={false}
        />
      </Section>
    </Space>
  );
};

export default ProjectRisksContent;
