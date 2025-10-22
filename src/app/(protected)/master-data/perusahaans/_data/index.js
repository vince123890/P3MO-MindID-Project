export const allPerusahaans = {
  status_code: 200,
  data: {
    items: [
      {
        id: "1",
        nama_perusahaan: "PT Aneka Tambang Tbk",
        alamat_perusahaan: "Gedung Aneka Tambang, Jl. Letjen TB Simatupang No. 1, Lingkar Selatan, Jakarta Selatan 12530",
        email: "info@antam.com",
        no_telepon: "021-7891234",
        status: "Active",
        created_at: "2023-01-15T00:00:00.000Z",
        updated_at: "2023-01-15T00:00:00.000Z",
      },
      {
        id: "2",
        nama_perusahaan: "PT Bukit Asam Tbk",
        alamat_perusahaan: "Jl. Parigi No. 1, Tanjung Enim, Muara Enim, Sumatera Selatan 31171",
        email: "corporate@bukitasam.co.id",
        no_telepon: "0734-451234",
        status: "Active",
        created_at: "2023-02-10T00:00:00.000Z",
        updated_at: "2023-02-10T00:00:00.000Z",
      },
      {
        id: "3",
        nama_perusahaan: "PT Freeport Indonesia",
        alamat_perusahaan: "Jl. Mandala Raya Barat No. 10, Kemayoran, Jakarta Pusat 10620",
        email: "contact@freeport.co.id",
        no_telepon: "021-29925000",
        status: "Active",
        created_at: "2023-03-05T00:00:00.000Z",
        updated_at: "2023-03-05T00:00:00.000Z",
      },
      {
        id: "4",
        nama_perusahaan: "PT Indonesia Asahan Aluminium (Inalum)",
        alamat_perusahaan: "Jl. Perintis Kemerdekaan Km. 18, Kuala Tanjung, Asahan, Sumatera Utara 21274",
        email: "info@inalum.co.id",
        no_telepon: "0623-41234",
        status: "Active",
        created_at: "2023-04-12T00:00:00.000Z",
        updated_at: "2023-04-12T00:00:00.000Z",
      },
      {
        id: "5",
        nama_perusahaan: "PT Timah Tbk",
        alamat_perusahaan: "Jl. Pemuda No. 47-49, Menteng, Jakarta Pusat 10320",
        email: "corporate@timah.com",
        no_telepon: "021-3190412",
        status: "Active",
        created_at: "2023-05-18T00:00:00.000Z",
        updated_at: "2023-05-18T00:00:00.000Z",
      },
      {
        id: "6",
        nama_perusahaan: "PT Vale Indonesia",
        alamat_perusahaan: "Jl. Raya Sorowako, Luwu Timur, Sulawesi Selatan 92982",
        email: "info@vale.com",
        no_telepon: "0473-22123",
        status: "Active",
        created_at: "2023-06-22T00:00:00.000Z",
        updated_at: "2023-06-22T00:00:00.000Z",
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

export const perusahaanDetail = (id) => {
  const perusahaan = allPerusahaans.data.items.find((item) => item.id === id);

  return {
    status_code: 200,
    data: perusahaan || null,
    version: "1.0.0",
  };
};
