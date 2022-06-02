import { TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "redux/store";

const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useReduxSelector;