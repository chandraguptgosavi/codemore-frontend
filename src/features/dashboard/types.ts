import Problem from "types/problem";

export type DashboardState = {
  page: number;
  totalProblems: number;
  isLoading: boolean;
  error: string | null;
  problems: Problem[];
};

export type GetAllProblemsResponse = {
  totalProblems: number;
  problems: Problem[];
};
