import { useParams, useNavigate } from "react-router";
import { Page } from "admiral";
import { Modal } from "antd";

import { ActivityForm } from "@/app/(protected)/projects/_components/activity-form.jsx";
import { getActivityById } from "@/app/(protected)/projects/_data/activities";

export const Component = () => {
  const { id, activityId } = useParams();
  const navigate = useNavigate();

  const activityData = getActivityById(activityId);

  const breadcrumbs = [
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Project Detail",
      path: `/projects/${id}`,
    },
    {
      label: "Current Activities",
      path: `/projects/${id}/activities`,
    },
    {
      label: `Activity ${activityData?.data?.task_id || activityId}`,
      path: `/projects/${id}/activities/${activityId}`,
    },
  ];

  if (!activityData.data) {
    return (
      <Page
        title="Activity Not Found"
        breadcrumbs={breadcrumbs}
      >
        <div>Activity not found</div>
      </Page>
    );
  }

  return (
    <Page
      title={`Activity Details - ${activityData.data.task_id}`}
      breadcrumbs={breadcrumbs}
    >
      <Modal
        title={`Activity Details - ${activityData.data.task_id}`}
        open={true}
        onCancel={() => navigate(-1)}
        footer={null}
        width={1200}
        centered
        styles={{
          body: {
            maxHeight: '80vh',
            overflowY: 'auto'
          }
        }}
      >
        <ActivityForm
          initialData={activityData.data}
          isView={true}
        />
      </Modal>
    </Page>
  );
};

export default Component;
