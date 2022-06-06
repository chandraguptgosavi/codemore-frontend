import SubmissionStatus from "types/submissionStatus";

export type SubmissionsState = {
    submissionsLoading: boolean;
    error: string | null;
    submissions: SubmissionResponse[];
}

export type SubmissionResponse = {
    problemID: string;
    probleTitle: string;
    languageName: string;
    status: SubmissionStatus;
}