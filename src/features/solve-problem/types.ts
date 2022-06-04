import Problem from "types/problem";
import SubmissionStatus from "types/submissionStatus";

export type SolveProblemState = {
  isProblemLoading: boolean;
  error: string | null;
  problem: Problem | null;
  isSubmissionPending: boolean;
  submissionResponse: SubmissionResponse | null;
};

export type SubmissionData = {
  _id: string;
  srcCode: string;
  langID: number;
};

export type SubmissionResponse = {
  stdout: string | null;
  time: string | null;
  memory: string | null;
  stderr: string | null;
  token: string;
  compiler_output: string | null;
  message: string | null;
  status: SubmissionStatus;
};
