import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "./../styles/Colors";
import * as Polished from 'polished';

const StyledLink = styled(Link)`
  color: ${Colors.Pink};
  font-size: 1.4rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: ${Polished.lighten(0.025, Colors.Pink)};
  }

  &:active {
    color: ${Polished.darken(0.025, Colors.Pink)};
  }
`;

export default StyledLink
