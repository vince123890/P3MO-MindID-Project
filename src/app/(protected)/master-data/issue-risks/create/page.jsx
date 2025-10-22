import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormIssueRisk } from "@protected/master-data/issue-risks/_components/Form";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Master Data",
      path: "/master-data",
    },
    {
      label: "Issue/Resiko",
      path: "/master-data/issue-risks",
    },
    {
      label: "Create Issue/Risk",
      path: "#",
    },
  ];

  const handleOnFinish = (values) => {
    // Automatically set status to Active when creating
    const dataWithStatus = {
      ...values,
      status: "Active",
    };
    message.success("Issue/Risk successfully created");
    navigate("/master-data/issue-risks");
  };

  return (
    <Page
      title="Add Issue/Risk"
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/master-data/issue-risks")}
    >
      <FormIssueRisk formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
    </Page>
  );
};

export default Component;
