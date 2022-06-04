import UserProblem from "./userProblem";

type User = {
  token: string;
  username: string;
  email: string;
  problems: UserProblem[];
};

export default User;
