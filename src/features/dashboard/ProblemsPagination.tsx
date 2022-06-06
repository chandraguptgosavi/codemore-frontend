import { Pagination } from "@mui/material";
import useReduxDispatch from "hooks/useReduxDispatch";
import useReduxSelector from "hooks/useReduxSelector";
import { Fragment } from "react";
import {
  selectPage,
  selectPageSize,
  selectProblems,
  selectTotalProblems,
  setPage,
} from "./dashboardSlice";

function ProblemsPagination() {
  const size = useReduxSelector(selectPageSize);
  const page = useReduxSelector(selectPage);
  const totalProblems = useReduxSelector(selectTotalProblems);
  const problems = useReduxSelector(selectProblems);
  const dispatch = useReduxDispatch();
  const pageCount =
    totalProblems % size === 0
      ? Math.floor(totalProblems / size)
      : Math.floor(totalProblems / size) + 1;

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  return (
    <Fragment>
      {problems && problems.length > 0 ? (
        <Pagination
          sx={{ display: "flex", justifyContent: "center" }}
          count={pageCount}
          page={page}
          color="secondary"
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      ) : null}
    </Fragment>
  );
}

export default ProblemsPagination;
