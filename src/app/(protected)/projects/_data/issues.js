export const projectIssues = {
  status_code: 200,
  data: {
    items: [
      {
        id: "1",
        project_id: "1",
        wbs_task_id: "1.1.1",
        aktivitas_master_schedule: "Site Preparation and Ground Clearing",
        kategori_issue: "Technical",
        tipe_issue: "Design Conflict",
        deskripsi_issue: "Conflict between structural design and existing site conditions identified during soil testing",
        progress_update: "Engineering team reviewing alternative design solutions",
        deadline: "2025-02-15T00:00:00.000Z",
        pic: "John Doe",
        nomor_issue: "ISS-001",
        tanggal_issue: "2025-01-10T00:00:00.000Z",
        status_issue: "Open",
        dampak_issue: "Potential 2-week delay in project timeline if not resolved",
        resolution: "Pending engineering review",
        deadline_resolution: "2025-01-25T00:00:00.000Z",
        issue_update: "Weekly coordination meeting scheduled with structural engineer",
        prioritas_issue: "High",
        tanggal_update_terkini: "2025-01-19T00:00:00.000Z",
        keterangan: "Requires immediate attention to avoid cascading delays",
        created_at: "2025-01-10T00:00:00.000Z",
        updated_at: "2025-01-19T00:00:00.000Z",
      },
      {
        id: "2",
        project_id: "1",
        wbs_task_id: "1.2.3",
        aktivitas_master_schedule: "Equipment Procurement and Delivery",
        kategori_issue: "Logistical",
        tipe_issue: "Supplier Delay",
        deskripsi_issue: "Main equipment supplier informed of 3-week delay in delivery schedule",
        progress_update: "Procurement team exploring alternative suppliers",
        deadline: "2025-03-01T00:00:00.000Z",
        pic: "Jane Smith",
        nomor_issue: "ISS-002",
        tanggal_issue: "2025-01-12T00:00:00.000Z",
        status_issue: "In Progress",
        dampak_issue: "May affect installation schedule and project completion date",
        resolution: "Negotiating with alternative suppliers for faster delivery",
        deadline_resolution: "2025-01-30T00:00:00.000Z",
        issue_update: "Two potential suppliers identified, quotes being evaluated",
        prioritas_issue: "Medium",
        tanggal_update_terkini: "2025-01-18T00:00:00.000Z",
        keterangan: "Critical path item requiring close monitoring",
        created_at: "2025-01-12T00:00:00.000Z",
        updated_at: "2025-01-18T00:00:00.000Z",
      },
      {
        id: "3",
        project_id: "1",
        wbs_task_id: "2.1.2",
        aktivitas_master_schedule: "Foundation Work",
        kategori_issue: "Environmental",
        tipe_issue: "Regulatory Compliance",
        deskripsi_issue: "Environmental agency requires additional documentation for foundation work permit",
        progress_update: "Documentation team preparing required environmental impact assessment",
        deadline: "2025-02-28T00:00:00.000Z",
        pic: "Mike Johnson",
        nomor_issue: "ISS-003",
        tanggal_issue: "2025-01-15T00:00:00.000Z",
        status_issue: "Open",
        dampak_issue: "Work cannot proceed until permit is obtained",
        resolution: "Preparing comprehensive environmental impact report",
        deadline_resolution: "2025-02-01T00:00:00.000Z",
        issue_update: "Initial draft completed, undergoing internal review",
        prioritas_issue: "High",
        tanggal_update_terkini: "2025-01-17T00:00:00.000Z",
        keterangan: "Permit application on hold pending documentation",
        created_at: "2025-01-15T00:00:00.000Z",
        updated_at: "2025-01-17T00:00:00.000Z",
      },
      {
        id: "4",
        project_id: "1",
        wbs_task_id: "3.2.1",
        aktivitas_master_schedule: "Electrical Installation",
        kategori_issue: "Resource",
        tipe_issue: "Manpower Shortage",
        deskripsi_issue: "Shortage of qualified electricians available for installation phase",
        progress_update: "HR team recruiting additional electricians, considering subcontracting",
        deadline: "2025-04-15T00:00:00.000Z",
        pic: "Alice Brown",
        nomor_issue: "ISS-004",
        tanggal_issue: "2025-01-18T00:00:00.000Z",
        status_issue: "In Progress",
        dampak_issue: "Potential delay in electrical installation and subsequent testing phases",
        resolution: "Engaging with local electrical contractors for additional manpower",
        deadline_resolution: "2025-02-10T00:00:00.000Z",
        issue_update: "Three contractors contacted, proposals expected next week",
        prioritas_issue: "Medium",
        tanggal_update_terkini: "2025-01-19T00:00:00.000Z",
        keterangan: "Critical skill shortage requiring immediate action",
        created_at: "2025-01-18T00:00:00.000Z",
        updated_at: "2025-01-19T00:00:00.000Z",
      },
      {
        id: "5",
        project_id: "1",
        wbs_task_id: "1.3.5",
        aktivitas_master_schedule: "Safety Training and Certification",
        kategori_issue: "Safety",
        tipe_issue: "Training Delay",
        deskripsi_issue: "Scheduled safety training program delayed due to trainer availability",
        progress_update: "Alternative training provider being sourced",
        deadline: "2025-02-10T00:00:00.000Z",
        pic: "Bob Wilson",
        nomor_issue: "ISS-005",
        tanggal_issue: "2025-01-16T00:00:00.000Z",
        status_issue: "Resolved",
        dampak_issue: "Workforce cannot begin on-site activities without certification",
        resolution: "Alternative training provider secured, training rescheduled for next week",
        deadline_resolution: "2025-01-25T00:00:00.000Z",
        issue_update: "Training completed successfully, all personnel certified",
        prioritas_issue: "High",
        tanggal_update_terkini: "2025-01-20T00:00:00.000Z",
        keterangan: "All safety requirements now met, work can proceed",
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

export const getProjectIssues = (projectId) => {
  console.log("Getting issues for project ID:", projectId);
  
  // For demo purposes, return issues regardless of project_id to ensure data is always shown
  // In a real application, this would filter by the actual project_id
  const issues = projectIssues.data.items;
  
  // Show all issues to display complete project issues list
  const allIssues = issues;
  
  // Always return proper structure to prevent undefined errors
  return {
    status_code: 200,
    data: {
      items: allIssues || [],
      meta: {
        total_page: 1,
        total: allIssues?.length || 0,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  };
};

export const getIssueById = (issueId) => {
  console.log("Getting issue by ID:", issueId);
  
  const issue = projectIssues.data.items.find((item) => item.id === issueId);
  
  return {
    status_code: 200,
    data: issue || null,
    version: "1.0.0",
  };
};
