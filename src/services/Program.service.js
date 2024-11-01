import axiosInstance from "./config/ApiConfig";

const ALL_PROGRAM_URL = "/course-management/course-topics";


export const GetAllPrograms = async () => {
  try {
    const response = await axiosInstance.get(ALL_PROGRAM_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};
