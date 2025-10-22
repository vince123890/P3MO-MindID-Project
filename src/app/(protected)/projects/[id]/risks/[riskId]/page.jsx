import { useParams, useNavigate } from "react-router";
import { Page } from "admiral";
import { Modal } from "antd";

import { RiskForm } from "@/app/(protected)/projects/_components/risk-form.jsx";
import { getRiskById } from "@/app/(protected)/projects/_data/risks";

export const Component = () => {
  const { id, riskId } = useParams();
  const navigate = useNavigate();

  const riskData = getRiskById(riskId);

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
      label: "Risks",
      path: `/projects/${id}/risks`,
    },
    {
      label: `Risk ${riskData?.data?.nomor_resiko || riskId}`,
      path: `/projects/${id}/risks/${riskId}`,
    },
  ];

  if (!riskData.data) {
    return (
      <Page
        title="Risk Not Found"
        breadcrumbs={breadcrumbs}
      >
        <div>Risk not found</div>
      </Page>
    );
  }

  return (
    <Page
      title={`Risk Details - ${riskData.data.nomor_resiko}`}
      breadcrumbs={breadcrumbs}
    >
      <Modal
        title={`Risk Details - ${riskData.data.nomor_resiko}`}
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
        <RiskForm
          initialData={riskData.data}
          isView={true}
        />
      </Modal>
    </Page>
  );
};

export default Component;
