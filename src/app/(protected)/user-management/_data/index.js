const listUsers = {
  status_code: 200,
  data: {
    items: [
      {
        id: 1,
        nip: "19850101201001001",
        nik: "3201010101850001",
        nama_user: "Ahmad Wijaya",
        role: "Administrator",
        email: "ahmad.wijaya@antam.com",
        username: "ahmad.wijaya",
        perusahaan: "PT Aneka Tambang Tbk",
        status: "Active",
        created_at: "15/01/2023",
        updated_at: "20/06/2023"
      },
      {
        id: 2,
        nip: "19870523201002002",
        nik: "3201010523870002",
        nama_user: "Siti Rahayu",
        role: "PMO Admin",
        email: "siti.rahayu@bukitasam.co.id",
        username: "siti.rahayu",
        perusahaan: "PT Bukit Asam Tbk",
        status: "Active",
        created_at: "10/02/2023",
        updated_at: "15/06/2023"
      },
      {
        id: 3,
        nip: "19820715201003003",
        nik: "3201010715820003",
        nama_user: "Budi Santoso",
        role: "Direktur Mind ID",
        email: "budi.santoso@freeport.com",
        username: "budi.santoso",
        perusahaan: "PT Freeport Indonesia",
        status: "Inactive",
        created_at: "05/03/2023",
        updated_at: "10/07/2023"
      },
      {
        id: 4,
        nip: "19900328201004004",
        nik: "3201010328900004",
        nama_user: "Diana Kusuma",
        role: "PMO Mind ID",
        email: "diana.kusuma@inalum.id",
        username: "diana.kusuma",
        perusahaan: "PT Indonesia Asahan Aluminium",
        status: "Active",
        created_at: "12/04/2023",
        updated_at: "22/07/2023"
      },
      {
        id: 5,
        nip: "19881104201005005",
        nik: "3201011104880005",
        nama_user: "Eko Prasetyo",
        role: "Tim Proyek",
        email: "eko.prasetyo@timah.com",
        username: "eko.prasetyo",
        perusahaan: "PT Timah Tbk",
        status: "Active",
        created_at: "20/05/2023", 
        updated_at: "25/07/2023"
      }
    ],
    meta: {
      total_page: 1,
      total: 5,
      page: 1,
      per_page: 10,
    },
    version: "1.0.0",
  },
};

const detailUser = (id) => {
  const user = listUsers.data.items.find((item) => item.id === Number(id));
  
  if (user) {
    return {
      status_code: 200,
      data: user,
      version: "1.0.0",
    };
  }

  return {
    status_code: 404,
    message: "User not found",
    version: "1.0.0",
  };
};

export { listUsers, detailUser };
