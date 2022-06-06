import axios from "axios";
import { SubmissionResponse } from "./types";

const BASE_URL = "http://localhost:5000/user/";

const getSubmissions = async (username: string) => {
  try {
    const data = (
      await axios.get<SubmissionResponse[]>(
        `${BASE_URL}/${username}/submissions`
      )
    ).data;
    return data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const submissionsService = {
  getSubmissions,
};

export default submissionsService;
