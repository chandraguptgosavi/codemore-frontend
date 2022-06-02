import axios from "axios";
import AuthData from "types/authData";
import User from "types/user";

const BASE_URL = "http://localhost:5000/user";

const signUp = async (authData: AuthData) => {
  try {
    const user = (await axios.post<User>(`${BASE_URL}/signup`, authData)).data;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    return user;
  } catch (error: any) {
     if (error.response && error.response.data && error.response.data.message) {
       throw new Error(error.response.data.message);
     }
     throw new Error(error.message);
  }
};

const signIn = async (authData: AuthData) => {
  try {
    const user = (await axios.post<User>(`${BASE_URL}/signin`, authData)).data;
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    return user;
  } catch (error: any) {
     if (error.response && error.response.data && error.response.data.message) {
       throw new Error(error.response.data.message);
     }
     throw new Error(error.message);
  }
};

const signOut = async () => {
  localStorage.removeItem("user");
};

const authService = {
  signUp,
  signIn,
  signOut,
};

export default authService;
