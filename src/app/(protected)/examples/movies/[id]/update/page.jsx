import { Page } from "admiral";
import { message } from "antd";
import { generatePath, useNavigate } from "react-router";
import { useParams } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { FormMovie } from "@protected/examples/movies/_components/form";
import { movieDetail } from "@protected/examples/movies/_data/";
import { formatStringToDate } from "@/utils/date-format";

export const Component = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { data, loading } = useGetData(movieDetail(params.id));

  const handleOnFinish = () => {
    navigate("/movies");
    message.success("Movie successfully updated");
  };

  const breadcrumb = [
    {
      label: "Movies",
      path: "/movies",
    },
    {
      label: data?.data?.title ?? "-",
      path: generatePath("/examples/movies/:id", { id: params.id }),
    },
    {
      label: "Update",
      path: "#",
    },
  ];

  const initialValues = {
    title: data?.data?.title,
    director: data?.data?.director,
    releaseDate: formatStringToDate(data?.data?.releaseDate),
    totalCopies: data?.data?.totalCopies,
  };

  return (
    <Page
      title={`Update Movie: ${data?.data?.title}`}
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/examples/movies")}
    >
      <FormMovie
        isEdit
        key={data?.data?.id}
        formProps={{
          onFinish: handleOnFinish,
          initialValues,
          disabled: loading,
        }}
        error={null}
        loading={loading}
      />
    </Page>
  );
};

export default Component;
