import dayjs from "dayjs";

// use this function to format a date object or string to a specific format
export const formatDate = (date, format = "DD/MM/YYYY") => {
  return date ? dayjs(date).format(format) : null;
};

// use this function to convert a string date to a dayjs object. use case for default value form DatePicker
export const formatStringToDate = (str) => {
  return str ? dayjs(str) : null;
};

// use this function to format a number to Indonesian Rupiah currency format
export const formatToRupiah = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "Rp 0";
  }
  
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
