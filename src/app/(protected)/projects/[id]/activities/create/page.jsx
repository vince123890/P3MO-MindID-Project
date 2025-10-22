import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Page } from "admiral";
import { Modal, message, Form } from "antd";

import { ActivityForm } from "@/app/(protected)/projects/_components/activity-form.jsx";
import { projectActivities } from "@/app/(protected)/projects/_data/activities.js";

export const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

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
      label: "Create Activity",
      path: `/projects/${id}/activities/create`,
    },
  ];

  const handleFinish = (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Generate new activity ID
        const newId = String(Math.max(...projectActivities.data.items.map(item => parseInt(item.id)), 0) + 1);
        
        // Generate task ID - get the highest number for this project and increment
        const projectActivitiesFiltered = projectActivities.data.items
          .filter(item => item.project_id === id)
          .map(item => {
            const match = item.task_id.match(/TASK-(\d+)/);
            return match ? parseInt(match[1]) : 0;
          });
        
        const lastTaskNumber = projectActivitiesFiltered.length > 0 ? Math.max(...projectActivitiesFiltered) : 0;
        const taskNumber = `TASK-${String(lastTaskNumber + 1).padStart(3, '0')}`;
        
        // Create new activity object
        const newActivity = {
          id: newId,
          project_id: id,
          task_id: taskNumber,
          ...values,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        
        // Add to activities array (in real app, this would be an API call)
        projectActivities.data.items.push(newActivity);
        
        message.success("Activity created successfully");
        navigate(`/projects/${id}`);
      } catch (error) {
        message.error("Failed to create activity");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <Page
      title="Create Activity"
      breadcrumbs={breadcrumbs}
    >
      <Modal
        title="Create New Activity"
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
          loading={loading}
          onSubmit={handleFinish}
        />
      </Modal>
    </Page>
  );
};

export default Component;
