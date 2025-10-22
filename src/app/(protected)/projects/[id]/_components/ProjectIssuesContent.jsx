import { Space, Tag, Button, Flex } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Section, DataTable } from "admiral";
import dayjs from "dayjs";
import { message } from "antd";
import { urlParser } from "@/utils/url-parser";
import { makeSource } from "@/utils/data-table";

const ProjectIssuesContent = ({ id, issuesData, issuesLoading, filters }) => {
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

  // Issues table columns
  const issueColumns = [
    {
      dataIndex: "wbs_task_id",
      key: "wbs_task_id",
      title: "WBS/Task ID",
      sorter: true,
      width: 150,
    },
    {
      dataIndex: "aktivitas_master_schedule",
      key: "aktivitas_master_schedule",
      title: "Aktivitas di Master Schedule",
      sorter: true,
      ellipsis: true,
      width: 250,
    },
    {
      dataIndex: "kategori_issue",
      key: "kategori_issue",
      title: "Kategori Issue",
      sorter: true,
      width: 160,
      render: (text) => {
        const colors = {
          "Technical": "blue",
          "Logistical": "orange", 
          "Environmental": "green",
          "Resource": "purple",
          "Safety": "red",
          "Financial": "gold",
          "Regulatory": "cyan",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    {
      dataIndex: "tipe_issue",
      key: "tipe_issue",
      title: "Tipe Issue",
      sorter: true,
      width: 160,
    },
    {
      dataIndex: "deskripsi_issue",
      key: "deskripsi_issue",
      title: "Deskripsi Issue",
      sorter: true,
      ellipsis: true,
      width: 300,
    },
    {
      dataIndex: "progress_update",
      key: "progress_update",
      title: "Progress Update",
      sorter: true,
      ellipsis: true,
      width: 250,
    },
    {
      dataIndex: "deadline",
      key: "deadline",
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
      dataIndex: "status_issue",
      key: "status_issue",
      title: "Status",
      sorter: true,
      width: 120,
      render: (text) => {
        const colors = {
          "Open": "red",
          "In Progress": "blue",
          "Resolved": "green",
          "Closed": "default",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    {
      dataIndex: "prioritas_issue",
      key: "prioritas_issue",
      title: "Priority",
      sorter: true,
      width: 120,
      render: (text) => {
        const colors = {
          "High": "red",
          "Medium": "orange",
          "Low": "green",
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
              to={urlParser("/projects/:id/issues/:issueId", {
                id: id,
                issueId: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} size="small">
                View
              </Button>
            </Link>
            <Link
              to={urlParser("/projects/:id/issues/:issueId/update", {
                id: id,
                issueId: record.id,
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
                message.success("Issue successfully deleted");
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
      {/* Issues List with Create Button */}
      <Section
        title="Project Issues"
        extra={
          <Link to={urlParser("/projects/:id/issues/create", { id })}>
            <Button type="primary" icon={<PlusOutlined />}>
              Create Issue
            </Button>
          </Link>
        }
      >
        <DataTable
          rowKey="id"
          loading={issuesLoading || issuesData.loading}
          source={makeSource(issuesData.data)}
          columns={issueColumns}
          search={getSearchValue()}
          hideSearch
          showRowSelection={false}
        />
      </Section>
    </Space>
  );
};

export default ProjectIssuesContent;
