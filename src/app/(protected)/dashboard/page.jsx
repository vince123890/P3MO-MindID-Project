import { Page, Section } from "admiral";
import { Col, Row } from "antd";

import SummaryCard from "./_components/summary-card";
import { Typography } from "antd";

export const Components = () => {
  return (
    <Page
      breadcrumbs={[{ label: "Dashboard", path: "" }]}
      title="Dashboard"
      topActions={<Typography.Text strong>5 May 2025 | 13:07 WIB</Typography.Text>}
      noStyle
    >
      <Section title="Monthly Statistics">
        <Row gutter={[16, 16]}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Col key={item} span={24} md={8}>
              <SummaryCard />
            </Col>
          ))}
        </Row>
      </Section>
    </Page>
  );
};

export default Components;
