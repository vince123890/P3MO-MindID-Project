import { Page } from "admiral";
import { message } from "antd";
import { generatePath, useNavigate } from "react-router";
import { useParams } from "react-router";

import { useGetData } from "@/app/_hooks/use-get-data";
import { formatStringToDate } from "@/utils/date-format";
import { FormBook } from "@protected/examples/books/_components/form";
import { bookDetail } from "../../_data";

export const Component = () => {
  const navigate = useNavigate();

  const params = useParams();
  const { data, loading } = useGetData(bookDetail(params.id));

  const handleOnFinish = () => {
    navigate("/examples/books");
    message.success("Book successfully updated");
  };

  const breadcrumb = [
    {
      label: "Books",
      path: "/books",
    },
    {
      label: data?.data?.title ?? "-",
      path: generatePath("/examples/books/:id", { id: params.id }),
    },
    {
      label: "Update",
      path: "#",
    },
  ];

  const initialValues = {
    title: data?.data?.title,
    author: data?.data?.author,
    publicationDate: formatStringToDate(data?.data?.publicationDate),
    totalCopies: data?.data?.totalCopies,
  };

  return (
    <Page
      title={`Update Book: ${data?.data?.title}`}
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/examples/books")}
    >
      <FormBook
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
