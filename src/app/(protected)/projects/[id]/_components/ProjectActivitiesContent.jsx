import { Space, Tag, Button, Flex } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Section, DataTable } from "admiral";
import dayjs from "dayjs";
import { message } from "antd";
import { urlParser } from "@/utils/url-parser";
import { makeSource } from "@/utils/data-table";

const ProjectActivitiesContent = ({ id, activitiesData, activitiesLoading, filters }) => {
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

  // Activities table columns
  const activityColumns = [
    {
      dataIndex: "task_id",
      key: "task_id",
      title: "Task ID",
      sorter: true,
      width: 120,
    },
    {
      dataIndex: "fase",
      key: "fase",
      title: "Fase",
      sorter: true,
      width: 140,
      render: (text) => {
        const colors = {
          "Perencanaan": "blue",
          "Pengembangan": "green",
          "In HPO": "orange",
          "FID": "purple",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    {
      dataIndex: "aktivitas_bulan_sebelumnya",
      key: "aktivitas_bulan_sebelumnya",
      title: "Aktivitas Bulan Sebelumnya",
      sorter: true,
      ellipsis: true,
      width: 250,
    },
    {
      dataIndex: "status_bulan_sebelumnya",
      key: "status_bulan_sebelumnya",
      title: "Status Sebelumnya",
      sorter: true,
      width: 140,
      render: (text) => {
        const colors = {
          "Not Started": "default",
          "In Progress": "blue",
          "Completed": "green",
          "On Hold": "orange",
          "Cancelled": "red",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    {
      dataIndex: "aktivitas_bulan_berjalan",
      key: "aktivitas_bulan_berjalan",
      title: "Aktivitas Bulan Berjalan",
      sorter: true,
      ellipsis: true,
      width: 250,
    },
    {
      dataIndex: "status_bulan_berjalan",
      key: "status_bulan_berjalan",
      title: "Status Berjalan",
      sorter: true,
      width: 140,
      render: (text) => {
        const colors = {
          "Not Started": "default",
          "In Progress": "blue",
          "Completed": "green",
          "On Hold": "orange",
          "Cancelled": "red",
        };
        return <Tag color={colors[text] || "default"}>{text}</Tag>;
      },
    },
    {
      dataIndex: "pic_aktivitas",
      key: "pic_aktivitas",
      title: "PIC",
      sorter: true,
      width: 140,
    },
    {
      dataIndex: "milestone",
      key: "milestone",
      title: "Milestone",
      sorter: true,
      width: 100,
      render: (milestone) => (
        <Tag color={milestone ? "gold" : "default"}>
          {milestone ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      dataIndex: "tanggal_aktivitas",
      key: "tanggal_aktivitas",
      title: "Tanggal Aktivitas",
      sorter: true,
      width: 140,
      render: (date) => date ? dayjs(date).format("DD/MM/YYYY") : "-",
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
              to={urlParser("/projects/:id/activities/:activityId", {
                id: id,
                activityId: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} size="small">
                View
              </Button>
            </Link>
            <Link
              to={urlParser("/projects/:id/activities/:activityId/update", {
                id: id,
                activityId: record.id,
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
                message.success("Activity successfully deleted");
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
      {/* Activities List with Create Button */}
      <Section
        title="Current Activities"
        extra={
          <Link to={urlParser("/projects/:id/activities/create", { id })}>
            <Button type="primary" icon={<PlusOutlined />}>
              Add New Activity
            </Button>
          </Link>
        }
      >
        <DataTable
          rowKey="id"
          loading={activitiesLoading || activitiesData.loading}
          source={makeSource(activitiesData.data)}
          columns={activityColumns}
          search={getSearchValue()}
          hideSearch
          showRowSelection={false}
        />
      </Section>
    </Space>
  );
};

export default ProjectActivitiesContent;
