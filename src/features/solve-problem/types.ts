import Problem from "types/problem";
import SubmissionStatus from "types/submissionStatus";

export type SolveProblemState = {
  _id: string | null;
  language: Language;
  isProblemLoading: boolean;
  problemError: string | null;
  problem: Problem | null;
  srcCode: string;
  openConsole: boolean;
  consoleTabIndex: number;
  isSubmissionPending: boolean;
  submissionError: string | null;
  submissionResponse: JudgeResponse | null;
  runCodeError: string | null;
  isCodeRunning: boolean;
  userInput: string;
  runCodeResponse: JudgeResponse | null;
};

export type SubmissionData = {
  _id: string;
  language: { name: string; id: number };
};

export type JudgeResponse = {
  stdout: string | null;
  time: string | null;
  memory: string | null;
  stderr: string | null;
  token: string;
  compile_output: string | null;
  message: string | null;
  status: SubmissionStatus;
};

export type Language = { name: string; selectedIndex: number };