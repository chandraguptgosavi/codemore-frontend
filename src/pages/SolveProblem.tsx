import StyledPageContainer from "components/PageContainer.styles";
import CodeEditor from "features/solve-problem/CodeEditor";
import Problem from "features/solve-problem/Problem";

function SolveProblem() {
  return (
    <StyledPageContainer width="100%" mdFlexDirection="row">
      <Problem />
      <CodeEditor />
    </StyledPageContainer>
  );
}

export default SolveProblem;
