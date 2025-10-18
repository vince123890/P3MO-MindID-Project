import { Page, Section } from "admiral";
import { Space, Button, Descriptions, Flex, message, Table } from "antd";
import { generatePath, Link, useNavigate } from "react-router";
import { Typography } from "antd";
import { useParams } from "react-router";

import { formatDate } from "@/utils/date-format";
import { useGetData } from "@/app/_hooks/use-get-data";
import { bookDetail } from "../_data";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(bookDetail(params.id));

  const breadcrumbs = [
    {
      label: "Books",
      path: "/examples/books",
    },
    {
      label: data?.data?.title || "",
      path: "#",
    },
  ];

  const items = [
    {
      key: "title",
      label: "Title",
      children: <Typography.Text strong>{data?.data?.title ?? "-"}</Typography.Text>,
    },
    {
      key: "author",
      label: "Author",
      children: <Typography.Text strong>{data?.data?.author ?? "-"}</Typography.Text>,
    },
    {
      key: "publicationDate",
      label: "Publication Date",
      children: (
        <Typography.Text strong>{formatDate(data?.data?.publicationDate) ?? "-"}</Typography.Text>
      ),
    },
    {
      key: "totalCopies",
      label: "Total Copies",
      children: <Typography.Text strong>{data?.data?.totalCopies ?? "-"}</Typography.Text>,
    },
  ];

  return (
    <Page
      topActions={
        <Flex gap={10}>
          <Button
            htmlType="button"
            onClick={() => {
              message.success("Book successfully deleted");
              navigate("/examples/books");
            }}
            danger
          >
            Delete
          </Button>
          <Link
            to={generatePath("/examples/books/:id/update", {
              id: params.id,
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title={`Book Details: ${data?.data?.title || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/examples/books")}
      noStyle
    >
      <Section loading={loading}>
        <Space style={{ width: "100%" }} direction="vertical" size="middle">
          <Section title="Book Information">
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
          <Section title="Borrowing History">
            <Table
              columns={[
                {
                  dataIndex: "borrower",
                  title: "Borrower",
                  key: "borrower",
                  sorter: true,
                },
                {
                  dataIndex: "borrowDate",
                  title: "Borrow Date",
                  key: "borrowDate",
                  render: (_, record) => {
                    return formatDate(record.borrowDate);
                  },
                },
                {
                  dataIndex: "returnDate",
                  title: "Return Date",
                  key: "returnDate",
                  render: (_, record) => {
                    return formatDate(record.returnDate);
                  },
                },
              ]}
              dataSource={[]}
              pagination={false}
            />
          </Section>
        </Space>
      </Section>
    </Page>
  );
};

export default Component;
