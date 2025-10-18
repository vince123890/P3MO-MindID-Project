import { Page, Section } from "admiral";
import { Space, Descriptions, Table, Tag, Typography } from "antd";
import { useNavigate } from "react-router";
import { useParams } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { productLendingDetail } from "../_data";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(productLendingDetail(params.id));

  const getStatusColor = (status) => {
    switch (status) {
      case "Available":
        return "green";
      case "Limited":
        return "orange";
      case "Out of Stock":
        return "red";
      default:
        return "default";
    }
  };

  const breadcrumbs = [
    {
      label: "Product Lending",
      path: "/example-landing",
    },
    {
      label: data?.data?.name || "",
      path: "#",
    },
  ];

  const items = [
    {
      key: "code",
      label: "Code",
      children: <Typography.Text strong>{data?.data?.code ?? "-"}</Typography.Text>,
    },
    {
      key: "name",
      label: "Name",
      children: <Typography.Text strong>{data?.data?.name ?? "-"}</Typography.Text>,
    },
    {
      key: "qty",
      label: "Qty",
      children: <Typography.Text strong>{data?.data?.qty ?? "-"}</Typography.Text>,
    },
    {
      key: "status",
      label: "Status",
      children: data?.data?.status ? (
        <Tag color={getStatusColor(data.data.status)}>{data.data.status}</Tag>
      ) : (
        "-"
      ),
    },
    {
      key: "category",
      label: "Category",
      children: <Typography.Text strong>{data?.data?.category ?? "-"}</Typography.Text>,
    },
  ];

  const itemColumns = [
    {
      dataIndex: "name",
      title: "Name",
      key: "name",
    },
  ];

  return (
    <Page
      title={`Product Details: ${data?.data?.name || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/example-landing")}
      noStyle
    >
      <Section loading={loading}>
        <Space style={{ width: "100%" }} direction="vertical" size="middle">
          <Section title="General Information">
            <Descriptions
              bordered
              layout="horizontal"
              items={items}
              column={{
                md: 1,
                lg: 2,
                xl: 2,
                xxl: 2,
              }}
            />
          </Section>
          <Section title="List Items">
            <Table
              columns={itemColumns}
              dataSource={data?.data?.items || []}
              pagination={false}
              rowKey="id"
            />
          </Section>
        </Space>
      </Section>
    </Page>
  );
};

export default Component;
