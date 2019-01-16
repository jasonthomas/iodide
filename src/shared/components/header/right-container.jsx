import styled from "react-emotion";
import THEME from "../../theme";

export default styled("div")`
  grid-column: right;
  display: flex;
  justify-content: flex-end;
  margin-right: ${THEME.header.right.rightMargin};
`;
