import StyledPageContainer from "components/PageContainer.styles";
import SubmissionsList from "features/submissions/SubmissionsList";

function Submissions() {
    return (
      <StyledPageContainer
        width="90%"
        smWidth="75%"
        maxWidth="700px"
      >
        <SubmissionsList/>
      </StyledPageContainer>
    );
}

export default Submissions;