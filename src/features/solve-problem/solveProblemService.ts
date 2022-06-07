import axios from "axios";
import Problem from "types/problem";
import { JudgeResponse } from "./types";

const BASE_URL = "/api/problems";

const getProblem = async (_id: string) => {
  try {
    const data = (await axios.get<Problem>(`${BASE_URL}/${_id}`)).data;
    return data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const submitProblem = async (
  _id: string,
  srcCode: string,
  problemTitle: string,
  token: string,
  language: { name: string; id: number }
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = (
      await axios.put<JudgeResponse>(
        `${BASE_URL}/${_id}/submit`,
        { srcCode, problemTitle, language },
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

const runCode = async (
  srcCode: string,
  langID: number,
  userInput: string,
  token: string
) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };    
    const data = (
      await axios.post<JudgeResponse>(
        `${BASE_URL}/run`,
        { srcCode, langID, userInput },
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
  runCode,
};

export default dashboardService;
