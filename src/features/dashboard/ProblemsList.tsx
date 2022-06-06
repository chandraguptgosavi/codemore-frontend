import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import ToastMessage from "components/ToastMessage";
import Color from "constants/colors";
import Unit from "constants/units";
import useReduxDispatch from "hooks/useReduxDispatch";
import useReduxSelector from "hooks/useReduxSelector";
import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paths from "router/paths";
import { getAllProblems, resetDashboardState } from "./dashboardSlice";

function ProblemsList() {
  const { page, pageSize, error, isLoading, problems } = useReduxSelector(
    (state) => state.dashboard
  );
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();

  const handleListItemClick =
    (_id: string) => (event: React.MouseEvent<HTMLDivElement>) => {
      navigate(`${Paths.SOLVE}/${_id}`);
    };

  useEffect(() => {
    dispatch(getAllProblems(page));
  }, [page]);

  return (
    <>
      {isLoading ? (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      ) : (
        <Fragment>
          {problems.length > 0 ? (
            <List>
              {problems.map((problem, index) => (
                <ListItem
                  key={problem._id}
                  sx={{ bgcolor: index % 2 === 1 ? Color.LIGHT : undefined }}
                  disablePadding
                >
                  <ListItemButton onClick={handleListItemClick(problem._id)}>
                    <ListItemText sx={{ flex: "none", width: Unit.rem.XXL }}>
                      {`${(page - 1) * pageSize + (index + 1)}.`}
                    </ListItemText>
                    <ListItemText primary={problem.title} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="h6" align="center">
              No problems available!
            </Typography>
          )}
        </Fragment>
      )}
      <ToastMessage
        show={error !== null}
        severity="error"
        message={error!!}
        onClose={() => dispatch(resetDashboardState())}
      />
    </>
  );
}

export default ProblemsList;
