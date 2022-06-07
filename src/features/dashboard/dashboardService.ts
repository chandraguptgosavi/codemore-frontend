import axios from "axios";
import { GetAllProblemsResponse } from "./types";

const BASE_URL = "/api/problems";

const getAllProblems = async (page: number) => {
  try {
    const data = (
      await axios.get<GetAllProblemsResponse>(`${BASE_URL}/`, {
        params: { page: page, size: 5 },
      })
    ).data;
    return data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const dashboardService = {
  getAllProblems,
};

export default dashboardService;
