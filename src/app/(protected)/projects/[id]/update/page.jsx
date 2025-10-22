import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { message } from "antd";
import { Page } from "admiral";
import dayjs from "dayjs";

import { FormProject } from "../../_components/form.jsx";
import { projectDetail } from "../../_data/index.js";

export const Component = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [projectData, setProjectData] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setInitialLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        const response = projectDetail(id);
        if (response.data) {
          const project = response.data;
          // Format data for form
          const formattedProject = {
            ...project,
            last_sync_date: project.last_sync_date ? dayjs(project.last_sync_date) : null,
          };
          setProjectData(formattedProject);
        } else {
          message.error("Project not found");
          navigate("/projects");
        }
      } catch (err) {
        setError(err);
        message.error("Failed to fetch project data");
        navigate("/projects");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Format the data
      const updatedProject = {
        ...values,
        last_sync_date: values.last_sync_date ? values.last_sync_date.toISOString() : null,
        updated_at: dayjs().toISOString(),
        dokumen_pendukung: values.dokumen_pendukung || [],
      };

      // Simulate successful update
      console.log("Project updated:", updatedProject);
      message.success("Project updated successfully");

      // Navigate back to project detail
      navigate(`/projects/${id}`);
    } catch (err) {
      setError(err);
      message.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbs = [
    {
      label: "Projects",
      path: "/projects",
    },
    {
      label: "Edit Project",
      path: `/projects/${id}/update`,
    },
  ];

  if (initialLoading) {
    return (
      <Page
        title="Edit Project"
        breadcrumbs={breadcrumbs}
        loading={true}
      />
    );
  }

  const formProps = {
    onFinish: handleSubmit,
    initialValues: projectData,
  };

  return (
    <Page
      title="Edit Project"
      breadcrumbs={breadcrumbs}
      loading={loading}
    >
      <FormProject
        formProps={formProps}
        error={error}
        loading={loading}
        isEdit={true}
      />
    </Page>
  );
};

export default Component;
