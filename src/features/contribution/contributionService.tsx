import axios from "axios";

import Problem from "types/problem";

const BASE_URL = "http://localhost:5000/problems/";

const createProblem = async (problem: Problem, token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const data = (await axios.post<Problem>(BASE_URL, problem, config)).data;
    return `Problem ${data.title} submitted successfully!`;
  } catch (error: any) {    
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const submissionsService = {
  createProblem,
};

export default submissionsService;
