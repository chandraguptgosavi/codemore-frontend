import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TextField, Typography } from "@mui/material";

import Color from "constants/colors";
import Screen from "constants/screens";
import Unit from "constants/units";
import useReduxDispatch from "hooks/useReduxDispatch";
import useReduxSelector from "hooks/useReduxSelector";
import { getProblem, resetProblem } from "./solveProblemSlice";
import ToastMessage from "components/ToastMessage";

const ProblemContainer = styled.div`
  width: 100%;
  overflow: visible;
  padding: ${Unit.rem.MD};
  box-sizing: border-box;
  text-align: justify;

  @media (min-width: ${Screen.LG}) {
    width: 35%;
    overflow: auto;
    scrollbar-width: auto;
    scrollbar-color: ${Color.PRIMARY_LIGHT};
    &::-webkit-scrollbar {
      width: ${Unit.rem.XS};
    }
    &::-webkit-scrollbar-thumb {
      background: ${Color.PRIMARY_LIGHT};
      border-radius: ${Unit.rem.XS};
      visibility: hidden;
    }

    &:hover::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }
`;

function Problem() {
  const { _id } = useParams();
  const { isProblemLoading, error, problem } = useReduxSelector(
    (state) => state.solveProblem
  );
  const dispatch = useReduxDispatch();

  useEffect(() => {
    if (_id) dispatch(getProblem(_id));
  }, []);

  return (
    <ProblemContainer>
      {isProblemLoading ? (
        <Typography variant="h6" align="center">
          Loading...
        </Typography>
      ) : (
        <Fragment>
          {problem && (
            <Fragment>
              <Typography variant="h4" gutterBottom>
                {problem.title}
              </Typography>
              <Typography paragraph gutterBottom>
                {problem.statement}
              </Typography>
              <Typography variant="h6">Input:</Typography>
              <Typography paragraph gutterBottom>
                {problem.input}
              </Typography>
              <Typography variant="h6">Output:</Typography>
              <Typography paragraph gutterBottom>
                {problem.output}
              </Typography>
              <Typography variant="h6">Sample Input:</Typography>
              <TextField
                value={`${problem.sampleTestCases.count}\n${problem.sampleTestCases.input}`}
                multiline
                fullWidth
                minRows={5}
                maxRows={8}
                disabled
                sx={{ marginBottom: Unit.rem.MD, bgcolor: Color.LIGHT }}
              />
              <Typography variant="h6">Sample Output:</Typography>
              <TextField
                value={problem.sampleTestCases.output}
                multiline
                fullWidth
                minRows={5}
                maxRows={8}
                disabled
                sx={{ marginBottom: Unit.rem.MD, bgcolor: Color.LIGHT }}
              />
            </Fragment>
          )}
        </Fragment>
      )}
      <ToastMessage
        show={error !== null}
        onClose={() => dispatch(resetProblem())}
        message={error!!}
      />
    </ProblemContainer>
  );
}

export default Problem;
