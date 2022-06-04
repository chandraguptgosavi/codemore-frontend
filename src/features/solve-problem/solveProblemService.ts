import axios from "axios";
import Problem from "types/problem";
import { SubmissionData, SubmissionResponse } from "./types";

const BASE_URL = "http://localhost:5000/problems";

const getProblem = async (_id: string) => {
  try {
    const data = (await axios.get<Problem>(`${BASE_URL}/${_id}`)).data;
    return data;
  } catch (error: any) {
    console.log(error);

    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const submitProblem = async (submissionData: SubmissionData, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = (
      await axios.put<SubmissionResponse>(
        `${BASE_URL}/${submissionData._id}/submit`,
        submissionData,
        config
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

const dashboardService = {
  getProblem,
  submitProblem,
};

export default dashboardService;
