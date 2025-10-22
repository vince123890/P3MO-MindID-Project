export const allIssueRisks = {
  status_code: 200,
  data: {
    items: [
      {
        id: "10",
        kode_issue_risk: "IR010",
        tipe_issue_risk: "Compliance Issue",
        status: "Active",
        created_at: "2025-01-06T00:00:00.000Z",
        updated_at: "2025-01-06T00:00:00.000Z",
      },
      {
        id: "9",
        kode_issue_risk: "IR009",
        tipe_issue_risk: "External Risk",
        status: "Inactive",
        created_at: "2025-01-07T00:00:00.000Z",
        updated_at: "2025-01-07T00:00:00.000Z",
      },
      {
        id: "8",
        kode_issue_risk: "IR008",
        tipe_issue_risk: "Stakeholder Risk",
        status: "Active",
        created_at: "2025-01-08T00:00:00.000Z",
        updated_at: "2025-01-08T00:00:00.000Z",
      },
      {
        id: "7",
        kode_issue_risk: "IR007",
        tipe_issue_risk: "Communication Risk",
        status: "Active",
        created_at: "2025-01-09T00:00:00.000Z",
        updated_at: "2025-01-09T00:00:00.000Z",
      },
      {
        id: "6",
        kode_issue_risk: "IR006",
        tipe_issue_risk: "Scope Issue",
        status: "Inactive",
        created_at: "2025-01-10T00:00:00.000Z",
        updated_at: "2025-01-10T00:00:00.000Z",
      },
      {
        id: "5",
        kode_issue_risk: "IR005",
        tipe_issue_risk: "Quality Issue",
        status: "Active",
        created_at: "2025-01-11T00:00:00.000Z",
        updated_at: "2025-01-11T00:00:00.000Z",
      },
      {
        id: "4",
        kode_issue_risk: "IR004",
        tipe_issue_risk: "Resource Risk",
        status: "Active",
        created_at: "2025-01-12T00:00:00.000Z",
        updated_at: "2025-01-12T00:00:00.000Z",
      },
      {
        id: "3",
        kode_issue_risk: "IR003",
        tipe_issue_risk: "Schedule Risk",
        status: "Inactive",
        created_at: "2025-01-13T00:00:00.000Z",
        updated_at: "2025-01-13T00:00:00.000Z",
      },
      {
        id: "2",
        kode_issue_risk: "IR002",
        tipe_issue_risk: "Budget Risk",
        status: "Active",
        created_at: "2025-01-14T00:00:00.000Z",
        updated_at: "2025-01-14T00:00:00.000Z",
      },
      {
        id: "1",
        kode_issue_risk: "IR001",
        tipe_issue_risk: "Technical Risk",
        status: "Active",
        created_at: "2025-01-15T00:00:00.000Z",
        updated_at: "2025-01-15T00:00:00.000Z",
      },
    ],
    meta: {
      total_page: 1,
      total: 10,
      page: 1,
      per_page: 10,
    },
  },
  version: "1.0.0",
};

export const issueRiskDetail = (id) => {
  const issueRisk = allIssueRisks.data.items.find((item) => item.id === id);

  return {
    status_code: 200,
    data: issueRisk || null,
    version: "1.0.0",
  };
};
