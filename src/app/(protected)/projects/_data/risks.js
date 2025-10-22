export const projectRisks = {
  status_code: 200,
  data: {
    items: [
      {
        id: "1",
        project_id: "1",
        nomor_resiko: "RSK-001",
        tanggal_identifikasi_resiko: "2025-01-05T00:00:00.000Z",
        kategori_resiko: "Financial",
        probabilitas_resiko: "Medium",
        deskripsi_resiko: "Currency exchange rate fluctuations affecting material costs",
        dampak_resiko: "Budget overruns and reduced profit margins",
        tingkat_dampak: "Medium",
        skor_resiko: 6,
        prioritas_resiko: "Medium",
        rencana_mitigasi: "Hedging strategies and local supplier partnerships",
        status_mitigasi: "In Progress",
        deadline_mitigasi: "2025-02-28T00:00:00.000Z",
        update_mitigasi: "Financial team evaluating hedging options",
        tanggal_update_terkini: "2025-01-15T00:00:00.000Z",
        pic: "Finance Team",
        keterangan: "Monitoring exchange rate trends weekly",
        created_at: "2025-01-05T00:00:00.000Z",
        updated_at: "2025-01-15T00:00:00.000Z",
      },
      {
        id: "2",
        project_id: "1",
        nomor_resiko: "RSK-002",
        tanggal_identifikasi_resiko: "2025-01-12T00:00:00.000Z",
        kategori_resiko: "Financial",
        probabilitas_resiko: "Low",
        deskripsi_resiko: "Potential budget overruns due to material price fluctuations in global markets",
        dampak_resiko: "Increased project costs affecting overall ROI",
        tingkat_dampak: "Medium",
        skor_resiko: 6,
        prioritas_resiko: "Medium",
        rencana_mitigasi: "Secure fixed-price contracts with suppliers and establish contingency fund",
        status_mitigasi: "Completed",
        deadline_mitigasi: "2025-01-30T00:00:00.000Z",
        update_mitigasi: "Fixed-price contracts secured with key suppliers, contingency fund allocated",
        tanggal_update_terkini: "2025-01-18T00:00:00.000Z",
        keterangan: "Financial risk successfully mitigated through strategic procurement",
        created_at: "2025-01-12T00:00:00.000Z",
        updated_at: "2025-01-18T00:00:00.000Z",
      },
      {
        id: "3",
        project_id: "1",
        nomor_resiko: "RSK-003",
        tanggal_identifikasi_resiko: "2025-01-15T00:00:00.000Z",
        kategori_resiko: "Environmental",
        probabilitas_resiko: "Medium",
        deskripsi_resiko: "Potential environmental regulatory changes affecting project compliance requirements",
        dampak_resiko: "Project delays and additional compliance costs",
        tingkat_dampak: "High",
        skor_resiko: 8,
        prioritas_resiko: "High",
        rencana_mitigasi: "Engage with regulatory consultants and implement flexible compliance framework",
        status_mitigasi: "Open",
        deadline_mitigasi: "2025-02-28T00:00:00.000Z",
        update_mitigasi: "Environmental consultant engaged, initial compliance assessment completed",
        tanggal_update_terkini: "2025-01-17T00:00:00.000Z",
        keterangan: "Monitoring regulatory developments closely",
        created_at: "2025-01-15T00:00:00.000Z",
        updated_at: "2025-01-17T00:00:00.000Z",
      },
      {
        id: "4",
        project_id: "1",
        nomor_resiko: "RSK-004",
        tanggal_identifikasi_resiko: "2025-01-18T00:00:00.000Z",
        kategori_resiko: "Operational",
        probabilitas_resiko: "High",
        deskripsi_resiko: "Shortage of skilled technicians for specialized equipment installation",
        dampak_resiko: "Delays in commissioning phase and potential quality issues",
        tingkat_dampak: "Medium",
        skor_resiko: 8,
        prioritas_resiko: "High",
        rencana_mitigasi: "Develop training program and engage external specialized contractors",
        status_mitigasi: "In Progress",
        deadline_mitigasi: "2025-03-01T00:00:00.000Z",
        update_mitigasi: "Training program developed, external contractors identified and engaged",
        tanggal_update_terkini: "2025-01-19T00:00:00.000Z",
        keterangan: "Critical path risk requiring proactive management",
        created_at: "2025-01-18T00:00:00.000Z",
        updated_at: "2025-01-19T00:00:00.000Z",
      },
      {
        id: "5",
        project_id: "1",
        nomor_resiko: "RSK-005",
        tanggal_identifikasi_resiko: "2025-01-16T00:00:00.000Z",
        kategori_resiko: "Safety",
        probabilitas_resiko: "Low",
        deskripsi_resiko: "Potential safety incidents during high-risk construction activities",
        dampak_resiko: "Work stoppage, regulatory penalties, and reputation damage",
        tingkat_dampak: "Critical",
        skor_resiko: 8,
        prioritas_resiko: "Medium",
        rencana_mitigasi: "Implement enhanced safety protocols and conduct regular safety audits",
        status_mitigasi: "Completed",
        deadline_mitigasi: "2025-01-25T00:00:00.000Z",
        update_mitigasi: "Enhanced safety protocols implemented, audit schedule established",
        tanggal_update_terkini: "2025-01-20T00:00:00.000Z",
        keterangan: "Safety measures fully implemented and monitored",
        created_at: "2025-01-16T00:00:00.000Z",
        updated_at: "2025-01-20T00:00:00.000Z",
      },
    ],
    meta: {
      total_page: 1,
      total: 5,
      page: 1,
      per_page: 10,
    },
  },
  version: "1.0.0",
};

export const getProjectRisks = (projectId) => {
  console.log("Getting risks for project ID:", projectId);
  
  // For demo purposes, return risks regardless of project_id to ensure data is always shown
  // In a real application, this would filter by the actual project_id
  const risks = projectRisks.data.items;
  
  // Show all risks to display complete project risks list
  const allRisks = risks;
  
  // Always return proper structure to prevent undefined errors
  return {
    status_code: 200,
    data: {
      items: allRisks || [],
      meta: {
        total_page: 1,
        total: allRisks?.length || 0,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  };
};

export const getRiskById = (riskId) => {
  console.log("Getting risk by ID:", riskId);
  
  const risk = projectRisks.data.items.find((item) => item.id === riskId);
  
  return {
    status_code: 200,
    data: risk || null,
    version: "1.0.0",
  };
};
