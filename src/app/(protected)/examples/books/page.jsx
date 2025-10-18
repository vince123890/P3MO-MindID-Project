import { Button, Flex, message } from "antd";
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Page, DataTable } from "admiral";
import dayjs from "dayjs";

import { makeSource } from "@/utils/data-table";
import { useFilter } from "@/app/_hooks/datatable/use-filter";
import { urlParser } from "@/utils/url-parser";
import { useGetData } from "@/app/_hooks/use-get-data";
import { formatDate } from "@/utils/date-format";
import { allBooks } from "./_data";

export const Component = () => {
  const { handleChange, filters } = useFilter();

  const allBooksData = useGetData(allBooks);

  const allBookColumns = [
    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      sorter: true,
      render: (_, record) => (
        <Link to={record.id}>
          <u>{record.title}</u>
        </Link>
      ),
    },
    {
      dataIndex: "publicationDate",
      title: "Publication Date",
      key: "publicationDate",
      sorter: true,
      render: (_, record) => {
        return formatDate(record.publicationDate);
      },
    },
    {
      dataIndex: "author",
      title: "Author",
      key: "author",
      sorter: true,
    },
    {
      dataIndex: "totalCopies",
      title: "Total Copies",
      key: "totalCopies",
      sorter: true,
    },
    {
      dataIndex: "Action",
      title: "Action",
      key: "Action",
      render: (_, record) => {
        return (
          <Flex>
            <Link
              to={urlParser("/examples/books/:id", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EyeOutlined style={{ color: "green" }} />} />
            </Link>
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                message.success("Book successfully deleted");
              }}
            />
            <Link
              to={urlParser("/examples/books/:id/update", {
                id: record.id,
              })}
            >
              <Button type="link" icon={<EditOutlined />} />
            </Link>
          </Flex>
        );
      },
    },
  ];

  const breadcrumbs = [
    {
      label: "Books",
      path: "/examples/books",
    },
  ];

  return (
    <Page
      title="Books"
      breadcrumbs={breadcrumbs}
      topActions={
        <Link to={"/examples/books/create"}>
          <Button icon={<PlusCircleOutlined />}>Add Book</Button>
        </Link>
      }
      noStyle
    >
      <DataTable
        filterComponents={[
          {
            label: "filter",
            name: "source",
            type: "CheckboxDropdown",
            placeholder: "Select Author",
            width: 140,
            defaultValue: filters.author,
            options: [
              { label: "Harper Lee", value: "Harper Lee" },
              { label: "George Orwell", value: "George Orwell" },
              { label: "Jane Austen", value: "Jane Austen" },
              { label: "J.R.R. Tolkien", value: "J.R.R. Tolkien" },
            ],
          },
          {
            label: "filter",
            name: "range",
            type: "DateRangePicker",
            width: 230,
            defaultValue:
              typeof filters.range?.[0] === "number"
                ? [dayjs(dayjs.unix(filters.range[0])), dayjs(dayjs.unix(filters.range[1]))]
                : [undefined, undefined],
            placeholder: ["Start", "End"],
          },
        ]}
        onChange={handleChange}
        rowKey="id"
        loading={allBooksData.loading}
        source={makeSource(allBooksData.data)}
        columns={allBookColumns}
        search={filters.search}
        showRowSelection={true}
        batchActionMenus={[
          {
            key: "delete",
            label: "Delete",
            onClick: (_values, cb) => {
              message.success("Selected books successfully deleted");
              cb.reset();
            },
            danger: true,
            icon: <DeleteOutlined />,
          },
        ]}
      />
    </Page>
  );
};

export default Component;
