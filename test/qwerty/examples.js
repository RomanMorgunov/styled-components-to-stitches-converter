// styled-components
import styled from 'styled-components';

// Stitches
import { styled } from '@stitches/react';

// styled-components
const Button = styled.button`
  color: red;
  font-size: 14px;
  &:hover {
    color: black;
    font-size: 14px;
  }
`;

// Stitches
const Button = styled("button", {
  color: "red",
  fontSize: "14px",
  "&:hover": {
    color: "black",
    fontSize: "14px"
  }
});

// custom component

// styled-components
const Button = styled(Button)`
  color: red;
  font-size: 14px;
  &:hover {
    color: black;
    font-size: 14px;
  }
`;

// Stitches
const Button = styled(Button, {
  color: "red",
  fontSize: "14px",
  "&:hover": {
    color: "black",
    fontSize: "14px"
  }
});