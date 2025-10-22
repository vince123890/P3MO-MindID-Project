export const reportTypes = {
  status_code: 200,
  data: {
    items: [
      {
        id: "monthly",
        name: "Laporan Bulanan",
        description: "Laporan bulanan progress project"
      },
      {
        id: "quarterly", 
        name: "Laporan Kuartalan",
        description: "Laporan kuartalan progress project"
      },
      {
        id: "annual",
        name: "Laporan Tahunan", 
        description: "Laporan tahunan progress project"
      }
    ],
    meta: {
      total_page: 1,
      total: 3,
      page: 1,
      per_page: 10,
    },
  },
  version: "1.0.0",
};

export const generatedReports = {
  status_code: 200,
  data: {
    items: [
      {
        id: "1",
        project_id: "1",
        project_name: "Renewable Energy Plant Development Initiative for Sustainable Mining Operations",
        report_type: "monthly",
        period_start: "2024-10-01",
        period_end: "2024-10-31",
        generated_at: "2024-11-01T10:00:00.000Z",
        file_path: "/docs/Laporan bulan Oktober.pdf",
        file_name: "Laporan Oktober 2024 - Renewable Energy Plant",
        status: "completed"
      },
      {
        id: "2",
        project_id: "2", 
        project_name: "Digital Transformation and Automation System for Mining Operations",
        report_type: "monthly",
        period_start: "2024-09-01",
        period_end: "2024-09-30",
        generated_at: "2024-10-01T10:00:00.000Z",
        file_path: "/docs/Laporan bulan Oktober.pdf",
        file_name: "Laporan September 2024 - Digital Transformation",
        status: "completed"
      },
      {
        id: "3",
        project_id: "4",
        project_name: "Water Treatment and Conservation System for Mining Sites", 
        report_type: "quarterly",
        period_start: "2024-07-01",
        period_end: "2024-09-30",
        generated_at: "2024-10-01T10:00:00.000Z",
        file_path: "/docs/Laporan bulan Oktober.pdf",
        file_name: "Laporan Q3 2024 - Water Treatment System",
        status: "completed"
      }
    ],
    meta: {
      total_page: 1,
      total: 3,
      page: 1,
      per_page: 10,
    },
  },
  version: "1.0.0",
};

export const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export const getMonthName = (monthNumber) => {
  return monthNames[monthNumber - 1] || "Unknown";
};

export const generateReportPreview = (projectId, startDate, endDate) => {
  // This is a mock function for prototype
  // In real implementation, this would call API to generate actual report
  return {
    status_code: 200,
    data: {
      id: `generated_${Date.now()}`,
      project_id: projectId,
      period_start: startDate,
      period_end: endDate,
      generated_at: new Date().toISOString(),
      file_path: "/docs/Laporan bulan Oktober.pdf", // Always use example PDF for prototype
      file_name: `Laporan ${getMonthName(new Date(startDate).getMonth() + 1)} ${new Date(startDate).getFullYear()}`,
      status: "completed"
    },
    version: "1.0.0"
  };
};
