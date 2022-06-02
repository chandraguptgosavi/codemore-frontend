import StyledPageContainer from "components/PageContainer.styles";
import ProblemsList from "features/dashboard/ProblemsList";
import ProblemsPagination from "features/dashboard/ProblemsPagination";

function Home() {
    return (
      <StyledPageContainer width="90%" smWidth="75%" maxWidth="700px">
        <ProblemsList />
        <ProblemsPagination />
      </StyledPageContainer>
    );
}

export default Home;