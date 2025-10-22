import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Page } from "admiral";
import { Modal, message, Form } from "antd";

import { ActivityForm } from "@/app/(protected)/projects/_components/activity-form.jsx";
import { getActivityById, projectActivities } from "@/app/(protected)/projects/_data/activities.js";

export const Component = () => {
  const { id, activityId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    const fetchActivityData = async () => {
      setLoading(true);
      try {
        const response = await getActivityById(activityId);
        if (response.data) {
          setActivityData(response.data);
        } else {
          message.error("Activity not found");
          navigate(`/projects/${id}`);
        }
      } catch (error) {
        message.error("Failed to fetch activity data");
        navigate(`/projects/${id}`);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityData();
  }, [activityId, id, navigate]);

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
      label: `Edit Activity ${activityData?.task_id || activityId}`,
      path: `/projects/${id}/activities/${activityId}/update`,
    },
  ];

  const handleFinish = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Find the activity index in the array
        const activityIndex = projectActivities.data.items.findIndex(item => item.id === activityId);
        
        if (activityIndex !== -1) {
          // Update the activity data
          projectActivities.data.items[activityIndex] = {
            ...projectActivities.data.items[activityIndex],
            ...values,
            updated_at: new Date().toISOString(),
          };
          
          message.success("Activity updated successfully");
          navigate(`/projects/${id}`);
        } else {
          message.error("Activity not found");
        }
      } catch (error) {
        message.error("Failed to update activity");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Page
      title={`Edit Activity - ${activityData?.task_id || 'Loading...'}`}
      breadcrumbs={breadcrumbs}
      loading={loading}
    >
      <Modal
        title={`Edit Activity - ${activityData?.task_id || 'Loading...'}`}
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
          formProps={{
            form,
            onFinish: handleFinish,
          }}
          initialData={activityData}
          loading={loading}
          isEdit={true}
          onSubmit={handleFinish}
        />
      </Modal>
    </Page>
  );
};

export default Component;
