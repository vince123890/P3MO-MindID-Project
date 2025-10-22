import { Page, Section } from "admiral";
import { Suspense } from "react";
import { Space } from "antd";
import MapContent from "./_components/MapContent";
import CityDistributionContent from "./_components/CityDistributionContent";

export const Component = () => {
  return (
    <Page
      breadcrumbs={[
        { label: "Project Anggota Holding", path: "" },
      ]}
      title="Project Anggota Holding"
      noStyle
    >
      <Section loading={false}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Section 
            title="Peta Sebaran Project"
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e8e8e8",
            }}
          >
            <Suspense fallback={<div>Loading map...</div>}>
              <MapContent />
            </Suspense>
          </Section>

          <Section 
            title="Info Total Sebaran Project per Kota"
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              padding: "24px",
              border: "1px solid #e8e8e8",
            }}
          >
            <Suspense fallback={<div>Loading city distribution...</div>}>
              <CityDistributionContent />
            </Suspense>
          </Section>
        </Space>
      </Section>
    </Page>
  );
};

export default Component;
