import { JudgeResponse } from "./types";

export const judgeOuptut = (
  judgeResponse: JudgeResponse | null,
  isSubmission: boolean | undefined = false
) => {
  if (judgeResponse !== null) {
    if (!isSubmission && judgeResponse.stdout) return judgeResponse.stdout;
    if (judgeResponse.compile_output) return judgeResponse.compile_output;
    if (judgeResponse.message) return judgeResponse.message;
    if (judgeResponse.stderr) return judgeResponse.stderr;
  }
  return "";
};
