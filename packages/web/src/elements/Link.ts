import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "./../styles/Colors";
import * as Polished from 'polished';

const StyledLink = styled(Link)`
  color: ${Colors.Blue};
  font-size: 1.2rem;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    color: ${Polished.lighten(0.025, Colors.Blue)};
  }

  &:active {
    color: ${Polished.darken(0.025, Colors.Blue)};
  }
`;

export default StyledLink
