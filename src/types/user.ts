import UserProblem from "./userProblem";

type User = {
  _id: string;
  username: string;
  email: string;
  problems: UserProblem[];
};

export default User;
