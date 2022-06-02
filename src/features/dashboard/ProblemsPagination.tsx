import { Pagination } from "@mui/material";
import useReduxDispatch from "hooks/useReduxDispatch";
import useReduxSelector from "hooks/useReduxSelector";
import { selectPage, selectTotalProblems, setPage } from "./dashboardSlice";

function ProblemsPagination() {
  const page = useReduxSelector(selectPage);
  const totalProblems = useReduxSelector(selectTotalProblems);
  const dispatch = useReduxDispatch();
  const pageCount =
    totalProblems % 5 === 0 ? totalProblems / 5 : totalProblems / 5 + 1;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  return (
      <Pagination
        sx={{ display: "flex", justifyContent: "center" }}
        count={pageCount}
              page={page}
              color="secondary"
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
  );
}

export default ProblemsPagination;
