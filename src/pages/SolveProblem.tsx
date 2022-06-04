
import StyledPageContainer from "components/PageContainer.styles";
import Code from "features/solve-problem/Code";
import Problem from "features/solve-problem/Problem";
import { Navigate, useParams } from "react-router-dom";
import Paths from "router/paths";


function SolveProblem() {
    const { _id } = useParams();

    if (!_id) return <Navigate to={Paths.HOME} replace />;

    return (
        <StyledPageContainer width="100%" lgFlexDirection="row">
            <Problem />
            <Code />
        </StyledPageContainer>
    )
}

export default SolveProblem;