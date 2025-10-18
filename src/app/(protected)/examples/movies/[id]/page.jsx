import { Page, Section } from "admiral";
import { Typography, Button, Descriptions, Flex, message } from "antd";
import { generatePath, Link, useNavigate } from "react-router";
import { useParams } from "react-router";

import { formatDate } from "@/utils/date-format";
import { useGetData } from "@/app/_hooks/use-get-data";
import { movieDetail } from "@protected/examples/movies/_data/";

export const Component = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data, loading } = useGetData(movieDetail(params.id));

  const breadcrumbs = [
    {
      label: "Movies",
      path: "/examples/movies",
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
      key: "director",
      label: "Director",
      children: <Typography.Text strong>{data?.data?.director ?? "-"}</Typography.Text>,
    },
    {
      key: "releaseDate",
      label: "Release Date",
      children: (
        <Typography.Text strong>{formatDate(data?.data?.releaseDate) ?? "-"}</Typography.Text>
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
              message.success("Movie successfully deleted");
              navigate("/movies");
            }}
            danger
          >
            Delete
          </Button>
          <Link
            to={generatePath("/examples/movies/:id/update", {
              id: params.id,
            })}
          >
            <Button htmlType="button" type="primary">
              Edit
            </Button>
          </Link>
        </Flex>
      }
      title={`Movie Details: ${data?.data?.title || ""}`}
      breadcrumbs={breadcrumbs}
      goBack={() => navigate("/examples/movies")}
      noStyle
    >
      <Section loading={loading}>
        <Section title="Movie Information">
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
      </Section>
    </Page>
  );
};

export default Component;
