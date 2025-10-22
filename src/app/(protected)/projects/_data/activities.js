export const projectActivities = {
  status_code: 200,
  data: {
    items: [
      {
        id: "1",
        project_id: "1",
        task_id: "TASK-001",
        fase: "Perencanaan",
        bulan_pelaporan_start: "2025-09-01T00:00:00.000Z",
        bulan_pelaporan_end: "2025-09-30T00:00:00.000Z",
        aktivitas_bulan_sebelumnya: "Site survey dan pengukuran tanah untuk lokasi pembangunan",
        status_bulan_sebelumnya: "Completed",
        aktivitas_bulan_berjalan: "Perencanaan detail engineering dan desain layout",
        status_bulan_berjalan: "In Progress",
        pic_aktivitas: "John Doe",
        foto: [
          {
            id: 1,
            file_name: "site-survey-sept.jpg",
            description: "Foto hasil site survey bulan September"
          },
          {
            id: 2,
            file_name: "layout-planning.jpg",
            description: "Foto sesi perencanaan layout"
          }
        ],
        milestone: true,
        tanggal_aktivitas: "2025-10-15T00:00:00.000Z",
        keterangan_foto: "Dokumentasi progress site survey dan perencanaan layout",
        latest_modified: "2025-10-15T00:00:00.000Z",
        keterangan: "Activity berjalan sesuai jadwal, tidak ada kendala signifikan",
        created_at: "2025-09-01T00:00:00.000Z",
        updated_at: "2025-10-15T00:00:00.000Z",
      },
      {
        id: "2",
        project_id: "1",
        task_id: "TASK-002",
        fase: "Perencanaan",
        bulan_pelaporan_start: "2025-09-01T00:00:00.000Z",
        bulan_pelaporan_end: "2025-09-30T00:00:00.000Z",
        aktivitas_bulan_sebelumnya: "Perizinan dan dokumen lingkungan",
        status_bulan_sebelumnya: "In Progress",
        aktivitas_bulan_berjalan: "Finalisasi perizinan dan submit ke pemerintah daerah",
        status_bulan_berjalan: "In Progress",
        pic_aktivitas: "Jane Smith",
        foto: [
          {
            id: 3,
            file_name: "permit-docs.jpg",
            description: "Dokumen perizinan yang sudah disiapkan"
          }
        ],
        milestone: true,
        tanggal_aktivitas: "2025-10-10T00:00:00.000Z",
        keterangan_foto: "Dokumentasi kelengkapan dokumen perizinan",
        latest_modified: "2025-10-10T00:00:00.000Z",
        keterangan: "Menunggu approval dari pemerintah daerah, estimasi 2 minggu",
        created_at: "2025-09-05T00:00:00.000Z",
        updated_at: "2025-10-10T00:00:00.000Z",
      },
      {
        id: "3",
        project_id: "1",
        task_id: "TASK-003",
        fase: "Pengembangan",
        bulan_pelaporan_start: "2025-09-01T00:00:00.000Z",
        bulan_pelaporan_end: "2025-09-30T00:00:00.000Z",
        aktivitas_bulan_sebelumnya: "Procurement material untuk tahap awal",
        status_bulan_sebelumnya: "Completed",
        aktivitas_bulan_berjalan: "Persiapan kontrak dengan supplier utama",
        status_bulan_berjalan: "Completed",
        pic_aktivitas: "Mike Johnson",
        foto: [
          {
            id: 4,
            file_name: "supplier-meeting.jpg",
            description: "Meeting dengan supplier untuk negosiasi kontrak"
          },
          {
            id: 5,
            file_name: "material-samples.jpg",
            description: "Sample material yang sudah disetujui"
          }
        ],
        milestone: false,
        tanggal_aktivitas: "2025-10-12T00:00:00.000Z",
        keterangan_foto: "Dokumentasi proses procurement dan sample material",
        latest_modified: "2025-10-12T00:00:00.000Z",
        keterangan: "Kontrak dengan supplier sudah ditandatangani, material siap dikirim",
        created_at: "2025-09-10T00:00:00.000Z",
        updated_at: "2025-10-12T00:00:00.000Z",
      },
      {
        id: "4",
        project_id: "1",
        task_id: "TASK-004",
        fase: "Pengembangan",
        bulan_pelaporan_start: "2025-09-01T00:00:00.000Z",
        bulan_pelaporan_end: "2025-09-30T00:00:00.000Z",
        aktivitas_bulan_sebelumnya: "Persiapan tim konstruksi dan equipment",
        status_bulan_sebelumnya: "In Progress",
        aktivitas_bulan_berjalan: "Recruitment dan training tim konstruksi",
        status_bulan_berjalan: "In Progress",
        pic_aktivitas: "Alice Brown",
        foto: [
          {
            id: 6,
            file_name: "team-training.jpg",
            description: "Sesi training tim konstruksi"
          }
        ],
        milestone: true,
        tanggal_aktivitas: "2025-10-14T00:00:00.000Z",
        keterangan_foto: "Dokumentasi training tim konstruksi",
        latest_modified: "2025-10-14T00:00:00.000Z",
        keterangan: "Training berjalan baik, tim siap untuk mulai konstruksi minggu depan",
        created_at: "2025-09-15T00:00:00.000Z",
        updated_at: "2025-10-14T00:00:00.000Z",
      },
      {
        id: "5",
        project_id: "1",
        task_id: "TASK-005",
        fase: "In HPO",
        bulan_pelaporan_start: "2025-09-01T00:00:00.000Z",
        bulan_pelaporan_end: "2025-09-30T00:00:00.000Z",
        aktivitas_bulan_sebelumnya: "Review HPO (Hold Point Operation)",
        status_bulan_sebelumnya: "Not Started",
        aktivitas_bulan_berjalan: "Persiapan dokumen HPO untuk review",
        status_bulan_berjalan: "In Progress",
        pic_aktivitas: "Bob Wilson",
        foto: [],
        milestone: true,
        tanggal_aktivitas: "2025-10-16T00:00:00.000Z",
        keterangan_foto: "",
        latest_modified: "2025-10-16T00:00:00.000Z",
        keterangan: "Dokumen HPO sedang disiapkan untuk review internal",
        created_at: "2025-09-20T00:00:00.000Z",
        updated_at: "2025-10-16T00:00:00.000Z",
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

export const getProjectActivities = (projectId) => {
  console.log("Getting activities for project ID:", projectId);
  
  // For demo purposes, return activities regardless of project_id to ensure data is always shown
  // In a real application, this would filter by the actual project_id
  const activities = projectActivities.data.items;
  
  // Show all activities to display complete project activities list
  const allActivities = activities;
  
  // Always return proper structure to prevent undefined errors
  return {
    status_code: 200,
    data: {
      items: allActivities || [],
      meta: {
        total_page: 1,
        total: allActivities?.length || 0,
        page: 1,
        per_page: 10,
      },
    },
    version: "1.0.0",
  };
};

export const getActivityById = (activityId) => {
  console.log("Getting activity by ID:", activityId);
  
  const activity = projectActivities.data.items.find((item) => item.id === activityId);
  
  return {
    status_code: 200,
    data: activity || null,
    version: "1.0.0",
  };
};
