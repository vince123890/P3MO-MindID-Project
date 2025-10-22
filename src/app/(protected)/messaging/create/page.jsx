import { message } from "antd";
import { Page } from "admiral";
import { useNavigate } from "react-router";

import { FormMessaging } from "@protected/messaging/_components/Form";

export const Component = () => {
  const navigate = useNavigate();
  const breadcrumb = [
    {
      label: "Messaging",
      path: "/messaging",
    },
    {
      label: "Compose Message",
      path: "#",
    },
  ];

  const handleOnFinish = (values) => {
    // Automatically set status to Sent when creating/sending
    const dataWithStatus = {
      ...values,
      status: "Sent",
    };
    message.success("Message successfully sent");
    navigate("/messaging");
  };

  return (
    <Page
      title="Compose Message"
      breadcrumbs={breadcrumb}
      noStyle
      goBack={() => navigate("/messaging")}
    >
      <FormMessaging formProps={{ onFinish: handleOnFinish }} error={null} loading={false} />
    </Page>
  );
};

export default Component;
