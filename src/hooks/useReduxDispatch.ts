import { useDispatch } from "react-redux";
import type { AppDispatch } from "redux/store";

const useReduxDispatch = () => useDispatch<AppDispatch>();

export default useReduxDispatch;