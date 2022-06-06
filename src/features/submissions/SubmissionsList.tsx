import { Fragment, useEffect } from "react";
import styled from "styled-components";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { useNavigate, useParams } from "react-router-dom";

import Color from "constants/colors";
import useReduxSelector from "hooks/useReduxSelector";
import ToastMessage from "components/ToastMessage";
import useReduxDispatch from "hooks/useReduxDispatch";
import { getSubmissions, resetSubmissionsState } from "./submissionsSlice";
import Paths from "router/paths";

const StyledFixedSizeList = styled(FixedSizeList)`
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

function Row(props: ListChildComponentProps) {
  const { index, style, data } = props;
  const navigate = useNavigate();

  const handleListItemClick =
    (_id: string) => (_: React.MouseEvent<HTMLDivElement>) => {
      navigate(`${Paths.SOLVE}/${_id}`);
    };

  return (
    <ListItem
      style={style}
      key={`${data[index].problemID}-${index}`}
      component="div"
      disablePadding
      sx={{ bgcolor: index % 2 === 1 ? Color.LIGHT : undefined }}
    >
      <ListItemButton onClick={handleListItemClick(data[index].problemID)}>
        <ListItemText
          primary={data[index].problemTitle}
          secondary={data[index].languageName}
        />
        <ListItemText
          primary={data[index].status.description}
          sx={{
            flex: "none",
          }}
          primaryTypographyProps={{
            color: data[index].status.id === 3 ? "success.dark" : "error.dark",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
}

function SubmissionsList() {
  const { submissionsLoading, error, submissions } = useReduxSelector(
    (state) => state.submissions
  );

  const { username } = useParams();
  const dispatch = useReduxDispatch();

  useEffect(() => {
    if (username) dispatch(getSubmissions(username));
  }, []);

  return (
    <Fragment>
      {submissionsLoading ? (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      ) : (
        <Fragment>
          {submissions.length > 0 ? (
            <AutoSizer>
              {({ height, width }) => (
                <StyledFixedSizeList
                  height={height}
                  width={width}
                  itemSize={72}
                  itemCount={submissions.length}
                  overscanCount={4}
                  itemData={submissions}
                >
                  {Row}
                </StyledFixedSizeList>
              )}
            </AutoSizer>
          ) : (
            <Typography variant="h6" align="center">
              User has no submissions!
            </Typography>
          )}
        </Fragment>
      )}
      <ToastMessage
        show={error !== null}
        message={error!!}
        onClose={() => dispatch(resetSubmissionsState())}
      />
    </Fragment>
  );
}

export default SubmissionsList;
