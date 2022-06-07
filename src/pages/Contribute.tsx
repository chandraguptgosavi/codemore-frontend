import StyledPageContainer from "components/PageContainer.styles";
import ContributionForm from "features/contribution/ContributionForm";

function Contribute() {
  return (
    <StyledPageContainer width="90%" maxWidth="600px">
      <ContributionForm />
    </StyledPageContainer>
  );
}

export default Contribute;
